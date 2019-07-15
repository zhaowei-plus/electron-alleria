import { request } from 'doraemon';

export async function queryDetail(id) {
  return request('/api/detail', {
    params: {
      id,
    },
  });
}

export async function queryList(params) {
  return request('/api/test', {
    params: {
      ...params,
    },
  });
}

export async function deleteItem(id) {
  return request('/api/deleteItem', {
    params: {
      id,
    },
  });
}

export async function deleteItems(ids) {
  return request('/api/deleteItems', {
    params: {
      ids,
    },
  });
}
export async function save(params) {
  return request('/api/save', {
    params,
  });
}
