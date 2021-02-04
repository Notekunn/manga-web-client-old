import { Form, Input, Spin, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { selectAddingUser, selectAddUserError } from '../userSlice';
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

const RegistrationForm = ({ form }) => {
    const addingUser = useSelector(selectAddingUser);
    const addUserError = useSelector(selectAddUserError);
    return (
        <Spin size="large" spinning={addingUser}>
            {!!addUserError && <Alert
                message={addUserError}
                type="error"
                showIcon
                style={{ marginBottom: 20 }}
            />}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
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
                    rules={[{
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
                    })]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default RegistrationForm;