import { Inject, Service } from 'typedi';
import { initialize } from 'objection';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import events from '@/subscribers/events';
import { IAccountEventDeletePayload } from '@/interfaces';
import { DeleteBankRulesService } from '../../Rules/DeleteBankRules';
import { RevertRecognizedTransactions } from '../../RegonizeTranasctions/RevertRecognizedTransactions';

@Service()
export class DeleteUncategorizedTransactionsOnAccountDeleting {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private deleteBankRules: DeleteBankRulesService;

  @Inject()
  private revertRecognizedTransactins: RevertRecognizedTransactions;

  /**
   * Constructor method.
   */
  public attach(bus) {
    bus.subscribe(
      events.accounts.onDelete,
      this.handleDeleteBankRulesOnAccountDeleting.bind(this),
    )
    bus.subscribe(
      events.accounts.onDelete,
      this.handleDeleteUncategorizedTransactions.bind(this)
    );
  }

  /**
   * Handles delete the uncategorized transactions.
   * @param {IAccountEventDeletePayload} payload -
   */
  private async handleDeleteUncategorizedTransactions({ tenantId, oldAccount, trx }: IAccountEventDeletePayload) {
    const { UncategorizedCashflowTransaction } = this.tenancy.models(tenantId);

    await UncategorizedCashflowTransaction.query(trx)
      .where('accountId', oldAccount.id)
      .delete();
  }

  /**
   * Handles revert the recognized transactions and delete all the bank rules
   * associated to the deleted bank account.
   * @param {IAccountEventDeletePayload}
   */
  private async handleDeleteBankRulesOnAccountDeleting({ tenantId, oldAccount, trx }: IAccountEventDeletePayload) {
    const knex = this.tenancy.knex(tenantId);
    const { BankRule, UncategorizedCashflowTransaction, MatchedBankTransaction, RecognizedBankTransaction } = this.tenancy.models(tenantId);

    const foundAssociatedRules = await BankRule.query(trx).where('applyIfAccountId', oldAccount.id);
    const foundAssociatedRulesIds = foundAssociatedRules.map(rule => rule.id);

    await initialize(knex, [
      UncategorizedCashflowTransaction,
      RecognizedBankTransaction,
      MatchedBankTransaction,
    ]);

    await this.revertRecognizedTransactins.revertRecognizedTransactions(tenantId, foundAssociatedRulesIds, null, trx)

    await this.deleteBankRules.deleteBankRules(tenantId, foundAssociatedRulesIds);
  }
}