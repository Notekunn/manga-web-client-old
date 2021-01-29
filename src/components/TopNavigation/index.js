import { useCallback, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import Menu from 'antd/lib/menu';
import { HomeOutlined, CaretDownOutlined, LogoutOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { showMessage, showError } from '../../actions/alert';
import { logout } from '../../actions/user';
const { SubMenu } = Menu;

function TopNavigation(props) {
    const history = useHistory();
    // eslint-disable-next-line no-unused-vars
    const { showMessage, showError, logout, loggedIn } = props;
    const [selected, setSelected] = useState('home');
    const onClick = useCallback(
        (e) => {
            setSelected(e.key);
            switch (e.key) {
                case 'login':
                    showMessage("Bạn đang chuyển đến trang đăng nhập", 1)
                    history.push('/auth')
                    break;
                case 'logout':
                    logout();
                    showMessage("Đăng xuất thành công", 2)
                    break;
                case 'users':
                    history.push('/users')
                    break;
                default:
                    break;
            }
        },
        [history, logout, showMessage],
    )
    return (
        <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="users">
                <Link to="/users">Users</Link>
            </Menu.Item>
            {   !loggedIn ?
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
    return {
        loggedIn: state.authentication.loggedIn || false
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showMessage: (message, duration) => dispatch(showMessage(message, duration)),
        showError: (error, duration) => dispatch(showError(error, duration)),
        logout: () => dispatch(logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
