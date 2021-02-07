import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
const siteMap = {
  '/': 'Home',
  '/users': 'Quản lý nhân viên',
  '/artists': 'Quản lý tác giả',
  '/me': 'Thông tin cá nhân',
};
const splitPath = (pathname) => {
  const snippets = pathname.split('/');
  return snippets.map((_, i) => `/${snippets.slice(0, i + 1).join('/')}`);
};
export default withRouter(function Item(props) {
  const {
    location: { pathname },
  } = props;
  // const pathSnippets = pathname.split('/').filter(i => i);
  const links = splitPath(pathname);
  return (
    <Breadcrumb style={{ margin: '16px 0' }} routes>
      {links.map((url) => (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{siteMap[url]}</Link>
        </Breadcrumb.Item>
      ))}
      {/* <Breadcrumb.Item key="home">
				<Link to="/">Home</Link>
			</Breadcrumb.Item>
			{pathSnippets.map((_, index) => {
				const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
				return (
					<Breadcrumb.Item key={url}>
						<Link to={url}>{siteMap[url]}</Link>
					</Breadcrumb.Item>
				);
			})} */}
    </Breadcrumb>
  );
});
