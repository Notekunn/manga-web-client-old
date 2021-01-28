import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
const siteMap = {
    '/users': 'Quản lý nhân viên',
    '/artists': 'Quản lý tác giả',
};
export default withRouter(function (props) {
    const { location: { pathname } } = props;
    const pathSnippets = pathname.split('/').filter(i => i);
    return (
        <>
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
        </>
    )
});
