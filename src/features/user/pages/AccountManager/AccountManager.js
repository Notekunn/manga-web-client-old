import React, { useState, useEffect } from 'react';
import { Table, Form, Skeleton, Modal } from 'antd';
import AddAccount from '../../components/AddAccount';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  addUser,
  removeUser,
  updateUser,
  selectUsers,
  selectFetchingUsers,
} from '../../userSlice';
import { generateColumns } from './TableCollumns';
import './AccountManager.css';
import UpdateAccount from '../../components/UpdateAccount';
import TableToolbar from '../../../../components/TableToolbar';
import {
  selectModalShowing,
  selectModalLoading,
  hideModal,
  showModal,
} from '../../../app/globalSlice';

const EditableTable = () => {
  const [form] = Form.useForm();
  const data = useSelector(selectUsers);
  const fetching = useSelector(selectFetchingUsers);
  const dispatch = useDispatch();
  const [editingItem, setEditingItem] = useState({});
  const modalShowing = useSelector(selectModalShowing);
  const modalLoading = useSelector(selectModalLoading);
  useEffect(() => {
    dispatch(fetchUsers());
    return () => {};
  }, [dispatch]);

  const updateEvent = (values) => {
    dispatch(updateUser({ ...editingItem, ...values }));
    dispatch(hideModal());
  };
  const deleteEvent = (_id) => dispatch(removeUser(_id));

  const triggerEdit = (item) => {
    if (!item) return;
    setEditingItem({ ...item });
    dispatch(showModal('UPDATE_ACCOUNT'));
  };

  const columns = generateColumns(triggerEdit, deleteEvent, modalShowing === 'UPDATE_ACCOUNT');
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
      <TableToolbar
        title="Quản lý tài khoản"
        triggerAdd={() => dispatch(showModal('ADD_ACCOUNT'))}
      />
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
        visible={modalShowing === 'ADD_ACCOUNT'}
        confirmLoading={modalLoading === 'ADD_ACCOUNT'}
        onOk={modalSubmit}
        onCancel={() => dispatch(hideModal())}
        destroyOnClose={true}
      >
        <AddAccount form={form} />
      </Modal>
      <UpdateAccount
        onSubmit={updateEvent}
        closeModal={() => dispatch(hideModal())}
        modalVisible={modalShowing === 'UPDATE_ACCOUNT'}
        modalLoading={modalLoading === 'UPDATE_ACCOUNT'}
        values={editingItem}
      />
    </div>
  );
};
export default EditableTable;
