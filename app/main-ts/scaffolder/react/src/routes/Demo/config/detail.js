export const getBreadcrumbParams = function (component) {
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
      onClick: component.goBack,
    }, {
      label: '保存',
      type: 'primary',
      onClick: component.save,
    }, {
      label: '提交',
      type: 'primary',
      onClick: component.submit,
    }],
  };
};
