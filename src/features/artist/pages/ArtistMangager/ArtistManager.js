import { useEffect } from 'react';
import { fetchArtists, selectFetchingArtists, selectArtists } from '../../artistSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'antd/lib/skeleton';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import AddIcon from '@ant-design/icons/FileAddOutlined';
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
  ];
  return (
    <div>
      <div style={{ lineHeight: 1, overflowX: 'auto', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <h3 style={{ marginBottom: 0 }}>Quản lý tài khoản</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button onClick={() => {}} style={{ float: 'right' }} type="primary">
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
