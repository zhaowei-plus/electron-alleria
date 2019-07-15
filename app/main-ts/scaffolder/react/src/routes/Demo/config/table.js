import React from 'react';
import {
  Input,
  DropList,
  DatePicker,
  SelectItem } from 'doraemon';
import { Link } from 'react-router-dom';

// 搜索框
export const customItem = [
  {
    label: '编号',
    id: 'code',
    render: () => {
      return <Input />;
    },
  }, {
    label: '名称',
    id: 'name',
    render: () => {
      return <Input />;
    },
  },
  {
    label: '类型',
    id: 'type1',
    render: () => {
      return <SelectItem type="name" all />;
    },
  },
  {
    label: '邮箱',
    id: 'email',
    render: () => {
      return <SelectItem type="name1" all />;
    },
  }, {
    label: '开始日期',
    id: 'start',
    render: () => {
      return <DatePicker />;
    },
  }, {
    label: '结束日期',
    id: 'end',
    render: () => {
      return <DatePicker />;
    },
  },
];


// table列配置
export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    fixed: true,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    fixed: true,
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '采购组织',
    dataIndex: 'purchaseOrg',
    key: 'purchaseOrg',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '创建日期',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {
    title: '创建人',
    dataIndex: 'creater',
    key: 'creater',
  }];
// 列表操作栏
export const createColumns = (component) => {
  return [
    ...columns,
    {
      title: '操作',
      width: 80,
      fixed: 'right',
      render: (text, record) => {
        const itemList = [{
          label: '查看',
          to: `/demo/detail?id=${record.id}`,
        }, {
          label: '删除',
          handleClick: () => {
            component.delItem(record.id);
          },
        }];
        return (
          <DropList
            itemList={itemList}
          >
            <Link to={`/demo/detail?id=${record.id}`}>编辑</Link>
          </DropList>
        );
      },
    }];
};

// zcyList 配置汇总
export default function configInit(component, data, selectedRowKeys) {
  const batchBtn = [{
    label: '删除',
    handleClick: (e, keys) => {
      component.delItems(keys);
    },
  }];
  return {
    customItem,
    tabs: {
      tabList: [{
        label: 'test1',
        key: '1',
      }, {
        label: 'test2',
        key: '2',
      }],
    },
    tabKey: 'type',
    table: {
      columns: [...createColumns(component)],
      dataSource: data,
      rowSelection: {
        selectedRowKeys,
        onChange: component.selectChange,
      },
      rowKey: 'id',

    },
    batchBtn,
    onSearch: component.search,
  };
}
