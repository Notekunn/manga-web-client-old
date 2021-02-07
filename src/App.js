import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from './routes/Admin';
import './App.css';
function App() {
  return (
    <Router>
      {/* <ApplicationAlert />
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={265} collapsible trigger={null} className="site-layout-background" collapsed={collapsed} onCollapse={setCollapsed}>
          <div className={collapsed ? 'mini-logo' : 'logo'} onClick={() => setCollapsed(!collapsed)} />
          <SideNavigation />
        </Sider>
        <Layout>
          <Header className="header" style={{ padding: 0 }}>
            <TopNavigation />
          </Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <BreadcrumbItem />
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, overflow: "auto" }}								> */}
      <Switch>
        <Route path="/" >
          <AdminRoute />
        </Route>
      </Switch>
      {/* </Content>
            <Footer style={{ textAlign: 'center' }}>
              <div className="footer-links">
                <a href="https://github.com/">Github</a>
              </div>
              <div className="copyright">
                {"Ant Design ©" + new Date().getFullYear() + " Created by Ant UED"}
              </div>
            </Footer>
          </Layout>
        </Layout>
      </Layout> */}
    </Router>
  );
}

export default App;
