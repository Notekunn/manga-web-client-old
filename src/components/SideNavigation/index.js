import Menu from 'antd/lib/menu';
import { useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { ContainerOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function SideNavigation(props) {
  const history = useHistory();
  const onClick = useCallback(
    (e) => {
      console.log(e);
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
  const keys = history?.location?.pathname?.split('/').filter((e) => !!e);
  return (
    <>
      <Menu
        defaultSelectedKeys={[keys.join('/')]}
        defaultOpenKeys={keys}
        mode="inline"
        theme="light"
        onClick={onClick}
      >
        <Menu.Item key="users" icon={<UserOutlined />}>
          Quản lý tài khoản
        </Menu.Item>
        <SubMenu key="manager" icon={<MailOutlined />} title="Quản lý truyện">
          <Menu.Item key="manager/categories">Quản lý thể loại truyện</Menu.Item>
          <Menu.Item key="manager/artists">Quản lý tác giả</Menu.Item>
          <Menu.Item key="manager/translator-groups">Quản lý nhóm dịch</Menu.Item>
          <Menu.Item key="manager/mangas">Quản lý truyện tranh</Menu.Item>
          <Menu.Item key="manager/error">Báo lỗi</Menu.Item>
        </SubMenu>
        <SubMenu key="request" icon={<MailOutlined />} title="Xét duyệt yêu cầu">
          <Menu.Item key="request/create-translator-groups">Yêu cầu tạo nhóm dịch</Menu.Item>
          <Menu.Item key="request/join-translator-groups">Yêu cầu tham gia nhóm dịch</Menu.Item>
          <Menu.Item key="request/create-manga">Yêu cầu dịch truyện</Menu.Item>
          <Menu.Item key="request/create-kind">Yêu cầu tạo tác giả, thể loại</Menu.Item>
        </SubMenu>
        <SubMenu key="me" icon={<MailOutlined />} title="Yêu cầu của tôi">
          <Menu.Item key="me/join-translator-groups">Yêu cầu tham gia nhóm dịch</Menu.Item>
          <Menu.Item key="me/create-manga">Yêu cầu dịch truyện</Menu.Item>
          <Menu.Item key="me/create-kind">Yêu cầu tạo tác giả, thể loại</Menu.Item>
        </SubMenu>
        <Menu.Item key="goback" icon={<ContainerOutlined />}>
          Go Back
        </Menu.Item>
      </Menu>
    </>
  );
}

export default memo(SideNavigation);
