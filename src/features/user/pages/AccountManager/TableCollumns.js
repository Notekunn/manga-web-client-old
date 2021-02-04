import { Space, Popconfirm, Popover, Typography, Input } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
import InputPermission from '../../components/InputPermission';
import Permission from '../../components/Permission';
export const ActionEditAndDelete = ({ record, onTriggerEdit, onDelete, disableEdit }) => {
    return (
        <Space size="middle">
            <Typography.Link disabled={disableEdit} onClick={() => onTriggerEdit(record)}>
                {"Edit"}
            </Typography.Link>
            {record.permission === 'member' && (
                <Popconfirm
                    title="Bạn có chắc muốn xóa?"
                    onConfirm={() => onDelete(record._id)}
                    okText="OK"
                    cancelText="Không">
                    <a key="delete" href="/#"> Xóa</a>
                </Popconfirm>
            )}
            {record.permission !== 'member' && (
                <Popover content={<span>Không có quyền xoá</span>}>
                    <span>Xóa</span>
                </Popover>
            )}
        </Space>
    )
}
export const ActionSaveAndCancel = ({ record, onUpdate, onCancel }) => {
    return (
        <Space size="middle">
            <Typography.Link onClick={() => onUpdate(record._id)}>
                {"Update"}
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
                <Typography.Link onClick={onCancel}>
                    {"Cancel"}
                </Typography.Link>
            </Popconfirm>
        </Space>
    )
}

export const header = [
    {
        title: 'Tên tài khoản',
        dataIndex: 'userName',
        key: 'userName',
        editable: true,
        defaultSortOrder: 'ascend',
        sorter: {
            compare: (a, b) => String(a.userName).localeCompare(String(b.userName)),
            multiple: 3
        },
        inputNode: <Input />
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        sorter: {
            compare: (a, b) => String(a.name).localeCompare(String(b.name)),
            multiple: 2
        },
        inputNode: <Input />
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        editable: true,
        sorter: {
            compare: (a, b) => String(a.email).localeCompare(String(b.email)),
            multiple: 1
        },
        inputNode: <Input />
    },
    {
        title: 'Chức vụ',
        dataIndex: 'permission',
        key: 'permission',
        editable: true,
        render: permission => <Permission permission={permission} />,
        inputNode: <InputPermission />
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];
export const generateColumns = (isEditing, onUpdate, onCancel, onDelete, onTriggerEdit) => {
    return [
        ...header,
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record._id);
                if (editable) return (
                    <ActionSaveAndCancel
                        record={record}
                        onUpdate={onUpdate}
                        onCancel={onCancel} />
                )
                return (
                    <ActionEditAndDelete
                        record={record}
                        disableEdit={!isEditing("")}
                        onDelete={onDelete}
                        onTriggerEdit={onTriggerEdit} />
                )
            },
        }
    ];
}