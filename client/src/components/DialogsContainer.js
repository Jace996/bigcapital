import React from 'react';
import AccountFormDialog from 'containers/Dashboard/Dialogs/AccountFormDialog';
import UserFormDialog from 'containers/Dashboard/Dialogs/UserFormDialog';
import ItemCategoryDialog from 'containers/Dashboard/Dialogs/ItemCategoryDialog';
import CurrencyDialog from 'containers/Dashboard/Dialogs/CurrencyDialog';

export default function DialogsContainer() {
  return (
    <React.Fragment>
      <CurrencyDialog />
      <ItemCategoryDialog />
      <AccountFormDialog />
      <UserFormDialog />
    </React.Fragment>
  );
}
