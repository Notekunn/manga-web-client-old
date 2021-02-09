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
        defaultOpenKeys={['manga-manager']}
        mode="inline"
        theme="light"
        onClick={onClick}
      >
        <Menu.Item key="users" icon={<UserOutlined />}>
          Quản lý tài khoản
        </Menu.Item>
        <SubMenu key="manga-manager" icon={<MailOutlined />} title="Quản lý truyện">
          <Menu.Item key="categories">Quản lý thể loại truyện</Menu.Item>
          <Menu.Item key="artists">Quản lý tác giả</Menu.Item>
          <Menu.Item key="translator-groups">Quản lý nhóm dịch</Menu.Item>
          <Menu.Item key="mangas">Quản lý truyện tranh</Menu.Item>
          <Menu.Item key="error">Báo lỗi</Menu.Item>
        </SubMenu>
        <SubMenu key="request-manager" icon={<MailOutlined />} title="Xét duyệt yêu cầu">
          <Menu.Item key="request/create-translator-groups">Yêu cầu tạo nhóm dịch</Menu.Item>
          <Menu.Item key="request/join-translator-groups">Yêu cầu tham gia nhóm dịch</Menu.Item>
          <Menu.Item key="request/create-manga">Yêu cầu dịch truyện</Menu.Item>
          <Menu.Item key="request/create-kind">Yêu cầu tạo tác giả, thể loại</Menu.Item>
        </SubMenu>
        <SubMenu key="my-request" icon={<MailOutlined />} title="Yêu cầu của tôi">
          <Menu.Item key="my-request/join-translator-groups">Yêu cầu tham gia nhóm dịch</Menu.Item>
          <Menu.Item key="my-request/create-manga">Yêu cầu dịch truyện</Menu.Item>
          <Menu.Item key="my-request/create-kind">Yêu cầu tạo tác giả, thể loại</Menu.Item>
        </SubMenu>
        <Menu.Item key="goback" icon={<ContainerOutlined />}>
          Go Back
        </Menu.Item>
      </Menu>
    </>
  );
}

export default memo(SideNavigation);
