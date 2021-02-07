import { useEffect } from 'react';
import Layout from 'antd/lib/layout';
import LoadingGlobal from '../components/LoadingGlobal/';
import { Redirect } from 'react-router-dom';
import SideNavigation from '../components/SideNavigation/';
import TopNavigation from '../components/TopNavigation/';
import BreadcrumbItem from '../components/BreadcrumbItem/';
import Page403 from '../features/app/pages/Exception/403/';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollapsed, collapseMenu } from '../features/app/globalSlice';
import { selectLogged } from '../features/auth/authSlice';
import { selectFetchingMe, selectMe, fetchMe } from '../features/user/userSlice';
import { isAuthority } from '../utils/';
import logo from '../assets/logo.svg';
import './layout.css';
const { Header, Content, Sider, Footer } = Layout;

export const DefaultFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <div className="footter-links">
        <a href="https://github.com/">Github</a>
      </div>
      <div className="copyright">
        {'Ant Design ©' + new Date().getFullYear() + ' Created by Ant UED'}
      </div>
    </Footer>
  );
};
const SecurityLayout = ({ children, needPermission = 'member' }) => {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const onCollapse = () => dispatch(collapseMenu());
  const isLogged = useSelector(selectLogged);
  const isFetchingMe = useSelector(selectFetchingMe);
  const user = useSelector(selectMe);
  const needValidate = needPermission !== 'member';
  useEffect(() => {
    if (needValidate) dispatch(fetchMe());
    return () => {};
  }, [dispatch, needValidate]);
  if (!isLogged) return <Redirect to="/auth" />;
  if (needValidate) {
    if (isFetchingMe) return <LoadingGlobal />;
    if (!user || !user.permission || !isAuthority(user, needPermission)) return <Page403 />;
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={265}
        collapsible
        className="site-layout-background"
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="sider-logo">
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
          <Content
            className="site-layout-background"
            style={{ padding: '0 24px', margin: 0, overflow: 'auto' }}
          >
            {children}
          </Content>
          <DefaultFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SecurityLayout;
