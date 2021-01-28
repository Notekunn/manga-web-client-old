import { useCallback } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const LoginForm = () => {
    const onFinish = useCallback(
        (fields) => {
            let userName = fields.userName.trim(), password = fields.password.trim();
            if (!userName.length && !password.length) return;
            // eslint-disable-next-line no-unused-vars
            const variables = { userName, password };

        },
        [],
    )

    return (
        <Form name="normal_login" className="login-form" initialValues={{
            remember: true,
        }} onFinish={onFinish}>
            <Form.Item name="userName" rules={[{
                required: true,
                message: 'Tên người dùng không hợp lệ!',
                whitespace: false
            }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{
                required: true,
                message: 'Mật khẩu không hợp lệ!',
            }]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link className="login-form-forgot" to="/">Forgot password</Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                {" Or"} <Link className="login-form-forgot" to="/">register now!</Link>
            </Form.Item>
        </Form>
    );
};
export default LoginForm;