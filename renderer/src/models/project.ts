export default {
  namespace: 'project',
  state: {},
  effects: {},
  reducers: {
    load(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
};
