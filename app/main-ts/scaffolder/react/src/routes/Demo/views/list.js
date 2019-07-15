/**
 * 依赖包引入
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Spin,
  ZcyBreadcrumb,
  ZcyList,
  Modal,
  message,
} from 'doraemon';

/**
 * 结构复制建议换行
 */
import {
  configInit,
  breadcrumbConfig,
} from '../config/list';

/**
 * 相关常量设置
 */
const { confirm } = Modal;

/**
 * connect修饰器
 */
// TODO 搜索条件保存
@connect(({ demo, loading }) => ({
  demo,
  /**
     * 通过loading控制
     */
  loading: loading.models.demo,
}))
export default class DemoList extends Component {
    /**
     * 常量的state建议使用
     */
    state = {
      selectedRowKeys: [],
    };
    /**
     * componentDidMount 请求数据
     */
    componentDidMount() {
      /**
         * 建议使用建构赋值
         */
      const { dispatch } = this.props;
      dispatch({
        type: 'demo/getCollect',
        payload: {},
      });
    }

    /**
     * 所有方法建议都使用箭头函数，防止this指向混乱
     * 除非一下this指向需要指向函数调用对象的
     *
     * 列表搜索
     * @param {object} params - 搜索参数
     */
    search = (params) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'demo/getCollect',
        payload: params,
      });
      /**
         * 搜索列表需要情况选中状态
         */
      this.setState({
        selectedRowKeys: [],
      });
    };
    /**
     * 返回
     */
    goBack = () => {
      const { history } = this.props;
      history.goBack();
    };
    /**
     * 删除列
     * @param id{string} - 删除列的Id
     */
    delItem = (id) => {
      const { dispatch, params } = this.props;
      /**
         * 所有的异步请求都使用dispatch
         * 组件统一处理错误
         */
      confirm({
        title: '确认删除该书签吗？',
        content: '删除后不可恢复',
        onOk: () => {
          dispatch({
            type: 'demo/deleteItem',
            id,
            payload: params,
          }).then(() => {
            this.setState({
              selectedRowKeys: [],
            });
            message.success('删除成功');
          });
        },
      });
    };
    /**
     * @param ids - 批量删除的ids数组
     */
    delItems = (ids) => {
      const { params, dispatch } = this.props;
      confirm({
        title: '确认删除该书签吗？',
        content: '删除后不可恢复',
        onOk: () => {
          dispatch({
            type: 'demo/deleteItems',
            ids,
            payload: params,
          }).then(() => {
            this.setState({
              selectedRowKeys: [],
            });
            message.success('删除成功');
          });
        },
      });
    };

    /**
     * 选中列的更新
     * @param selectedRowKeys
     */
    selectChange = (selectedRowKeys) => {
      this.setState({
        selectedRowKeys,
      });
    };


    render() {
      const { demo, loading } = this.props;

      const { selectedRowKeys } = this.state;

      return (
        <Spin spinning={loading} size="large">
          <ZcyBreadcrumb
            {...breadcrumbConfig(this)}
          />
          <ZcyList
            {...configInit(this, demo.data, selectedRowKeys)}
          />
        </Spin>
      );
    }
}
