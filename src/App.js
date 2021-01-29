import { useState } from 'react'
import Layout from 'antd/lib/layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import TopNavigation from './components/TopNavigation/';
import SideNavigation from './components/SideNavigation/';
import BreadcrumbItem from './components/BreadcrumbItem';
import ApplicationAlert from './components/ApplicationAlert';
import AuthPage from './pages/AuthPage/';
import HomePage from './pages/HomePage/';
import AccountManagerPage from './pages/AccountManagerPage/';
import ProfilePage from './pages/ProfilePage/';
const { Header, Content, Sider, Footer } = Layout;
function App() {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Router>
			<ApplicationAlert />
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
						<Content className="site-layout-background" style={{ padding: 24, margin: 0, overflow: "auto" }}								>
							<Switch>
								<Route path="/" exact>
									<HomePage />
								</Route>
								<Route path="/auth"  >
									<AuthPage />
								</Route>
								<Route path="/users" >
									<AccountManagerPage />
								</Route>
								<Route path="/me" >
									<ProfilePage />
								</Route>
							</Switch>
						</Content>
						<Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
					</Layout>
				</Layout>
			</Layout>
		</Router>
	);
}

export default App;
