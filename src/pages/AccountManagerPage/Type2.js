import React, { useState, useEffect } from 'react';
import { Table, Tag, Popconfirm, Form, Typography, Space, Popover } from 'antd';
import EditableCell from './EditableCell';
import originData from './sample-data';
import { useSelector, useDispatch } from 'react-redux';
import * as userAction from '../../actions/user';


const EditableTable = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id === editingKey;
    const data = useSelector(state => state.user.users || originData);
    const fetching = useSelector(state => state.user.loading);
    const token = useSelector(state => state.authentication.token);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction.getAll(token))
        return () => {
            if (fetching) dispatch(userAction.getAllFailure())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const edit = (record) => {
        form.setFieldsValue({
            userName: '',
            name: '',
            email: '',
            permission: '',
            ...record,
        });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row, key);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'userName',
            key: 'userName',
            editable: true,
            sorter: {
                compare: (a, b) => String(a.userName).localeCompare(String(b.userName)),
                multiple: 3
            }
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            sorter: {
                compare: (a, b) => String(a.name).localeCompare(String(b.name)),
                multiple: 2
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            editable: true,
            sorter: {
                compare: (a, b) => String(a.email).localeCompare(String(b.email)),
                multiple: 1
            }
        },
        {
            title: 'Chức vụ',
            dataIndex: 'permission',
            key: 'permission',
            editable: true,
            render: permission => {
                const color = ({
                    admin: 'red',
                    moderator: 'gold',
                    translator: 'blue',
                    member: 'lime'
                })[permission];
                return (
                    <Tag color={color} key={permission}>
                        {permission?.toUpperCase()}
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
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            {"Save"}
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Typography.Link onClick={cancel}>
                                {"Cancel"}
                            </Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                        <Space size="middle">
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </Typography.Link>
                            {record.permission === 'member' ?
                                <Popconfirm
                                    title="Bạn có chắc muốn xóa?"
                                    onConfirm={() => { }}
                                    okText="OK"
                                    cancelText="Không">
                                    <a key="delete" href="/#"> Xóa</a>
                                </Popconfirm> :
                                <Popover content={<span>Không có quyền xoá</span>}>
                                    <span>Xóa</span>
                                </Popover>
                            }
                        </Space>
                    );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'permission' ? 'permission' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default EditableTable;
