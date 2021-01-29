import { useCallback, useState } from 'react'
import { Link } from "react-router-dom";
import { Menu, } from 'antd';
import { HomeOutlined, CaretDownOutlined, LogoutOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { showMessage, showError } from '../../actions/alert';
const { SubMenu } = Menu;

function TopNavigation(props) {
    const { showMessage, showError } = props;
    const [selected, setSelected] = useState('home');
    const onClick = useCallback(
        (e) => {
            setSelected(e.key);
            switch (e.key) {
                case 'login':
                    showMessage("Bạn đang chuyển đến trang đăng nhập")
                    break;
                case 'logout':
                    break;
                case 'users':
                    showError("Bạn không có quyền nhé ahihi")
                    break;
                default:
                    break;
            }
        },
        [showError, showMessage],
    )
    return (
        <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="users">
                <Link to="/users">Users</Link>
            </Menu.Item>
            {   true ?
                <Menu.Item key="login" style={{ float: 'right' }}>
                    Đăng nhập
                </Menu.Item>
                :
                <SubMenu key="setting" icon={<CaretDownOutlined />} title="Cá Nhân" style={{ float: 'right' }}>
                    <Menu.Item key="profile" icon={<UserOutlined />}>Trang cá nhân</Menu.Item>
                    <Menu.Item key="follow" icon={<BookOutlined />}>Truyện theo dõi</Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
                </SubMenu>
            }
        </Menu>
    )
}
const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {
    return {
        showMessage: (message, duration) => dispatch(showMessage(message, duration)),
        showError: (error, duration) => dispatch(showError(error, duration)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
