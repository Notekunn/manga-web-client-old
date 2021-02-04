import React, { useState, useEffect } from 'react';
import { Table, Form, Skeleton, Modal, Button } from 'antd';
import EditableCell from '../../components/EditableCell';
import AddAccount from '../../components/AddAccount';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUsers, addUser, removeUser,
    selectUsers, selectFetchingUsers,
    selectAddingUser, selectModalAddUserVisible,
    showModal, hideModal
} from '../../userSlice';
import { generateColumns } from './TableCollumns';
import './AccountManager.css';
const EditableTable = () => {
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const modalVisible = useSelector(selectModalAddUserVisible);
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
    const isEditing = (_id) => _id === editingKey;

    const cancelEdit = () => {
        setEditingKey('');
    };

    const update = async (_id) => {
        try {
            const row = await form.validateFields();
            console.log(row, _id);
            setEditingKey("");
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const deleteUser = (_id) => dispatch(removeUser(_id))

    const columns = generateColumns(isEditing, update, cancelEdit, deleteUser, edit);
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => {
                return {
                    record,
                    inputNode: col.inputNode,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record._id),
                }
            },
        };
    });
    const modalSubmit = () => {
        addForm.validateFields()
            .then(() => {
                const { userName, name, email, password } = addForm.getFieldsValue();
                dispatch(addUser({ userName, name, email, password }));
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <div>
            <Button onClick={() => dispatch(showModal())} type="primary" style={{ marginBottom: 16 }} >{'Thêm tài khoản'}</Button>
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
                            onChange: cancelEdit,
                        }}
                        rowKey={(record) => record._id}
                    />
                </Form>
            }
            <Modal title="Thêm tài khoản"
                visible={modalVisible}
                confirmLoading={addingUser}
                onOk={modalSubmit}
                onCancel={() => dispatch(hideModal())}
                destroyOnClose={true}
            >
                <AddAccount form={addForm} />
            </Modal>
        </div>
    );
};
export default EditableTable;
