import React, { useState, useEffect } from 'react';
import { Table, Tag, Popconfirm, Form, Typography, Space, Popover, Skeleton, Modal, Button } from 'antd';
import EditableCell from '../../components/EditableCell';
import AddAccount from '../../components/AddAccount';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, removeUser, selectUsers, selectFetchingUsers, selectAddingUser } from '../../userSlice';
const EditableTable = () => {
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const addingUser = useSelector(selectAddingUser);
    const data = useSelector(selectUsers);
    const fetching = useSelector(selectFetchingUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
        return () => {
        }
    }, [dispatch]);
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
    const isEditing = (record) => record._id === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log(row, key);
            setEditingKey("");
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const deleteUser = async (_id) => {
        dispatch(removeUser(_id));
    }

    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'userName',
            key: 'userName',
            editable: true,
            defaultSortOrder: 'ascend',
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
                        <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
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
                                    onConfirm={() => deleteUser(record._id)}
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
    const modalSubmit = () => {
        addForm.validateFields()
            .then((values) => {
                const { /* _userName: */ userName, name, email, /* _password: */ password } = addForm.getFieldsValue();
                dispatch(addUser({ userName, name, email, password }));
                addForm.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <div>
            <Button onClick={() => setModalVisible(true)} type="primary" style={{ marginBottom: 16 }} >{'Thêm tài khoản'}</Button>
            {fetching ? <Skeleton /> :
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
                        rowKey={(record) => record._id}
                    />
                </Form>
            }
            <Modal title="Thêm tài khoản"
                visible={modalVisible}
                confirmLoading={addingUser}
                onOk={modalSubmit}
                onCancel={() => setModalVisible(false)}
                destroyOnClose={true}
            >
                <AddAccount form={addForm} />
            </Modal>
        </div>
    );
};
export default EditableTable;
