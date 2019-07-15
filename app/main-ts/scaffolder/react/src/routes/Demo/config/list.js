export const breadcrumbConfig = (component) => {
  return {
    routes: [{
      label: '首页',
      to: '/home',
    }, {
      label: '列表',
      to: '/demo/list',
    }],
    globalBtn: [{
      label: '返回',
      type: 'primary',
      onClick: component.goBack,
    }],
  };
};


export configInit from './table';

