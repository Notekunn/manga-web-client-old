import React, { useState, useEffect } from 'react';
import { Table, Form, Skeleton, Modal, Button } from 'antd';
import AddAccount from '../../components/AddAccount';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  addUser,
  removeUser,
  updateUser,
  selectUsers,
  selectFetchingUsers,
  selectAddingUser,
  selectModalAddUserVisible,
  showModal,
  hideModal,
} from '../../userSlice';
import { generateColumns } from './TableCollumns';
import './AccountManager.css';
import UpdateAccount from '../../components/UpdateAccount';
import AddIcon from '@ant-design/icons/FolderAddOutlined';
import TableToolbar from '../../../../components/TableToolbar';

const EditableTable = () => {
  const [form] = Form.useForm();
  const modalVisible = useSelector(selectModalAddUserVisible);
  const addingUser = useSelector(selectAddingUser);
  const data = useSelector(selectUsers);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const fetching = useSelector(selectFetchingUsers);
  const dispatch = useDispatch();
  const [editingItem, setEditingItem] = useState({});
  useEffect(() => {
    dispatch(fetchUsers());
    return () => {};
  }, [dispatch]);

  const updateEvent = (values) => {
    dispatch(updateUser({ ...editingItem, ...values }));
    setEditModalVisible(false);
  };
  const deleteEvent = (_id) => dispatch(removeUser(_id));

  const triggerEdit = (item) => {
    if (!item) return;
    setEditingItem({ ...item });
    setEditModalVisible(true);
  };

  const columns = generateColumns(triggerEdit, deleteEvent, editModalVisible);
  const modalSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const { userName, name, email, password } = form.getFieldsValue();
        dispatch(addUser({ userName, name, email, password }));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  return (
    <div>
      <TableToolbar title="Quản lý tài khoản" triggerAdd={() => dispatch(showModal())} />
      {fetching ? (
        <Skeleton />
      ) : (
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 10,
          }}
          rowKey={(record) => record._id}
        />
      )}
      <Modal
        title="Thêm tài khoản"
        visible={modalVisible}
        confirmLoading={addingUser}
        onOk={modalSubmit}
        onCancel={() => dispatch(hideModal())}
        destroyOnClose={true}
      >
        <AddAccount form={form} />
      </Modal>
      <UpdateAccount
        onSubmit={updateEvent}
        onCancel={() => setEditModalVisible(false)}
        updateModalVisible={editModalVisible}
        values={editingItem}
      />
    </div>
  );
};
export default EditableTable;
