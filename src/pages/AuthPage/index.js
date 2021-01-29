import { Row, Col } from 'antd';
import './index.css';
import LoginForm from './LoginForm';
function AuthPage(props) {
    return (

        <Row style={{ paddingTop: 50 }}>
            <Col span={8} offset={8}>
                <LoginForm />
            </Col>
        </Row>

    )
}
export default AuthPage;