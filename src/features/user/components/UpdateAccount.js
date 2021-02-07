import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Select, Steps, Spin } from 'antd';
const { Step } = Steps;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const steps = [
  {
    name: 'Thông tin cơ bản',
  },
  {
    name: 'Cấp quyền',
  },
  {
    name: 'Đổi mật khẩu',
  },
];
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
      // required: true,
      pattern: /^[a-zA-Z.0-9]+$/,
      message: 'Vui lòng nhập mật khẩu hợp lệ!',
    },
  ],
  confirm: [
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('Các mật khẩu đã nhập không khớp. Hãy thử lại!');
      },
    }),
  ],
};
const UpdateForm = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;
  const [formVals, setFormVals] = useState({
    name: values.name,
    userName: values.userName,
    email: values.email,
    avatarUrl: values.avatarUrl,
    permission: values.permission,
  });
  useEffect(() => {
    form.setFieldsValue(values);
    // setCurrentStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    const nextFormVals = { ...formVals, ...fieldsValue };
    setFormVals(nextFormVals);
    if (currentStep < steps.length - 1) {
      forward();
    } else {
      handleUpdate(nextFormVals);
      setCurrentStep(0);
    }
  };
  const updatePermission = (permission) => {
    setFormVals((prev) => {
      return { ...prev, permission };
    });
  };
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item name="email" label="E-mail" rules={rules.email}>
              <Input />
            </Form.Item>
            <Form.Item name="userName" label="Tên người dùng" rules={rules.userName} hasFeedback>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Họ tên" rules={rules.name}>
              <Input />
            </Form.Item>
          </>
        );
      case 1:
        return (
          <>
            <Form.Item name="permission" label="Chức vụ">
              <Select
                placeholder="Chọn chức vụ bạn muốn cấp"
                onChange={updatePermission}
                allowClear
              >
                <Option value="moderator">Điều hành viên</Option>
                <Option value="translator">Phiên dịch viên</Option>
                <Option value="member">Thành viên</Option>
              </Select>
            </Form.Item>
          </>
        );
      case 2:
        return (
          <>
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
          </>
        );

      default:
        return (
          <>
            <Spin size="large" />
          </>
        );
    }
  };

  const renderFooter = () => {
    return (
      <>
        {currentStep > 0 && (
          <Button style={{ float: 'left' }} onClick={backward}>
            Quay lại
          </Button>
        )}
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Huỷ</Button>
        <Button type="primary" onClick={handleNext}>
          {currentStep >= steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="Cập nhật tài khoản"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={handleUpdateModalVisible}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
        onChange={setCurrentStep}
      >
        {steps.map((step, index) => (
          <Step title={step.name} key={index} />
        ))}
      </Steps>
      <Form {...formLayout} form={form} initialValues={formVals}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
