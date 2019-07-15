import { ILoadTemplatesArgs } from '@/types';
import { load } from '@/service/template';
export default {
  namespace: 'template',
  state: {},
  effects: {
    *load({ payload }: { payload: ILoadTemplatesArgs }, { call, put }) {
      const res = yield call(load, payload.type);
      yield put({
        type: 'setTemplates',
        payload: {
          templates: res,
        },
      });
    },
  },
  reducers: {
    setTemplates(state, action) {
      return { ...state, templates: action.payload.templates };
    },
  },
};
