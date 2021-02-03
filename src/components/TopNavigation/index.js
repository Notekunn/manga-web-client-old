import { useCallback, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import Menu from 'antd/lib/menu';
import { HomeOutlined, CaretDownOutlined, LogoutOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, showError } from '../../actions/alert';
import { selectLogged, logout } from '../../features/auth/authSlice';
const { SubMenu } = Menu;

function TopNavigation(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLogged = useSelector(selectLogged);
    // eslint-disable-next-line no-unused-vars
    const [selected, setSelected] = useState('home');
    const onClick = useCallback(
        (e) => {
            setSelected(e.key);
            switch (e.key) {
                case 'login':
                    dispatch(showMessage("Bạn đang chuyển đến trang đăng nhập", 1))
                    history.push('/auth')
                    break;
                case 'logout':
                    dispatch(logout());
                    dispatch(showMessage("Đăng xuất thành công", 2))
                    break;
                case 'users':
                    history.push('/users')
                    break;
                case 'profile':
                    history.push('/me')
                    break;
                default:
                    break;
            }
        },
        [dispatch, history],
    )
    return (
        <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="users">
                <Link to="/users">Users</Link>
            </Menu.Item>
            {   !isLogged ?
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

export default TopNavigation;
