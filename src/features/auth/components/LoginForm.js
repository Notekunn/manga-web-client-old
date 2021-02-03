import { useCallback } from 'react'
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectLogging, login, selectLogged, selectError } from '../authSlice';
import './LoginForm.css'
const NormalLoginForm = (props) => {
    const dispatch = useDispatch();
    const logging = useSelector(selectLogging);
    const logged = useSelector(selectLogged);
    const error = useSelector(selectError);
    const onFinish = useCallback(
        (fields) => {
            let userName = fields.userName.trim(), password = fields.password.trim();
            if (!userName.length && !password.length) return;
            // login(userName, password);
            dispatch(login(userName, password));
        },
        [dispatch],
    )
    if (logged) return (<Redirect to="/" />)
    return (
        <Spin size="large" spinning={!!logging}>
            {!!error && <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 20 }}
            />}
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
        </Spin>
    );
};

export default NormalLoginForm;