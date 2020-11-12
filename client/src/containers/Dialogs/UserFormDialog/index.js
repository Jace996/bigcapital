import React, { lazy } from 'react';
import { FormattedMessage as T, useIntl } from 'react-intl';
import { Dialog, DialogSuspense } from 'components';
import withDialogRedux from 'components/DialogReduxConnect';
import { compose } from 'utils';

const UserFormDialogContent = lazy(() => import('./UserFormDialogContent'));

function UserFormDialog({
  dialogName,
  payload = { action: '', id: null },
  isOpen,
}) {
  return (
    <Dialog
      name={dialogName}
      title={
        payload.action === 'edit' ? (
          <T id={'edit_invite'} />
        ) : (
          <T id={'invite_user'} />
        )
      }
      className={'dialog--invite-form'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <UserFormDialogContent
          dialogName={dialogName}
          userId={payload.id}
          action={payload.action}
        />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(
  // UserFormDialogConnect,
  withDialogRedux(),
)(UserFormDialog);