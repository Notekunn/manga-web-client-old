import React from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
const rules = {
  email: [
    {
      type: 'email',
      message: 'Email không hợp lệ!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  userName: [
    {
      type: 'string',
      message: 'Tên người dùng không hợp lệ!',
      pattern: /^[a-zA-Z.0-9]+$/,
    },
    {
      required: true,
      message: 'Nhập tên người dùng!',
    },
  ],
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên!',
    },
  ],
  password: [
    {
      required: true,
      pattern: /^[a-zA-Z.0-9]+$/,
      message: 'Vui lòng nhập mật khẩu hợp lệ!',
    },
  ],
  confirm: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu!',
    },
    ({ getFieldValue }) => {
      return {
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('Các mật khẩu đã nhập không khớp. Hãy thử lại!');
        },
      };
    },
  ],
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const AddAccount = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, modalLoading, closeModal, onSubmit: handleSubmit } = props;
  const onSubmit = async () => {
    await form.validateFields();
    const { userName, name, email, password } = form.getFieldsValue();
    console.log({ userName, name, email, password });
    handleSubmit({ userName, name, email, password });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 18px',
      }}
      destroyOnClose
      title="Thêm tác giả"
      visible={modalVisible}
      onCancel={closeModal}
      onOk={onSubmit}
      confirmLoading={modalLoading}
      forceRender
    >
      <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
        <Form.Item name="email" label="E-mail" rules={rules.email}>
          <Input />
        </Form.Item>
        <Form.Item name="userName" label="Tên người dùng" rules={rules.userName}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Họ tên">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={rules.password} hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={rules.confirm}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddAccount.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  modalLoading: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default AddAccount;
