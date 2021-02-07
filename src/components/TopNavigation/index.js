import { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import {
  HomeOutlined,
  CaretDownOutlined,
  LogoutOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogged, logout } from '../../features/auth/authSlice';
import { showMessage } from '../../features/app/alertSlice';
const { SubMenu } = Menu;

function TopNavigation(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector(selectLogged);
  const [selected, setSelected] = useState('home');
  const onClick = useCallback(
    (e) => {
      setSelected(e.key);
      switch (e.key) {
        case 'login':
          dispatch(
            showMessage({
              message: 'Bạn đang chuyển đến trang đăng nhập',
              duration: 3,
              key: 'redirect',
            }),
          );
          history.push('/auth');
          break;
        case 'logout':
          dispatch(logout());
          dispatch(
            showMessage({
              message: 'Đăng xuất thành công',
              duration: 3,
              key: 'redirect',
            }),
          );
          break;
        case 'users':
          history.push('/users');
          break;
        case 'profile':
          history.push('/me');
          break;
        default:
          break;
      }
    },
    [dispatch, history],
  );
  return (
    <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="users">
        <Link to="/users">Users</Link>
      </Menu.Item>
      {!isLogged ? (
        <Menu.Item key="login" style={{ float: 'right' }}>
          Đăng nhập
        </Menu.Item>
      ) : (
        <SubMenu
          key="setting"
          icon={<CaretDownOutlined />}
          title="Cá Nhân"
          style={{ float: 'right' }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Trang cá nhân
          </Menu.Item>
          <Menu.Item key="follow" icon={<BookOutlined />}>
            Truyện theo dõi
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
}

export default TopNavigation;
