import { queryList, deleteItem, deleteItems, queryDetail, save } from '../services';

export default {
  namespace: 'demo',

  state: {
    data: [],
    params: {},
  },

  effects: {
    * getCollect({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: {
          data: response,
          params: payload,
        },
      });
    },
    * getDetailEffects({ payload }, { call }) {
      const response = yield call(queryDetail, payload);
      return response;
    },
    * deleteItem({ payload, id }, { call, put }) {
      const listRes = yield [call(deleteItem, id), call(queryList, payload)];
      yield put({
        type: 'queryList',
        payload: {
          data: listRes[1],
          params: payload,
        },
      });
    },
    * deleteItems({ payload, id }, { call, put }) {
      const response = yield [call(deleteItems, id), call(queryList, payload)];
      yield put({
        type: 'queryList',
        payload: {
          data: response[1],
          params: payload,
        },
      });
    },
    * save({ payload }, { call }) {
      yield call(save, payload);
    },
  },

  reducers: {
    queryList(state, action) {
      const { data, params } = action.payload;
      return {
        ...state,
        data,
        params,
      };
    },
  },
};
