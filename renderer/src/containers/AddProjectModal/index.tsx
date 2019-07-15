import React from 'react';
import { Icon, Modal, Form, Input, Select } from 'antd';
import { IAddProjectModalProps } from '@/types';

const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };

const {Option}=Select

const AddProjectModal: React.FC<IAddProjectModalProps> = function(props: IAddProjectModalProps) {
  const { visible, onOk, onCancel, form, } = props;
  const { getFieldDecorator } = form;

  return (
    <>
      {/* tslint:disable:jsx-alignment */}
      <Modal title="添加项目" visible={visible} onOk={onOk} onCancel={onCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form {...formItemLayout}>
          <Form.Item label="项目名称">
            {getFieldDecorator('project', {
              rules: [{ required: true, message: '请输入项目名称!' }]
            })(
              <Input
                prefix={<Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="默认建立在当前用户 Home 目录"
              />
            )}
          </Form.Item>
          <Form.Item label="选项">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择一种选项' }]
            })(
              <Select placeholder="请选择一种选项">
                <Option value="react">React</Option>
                <Option value="vue">Vue</Option>
              </Select>
            )}
          </Form.Item>
          {/*<Form.Item label="配置">*/}
            {/*<Checkbox >项目生成后启动开发</Checkbox>*/}
          {/*</Form.Item>*/}
        </Form>
      </Modal>
    </>
  );
};

export default AddProjectModal
