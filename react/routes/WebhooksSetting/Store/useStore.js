import { useLocalStore } from 'mobx-react-lite';
import { axios } from '@choerodon/boot';

export default function useStore() {
  return useLocalStore(() => ({
    handleRetryRecord(type, id, orgId, recordId) {
      return axios.get(`/hmsg/choerodon/v1/${type === 'project' ? `project/${id}` : `organization/${orgId}`}/web_hooks/${recordId}/retry`);
    },
    handleForceFailure(type, id, orgId, recordId) {
      return axios.get(`/hmsg/choerodon/v1/${type === 'project' ? `project/${id}` : `organization/${orgId}`}/${recordId}/force/failure`);
    },
  }));
}
