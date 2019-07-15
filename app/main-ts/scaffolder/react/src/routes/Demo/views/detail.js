import { routerRedux } from 'dva/router';
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Panel,
  Form,
  Row,
  ZcyBreadcrumb,
  InputNumber,
  ZcyFormItem,
  message,
} from 'doraemon';
import { getQueryParams } from 'src/utils/utils';

import { getBreadcrumbParams } from '../config/detail';


@connect(({ demo, loading }) => ({
  data: demo.formData,
  loading: loading.models.demo,
}))
@Form.create()
class DemoDetail extends Component {
  // URL取数的写法
  componentDidMount() {
    const { dispatch, location, form } = this.props;
    const { id } = getQueryParams(location.search);
    dispatch({
      type: 'demo/getDetailEffects',
      payload: id,
    }).then((res) => {
      form.setFieldsValue({
        ...res.data,
      });
    });
  }

    state = {
      name: '',
    };
    /**
     * 返回
     */
    goBack = () => {
      const { history } = this.props;
      history.goBack();
    };
    // 保存
    save = () => {
      const { form, dispatch } = this.props;
      form.validateFieldsAndScroll({ scroll: { offsetTop: 200, alignWithTop: true } },
        (err, values) => {
          if (!err) {
            dispatch({
              type: 'demo/save',
              payload: values,
            }).then(() => {
              message.success('保存成功');
            });
          }
        });
    };
    /**
     * 提交
     * */
    submit = () => {
      const { form, dispatch } = this.props;
      form.validateFieldsAndScroll({ scroll: { offsetTop: 200, alignWithTop: true } },
        (err, values) => {
          if (!err) {
            dispatch({
              type: 'demo/save',
              payload: values,
            }).then(() => {
              dispatch(routerRedux.push('/demo/list'));
            });
          }
        });
    }

    changeName = (name) => {
      const { form } = this.props;
      this.setState({
        name,
      });
      form.setFieldsValue({
        name: `Hi, ${name}!`,
        email: 'xxxxx@126.com',
        age: 11,
        pages: 1,
        radio: 'a',
      });
    }

    renderSelect = (name) => {
      const { form } = this.props;
      let component = {};
      switch (name) {
      case 1:
        component = (
          <ZcyFormItem
            form={form}
            label="选择1"
            name="selectName12"
            type="name"
          />

        );
        break;
      case 2:
        component = (
          <ZcyFormItem
            form={form}
            label="选择2"
            name="selectName23"
            type="name1"
          />
        );
        break;
      default:
        component = (
          <ZcyFormItem
            form={form}
            label="选择3"
            name="selectName33"
            type="name2"
          />
        );
      }
      return component;
    }

    render() {
      const { form } = this.props;
      const { name } = this.state;
      return (
        <div>
          <ZcyBreadcrumb
            {
            ...getBreadcrumbParams(this)
            }
          />
          <Panel
            title="测试"
          >
            <Form>
              <Row>
                <ZcyFormItem
                  name="name"
                  label="姓名"
                  required
                  form={form}
                />
                <ZcyFormItem
                  name="age"
                  form={form}
                  type="age"
                />
                <ZcyFormItem
                  name="pages"
                  label="个数"
                  form={form}
                  type="num"
                >
                  <InputNumber min={1} max={150} />
                </ZcyFormItem>
                <ZcyFormItem
                  name="email"
                  form={form}
                  type="email"
                />
                <ZcyFormItem
                  form={form}
                  name="radio"
                  type="radio"
                />
                <ZcyFormItem
                  label="我的选择"
                  form={form}
                  name="selectName"
                  type="name"
                  onChange={this.changeName}
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="date"
                  type="date"
                />
                {/*       <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="单选框"
                                >
                                    {getFieldDecorator('radio-group')(
                                        <RadioGroup>
                                            <Radio value="a">item 1</Radio>
                                            <Radio value="b">item 2</Radio>
                                            <Radio value="c">item 3</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col> */}
                {this.renderSelect(name)}
                <ZcyFormItem
                  form={form}
                  required
                  name="mobile"
                  type="mobile"
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="mobile1"
                  type="mobile"
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="mobile2"
                  type="mobile"
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="textArea"
                  type="textArea"
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="mobile3"
                  type="mobile"
                />
                <ZcyFormItem
                  form={form}
                  required
                  name="bookMark"
                  type="bookMark"
                />
              </Row>
            </Form>
          </Panel>
        </div>
      );
    }
}

export default DemoDetail;
