import React from 'react';
import { Button, Modal, Form, Input, Radio, message } from 'antd';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const AddPageModal = function(props) {
  const { visible, onCancel, form, name = '默认项目', id } = props;
  const { getFieldDecorator } = form;
  const onCreate = () => {
    props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.info('请完善信息');
        return;
      }
      create({ ...values, id });
    });
  };
  const create = v => {
    /*校验参数合法性 */

    props.onCreate(v);
  };

  return (
    <>
      <Modal visible={visible} title="新建页面" width={450} onCancel={onCancel} onOk={onCreate} okText="确认" cancelText="取消">
        <Form {...formItemLayout}>
          <Form.Item label="项目名称">{name}</Form.Item>
          <Form.Item label="路由名称">
            {getFieldDecorator('page', {
              rules: [
                {
                  required: true,
                  message: '路由名称必填',
                },
              ],
            })(<Input placeholder="请输入页面名称" />)}
          </Form.Item>
          <Form.Item label="配置">
            {getFieldDecorator('config')(<Input.TextArea placeholder="{}" />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Form.create()(AddPageModal);
