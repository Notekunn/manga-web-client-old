import { useEffect, useState } from 'react';
import { fetchArtists, selectFetchingArtists, selectArtists } from '../../artistSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'antd/lib/skeleton';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Popconfirm from 'antd/lib/popconfirm';
import Typography from 'antd/lib/typography';
import TableToolbar from '../../../../components/TableToolbar';
import AddArtist from '../../components/AddArtist';
import UpdateArtist from '../../components/UpdateArtist';
import { addArtist } from '../../artistSlice';
import {
  selectModalShowing,
  selectModalLoading,
  hideModal,
  showModal,
} from '../../../app/globalSlice';
const ActionEditAndDelete = ({ record, onTriggerEdit, onDelete, disableEdit }) => {
  return (
    <Space size="middle">
      <Typography.Link disabled={disableEdit} onClick={() => onTriggerEdit(record)}>
        {'Edit'}
      </Typography.Link>
      <Popconfirm
        title="Bạn có chắc muốn xóa?"
        onConfirm={() => onDelete(record)}
        okText="OK"
        cancelText="Không"
      >
        <a key="delete" href="/#">
          {' '}
          Xóa
        </a>
      </Popconfirm>
    </Space>
  );
};
function ArtistManager(props) {
  const dispatch = useDispatch();
  const [edittingItem, setEditingItem] = useState({});
  const fetching = useSelector(selectFetchingArtists);
  const artists = useSelector(selectArtists);
  const modalShowing = useSelector(selectModalShowing);
  const modalLoading = useSelector(selectModalLoading);
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  if (fetching) return <Skeleton />;
  const addEvent = (values) => {
    dispatch(addArtist(values));
    dispatch(hideModal());
  };
  const updateEvent = (values) => {
    dispatch(hideModal());
  };
  const deleteEvent = (values) => {
    console.log('DELETE: ', values);
  };
  const triggerEdit = (item) => {
    setEditingItem(item);
    if (item) dispatch(showModal('UPDATE_ARTIST'));
  };
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => String(a.name).localeCompare(String(b.name)),
      },
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'about',
      key: 'about',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <ActionEditAndDelete
          record={record}
          onTriggerEdit={triggerEdit}
          onDelete={deleteEvent}
          disableEdit={modalLoading === 'UPDATE_ARTIST'}
        />
      ),
    },
  ];
  return (
    <div>
      <TableToolbar
        title="Quản lý tác giả"
        triggerAdd={() => dispatch(showModal('ADD_ARTIST'))}
        triggerSync={() => dispatch(fetchArtists())}
      />
      {fetching ? (
        <Skeleton />
      ) : (
        <Table
          bordered
          dataSource={artists}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 10,
          }}
          rowKey={(record) => record._id}
        />
      )}
      <AddArtist
        closeModal={() => dispatch(hideModal())}
        modalVisible={modalShowing === 'ADD_ARTIST'}
        modalLoading={modalLoading === 'ADD_ARTIST'}
        onSubmit={addEvent}
      />
      <UpdateArtist
        closeModal={() => dispatch(hideModal())}
        modalVisible={modalShowing === 'UPDATE_ARTIST'}
        modalLoading={modalLoading === 'UPDATE_ARTIST'}
        onSubmit={updateEvent}
        values={edittingItem}
      />
    </div>
  );
}

export default ArtistManager;
