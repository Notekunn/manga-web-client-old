import { useEffect } from 'react';
import { fetchArtists, selectFetchingArtists, selectArtists } from '../../artistSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'antd/lib/skeleton';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Popconfirm from 'antd/lib/popconfirm';
import Typography from 'antd/lib/typography';
import AddIcon from '@ant-design/icons/FileAddOutlined';
import TableToolbar from '../../../../components/TableToolbar';
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
  const fetching = useSelector(selectFetchingArtists);
  const artists = useSelector(selectArtists);
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  if (fetching) return <Skeleton />;
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
      render: (_, record) => <ActionEditAndDelete record={record} />,
    },
  ];
  return (
    <div>
      <TableToolbar title="Quản lý tác giả" triggerAdd={() => {}} />
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
    </div>
  );
}

export default ArtistManager;
