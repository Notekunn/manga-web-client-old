import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
const siteMap = {
    '/users': 'Quản lý nhân viên',
    '/artists': 'Quản lý tác giả',
    '/me': 'Thông tin cá nhân',
};
export default withRouter(function Item(props) {
    const { location: { pathname } } = props;
    const pathSnippets = pathname.split('/').filter(i => i);
    return (
        <Breadcrumb style={{ margin: '16px 0' }} routes>
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {pathSnippets.map((_, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}>{siteMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    )
});
