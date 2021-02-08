import Menu from 'antd/lib/menu';
import { useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { ContainerOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function SideNavigation(props) {
  const history = useHistory();
  const onClick = useCallback(
    (e) => {
      switch (e.key) {
        case 'goback':
          history.goBack();
          break;
        default:
          history.push(`/${e.key}`);
          break;
      }
    },
    [history],
  );
  return (
    <>
      <Menu
        defaultSelectedKeys={['']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        onClick={onClick}
      >
        <Menu.Item key="users" icon={<UserOutlined />}>
          Quản lý tài khoản
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Quản lý truyện">
          <Menu.Item key="categories">Quản lý thể loại truyện</Menu.Item>
          <Menu.Item key="artists">Quản lý tác giả</Menu.Item>
          <Menu.Item key="translator-groups">Quản lý nhóm dịch</Menu.Item>
          <Menu.Item key="mangas">Quản lý truyện tranh</Menu.Item>
        </SubMenu>
        <Menu.Item key="test" icon={<ContainerOutlined />}>
          Show Error
        </Menu.Item>
        <Menu.Item key="goback" icon={<ContainerOutlined />}>
          Go Back
        </Menu.Item>
      </Menu>
    </>
  );
}

export default memo(SideNavigation);
