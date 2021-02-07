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

  const update = (values) => {
    dispatch(updateUser({ ...editingItem, ...values }));
    setEditModalVisible(false);
  };
  const deleteUser = (_id) => dispatch(removeUser(_id));

  const edit = (item) => {
    if (!item) return;
    setEditingItem({ ...item });
    setEditModalVisible(true);
  };

  const columns = generateColumns(edit, deleteUser, editModalVisible);
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
      <div style={{ lineHeight: 1, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <h3 style={{ marginBottom: 0 }}>Quản lý tài khoản</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button onClick={() => dispatch(showModal())} style={{ float: 'right' }} type="primary">
              <AddIcon />
              {'Thêm'}
            </Button>
          </div>
        </div>
      </div>
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
        onSubmit={update}
        onCancel={() => setEditModalVisible(false)}
        updateModalVisible={editModalVisible}
        values={editingItem}
      />
    </div>
  );
};
export default EditableTable;
