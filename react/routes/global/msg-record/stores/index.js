import React, { createContext, useMemo, useContext } from 'react';
import { DataSet } from 'choerodon-ui/pro';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import MsgRecordStoreObject from './MsgRecordStore';
import MsgRecordDataSet from './MsgRecordDataSet';
import MsgWebhookDataSet from './MsgWebhookDataSet';

const Store = createContext();
export function useStore() {
  return useContext(Store);
}
export default Store;

export const StoreProvider = injectIntl(inject('AppState')(
  (props) => {
    const { AppState: { currentMenuType: { type, id, organizationId } }, intl, children } = props;
    const intlPrefix = 'msgrecord';
    const MsgRecordStore = useMemo(() => new MsgRecordStoreObject(), []);
    const msgRecordDataSet = useMemo(() => new DataSet(MsgRecordDataSet(organizationId, type, intl, intlPrefix)), []);
    const msgWebhookDataSet = useMemo(() => new DataSet(MsgWebhookDataSet()), []);
    const value = {
      ...props,
      intlPrefix,
      permissions: [
        'notify-service.message-record-site.pageEmail',
        'notify-service.message-record-org.pageEmail',
        'notify-service.webhook-record.pagingByMessage',
      ],
      MsgRecordStore,
      msgRecordDataSet,
      msgWebhookDataSet,
    };
    return (
      <Store.Provider value={value}>
        {children}
      </Store.Provider>
    );
  },
));
