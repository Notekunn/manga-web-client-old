import { Menu } from 'antd';
import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { AppstoreOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function SideNavigation(props) {
    const history = useHistory();
    const onClick = useCallback((e) => {
        switch (e.key) {
            case "users":
                history.push('/users');
                break;
            case "test":
                break;
            case "goback":
                history.goBack();
                break;
            default:
                break;
        }
    }, [history]);
    return (
        <>
            <Menu defaultSelectedKeys={['']} defaultOpenKeys={['sub1']} mode="inline" theme="light" onClick={onClick}>
                <Menu.Item key="users" icon={<UserOutlined />}>
                    Quản lý tài khoản
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Quản lý tác giả
                </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />}>
                    Option 3
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
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

export default SideNavigation;