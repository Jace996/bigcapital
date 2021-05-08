import { get } from 'lodash';
import * as R from 'ramda';
import {
  ILedger,
  ICustomer,
  ICustomerBalanceSummaryCustomer,
  ICustomerBalanceSummaryQuery,
  ICustomerBalanceSummaryData,
  INumberFormatQuery,
} from 'interfaces';
import { ContactBalanceSummaryReport } from '../ContactBalanceSummary/ContactBalanceSummary';

export class CustomerBalanceSummaryReport extends ContactBalanceSummaryReport {
  readonly ledger: ILedger;
  readonly baseCurrency: string;
  readonly customers: ICustomer[];
  readonly filter: ICustomerBalanceSummaryQuery;
  readonly numberFormat: INumberFormatQuery;

  /**
   * Constructor method.
   * @param {IJournalPoster} receivableLedger
   * @param {ICustomer[]} customers
   * @param {ICustomerBalanceSummaryQuery} filter
   * @param {string} baseCurrency
   */
  constructor(
    ledger: ILedger,
    customers: ICustomer[],
    filter: ICustomerBalanceSummaryQuery,
    baseCurrency: string
  ) {
    super();

    this.ledger = ledger;
    this.baseCurrency = baseCurrency;
    this.customers = customers;
    this.filter = filter;
    this.numberFormat = this.filter.numberFormat;
  }

  /**
   * Customer section mapper.
   * @param {ICustomer} customer
   * @returns {ICustomerBalanceSummaryCustomer}
   */
  private customerMapper(customer: ICustomer): ICustomerBalanceSummaryCustomer {
    const closingBalance = this.ledger
      .whereContactId(customer.id)
      .getClosingBalance();

    return {
      customerName: customer.displayName,
      total: this.getContactTotalFormat(closingBalance),
    };
  }
 
  /**
   * Mappes the customer model object to customer balance summary section.
   * @param {ICustomer[]} customers - Customers.
   * @returns {ICustomerBalanceSummaryCustomer[]}
   */
  private customersMapper(
    customers: ICustomer[]
  ): ICustomerBalanceSummaryCustomer[] {
    return customers.map(this.customerMapper.bind(this));
  }

  /**
   * Retrieve the customers sections of the report.
   * @param {ICustomer} customers
   * @returns {ICustomerBalanceSummaryCustomer[]}
   */
  private getCustomersSection(
    customers: ICustomer[]
  ): ICustomerBalanceSummaryCustomer[] {
    return R.compose(
      R.when(
        R.always(this.filter.comparison.percentageOfColumn),
        this.contactCamparsionPercentageOfColumn.bind(this)
      ),
      this.customersMapper.bind(this)
    ).bind(this)(customers);
  }

  /**
   * Retrieve the report statement data.
   * @returns {ICustomerBalanceSummaryData}
   */
  public reportData(): ICustomerBalanceSummaryData {
    const customersSections = this.getCustomersSection(this.customers);
    const customersTotal = this.getContactsTotalSection(customersSections);

    return {
      customers: customersSections,
      total: customersTotal,
    };
  }

  /**
   * Retrieve the report statement columns
   * @returns 
   */
  public reportColumns() {
    return [];
  }
}