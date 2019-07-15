import { queryList } from '../services';

export default {
  namespace: 'demoList',

  state: {
    data: [],
  },

  effects: {
    * getCollect({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
