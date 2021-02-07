import Layout from 'antd/lib/layout';
import Redirect from 'react-router-dom/Redirect';
import SideNavigation from '../components/SideNavigation/';
import TopNavigation from '../components/TopNavigation/';
import BreadcrumbItem from '../components/BreadcrumbItem/';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollapsed, collapseMenu } from '../features/app/globalSlice';
import { selectLogged } from '../features/auth/authSlice';
import './layout.css'
import logo from '../assets/logo.svg';
const { Header, Content, Sider, Footer } = Layout;


export const DefaultFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div className="footter-links">
        <a href="https://github.com/">Github</a>
      </div>
      <div className="copyright">
        {"Ant Design ©" + new Date().getFullYear() + " Created by Ant UED"}
      </div>
    </Footer>
  )
}
const SecurityLayout = ({ children }) => {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const onCollapse = () => dispatch(collapseMenu());
  const isLogged = useSelector(selectLogged);
  if (!isLogged) return <Redirect to="/" />
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={265} collapsible className="site-layout-background" collapsed={collapsed} onCollapse={onCollapse}>
        <div className="sider-logo" >
          <img src={logo} alt="Logo" id="logo" />
          {!collapsed && <h1>Manga App</h1>}
        </div>
        <SideNavigation />
      </Sider>
      <Layout>
        <Header className="header" style={{ padding: 0 }}>
          <TopNavigation />
        </Header>
        <Layout style={{ padding: '0 24px 24px' }}>
          <BreadcrumbItem />
          <Content className="site-layout-background" style={{ padding: 24, margin: 0, overflow: "auto" }}								>
            {children}
          </Content>
          <DefaultFooter />
        </Layout>
      </Layout>
    </Layout>
  );
}


export default SecurityLayout;
