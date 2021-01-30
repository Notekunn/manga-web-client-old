import { useState } from 'react';
import { Form, Input, Result, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as userAction from '../../actions/user';
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

const RegistrationForm = ({ form, setModalVisible, setConfirmLoading }) => {
    const [form1] = Form.useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const { email, password, userName, name } = values;
        // eslint-disable-next-line no-unused-vars
        const variables = { email, password, userName, name };
    };
    if (isSuccess) return (
        <Result
            status="success"
            title="Tạo tài khoản thành công!"
            subTitle="Bạn đã tạo tài khoản thành công."
            extra={[
                <Button type="primary" key="console" onClick={() => setModalVisible(false)}>
                    Về trang quản lý
               </Button>,
                <Button key="buy" onClick={() => setIsSuccess(false)}>Đăng ký tiếp</Button>,
            ]}
        />
    );
    if (isError) return (
        <Result
            status="error"
            title="Tạo tài khoản thất bại!"
            subTitle="Trùng tên tài khoản"
            extra={[
                <Button type="primary" key="console" onClick={() => setModalVisible(false)}>
                    Về trang quản lý
                </Button>,
                <Button key="buy" onClick={() => setIsError(false)}>Đăng ký lại</Button>,
            ]}
        />
    );
    return (
        <Form
            {...formItemLayout}
            form={form || form1}
            name="register"
            onFinish={onFinish}
            onFinishFailed={() => setConfirmLoading(false)}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[{
                    type: 'email',
                    message: 'Email không hợp lệ!',
                }, {
                    required: true,
                    message: 'Please input your E-mail!',
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="userName"
                label="Tên người dùng"
                rules={[{
                    type: 'string',
                    message: 'Tên người dùng không hợp lệ!',
                    pattern: /^[a-zA-Z.0-9]+$/,
                }, {
                    required: true,
                    message: 'Nhập tên người dùng!',
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label="Họ tên"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{
                    required: true,
                    pattern: /^[a-zA-Z.0-9]+$/,
                    message: 'Vui lòng nhập mật khẩu hợp lệ!',
                }]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Các mật khẩu đã nhập không khớp. Hãy thử lại!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;