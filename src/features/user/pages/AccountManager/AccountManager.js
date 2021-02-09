import React, { useState, useEffect } from 'react';
import { Table, Form, Skeleton, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { generateColumns } from './TableCollumns';
import UpdateAccount from '../../components/UpdateAccount';
import TableToolbar from '../../../../components/TableToolbar';
import AddAccount from '../../components/AddAcount';
import {
  fetchUsers,
  addUser,
  removeUser,
  updateUser,
  selectUsers,
  selectFetchingUsers,
} from '../../userSlice';
import {
  selectModalShowing,
  selectModalLoading,
  hideModal,
  showModal,
} from '../../../app/globalSlice';
import './AccountManager.css';

const EditableTable = () => {
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
  const addEvent = (values) => {
    dispatch(addUser(values));
    dispatch(hideModal());
  };
  const deleteEvent = (_id) => dispatch(removeUser(_id));

  const triggerEdit = (item) => {
    if (!item) return;
    setEditingItem({ ...item });
    dispatch(showModal('UPDATE_ACCOUNT'));
  };

  const columns = generateColumns(triggerEdit, deleteEvent, modalShowing === 'UPDATE_ACCOUNT');

  if (fetching) return <Skeleton />;
  return (
    <div>
      <TableToolbar
        title="Quản lý tài khoản"
        triggerAdd={() => dispatch(showModal('ADD_ACCOUNT'))}
      />
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
      <AddAccount
        onSubmit={addEvent}
        closeModal={() => dispatch(hideModal())}
        modalLoading={modalLoading === 'ADD_ACCOUNT'}
        modalVisible={modalShowing === 'ADD_ACCOUNT'}
      />
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
