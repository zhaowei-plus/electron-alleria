import { IProjectPayload, IFormattedProjectPayload } from '@/types';
import { string } from 'prop-types';

export const formatRoutesList = (payload: IProjectPayload): IFormattedProjectPayload => {
  const { name, files, path } = payload;
  /* 1 删除隐藏文件 */
  const buf = files
    .filter(item => {
      return item.charAt(0) !== '.';
    })
    .map(item => {
      return {
        title: item,
        type: 'BasicList',
        lastCommitTime: new Date().getTime(),
        tags: ['test', 'demo'],
      };
    });
  /* 2 格式化输出 */
  return { name, files: buf, path };
};
