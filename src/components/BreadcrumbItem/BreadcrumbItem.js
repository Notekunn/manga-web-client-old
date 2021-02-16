import React from "react";
import { Link, withRouter } from "react-router-dom";
import Breadcrumb from "antd/lib/breadcrumb";
const siteMap = {
  "/": "Home",
  "/users": "Quản lý nhân viên",
  "/me": "Thông tin cá nhân",
  "/auth": "Đăng nhập",
  "/manager": "Quản lý",
  "/manager/artists": "Quản lý tác giả",
  "/manager/categories": "Quản lý thể loại",
};
const splitPath = (pathname) => {
  const snippets = pathname.split("/").filter((p) => !!p);
  let linkMap = snippets.map(
    (_, i) => `/${snippets.slice(0, i + 1).join("/")}`
  );
  return ["/", ...linkMap];
};
export default withRouter(function Item(props) {
  const {
    location: { pathname },
  } = props;
  // const pathSnippets = pathname.split('/').filter(i => i);
  const links = splitPath(pathname);
  return (
    <Breadcrumb style={{ margin: "16px 0" }} routes>
      {links.map((url) => (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{siteMap[url]}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
});
