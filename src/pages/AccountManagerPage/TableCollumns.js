import { Space, Tag, Popconfirm, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {deleteUser} from '../../actions/user';
function ItemDelete({ text, record = {} }) {
    const { permission } = record;
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    return (
        <Space size="middle">
            {permission === 'member' ?
                <Popconfirm
                    title="Bạn có chắc muốn xóa?"
                    onConfirm={() => dispatch(deleteUser(token, record._id))}
                    okText="OK"
                    cancelText="Không">
                    <a key="delete" href="/#"> Xóa</a>
                </Popconfirm> :
                <Popover content={<span>Không có quyền xoá</span>}>
                    <span>Xóa</span>
                </Popover>
            }
            <a key="edit" href="/#"> Sửa</a>
        </Space>
    );
}
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
        render: (text, record) => <ItemDelete text={text} record={record} />,
    },
];