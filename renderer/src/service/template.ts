import request from '@/utils/request';
// import { REMOTE_TEMPLATE_URL } from '@/constants/template';

// export const load = type => {
//   const res = request('/json', {
//     method: 'get',
//     baseURL: 'http://localhost:5000',
//     params: {
//       type,
//     },
//   });

//   return res;
// };

/* 获取模板列表数据 */
export const load = type => {
  const res = require('./template-data').default;
  return res;
};
