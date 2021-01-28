import { Space, Tag } from 'antd';
export const columns = [
    {
        title: 'Tên tài khoản',
        dataIndex: 'userName',
        key: 'userName',
        sorter: {
            compare: (a, b) => String(a.userName).localeCompare(String(b.userName)),
            multiple: 3
        }
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        sorter: {
            compare: (a, b) => String(a.name).localeCompare(String(b.name)),
            multiple: 2
        }
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: {
            compare: (a, b) => String(a.email).localeCompare(String(b.email)),
            multiple: 1
        }
    },
    {
        title: 'Chức vụ',
        dataIndex: 'permission',
        key: 'permission',
        render: permission => {
            const color = ({
                admin: 'red',
                moderator: 'gold',
                translator: 'blue',
                member: 'lime'
            })[permission];
            return (
                <Tag color={color} key={permission}>
                    {permission.toUpperCase()}
                </Tag>
            )
        }
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a key="delete" href="/#"> Xóa</a>
                <a key="edit" href="/#"> Sửa</a>
            </Space>
        ),
    },
];