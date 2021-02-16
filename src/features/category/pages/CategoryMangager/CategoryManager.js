import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "antd/lib/skeleton";
import Table from "antd/lib/table";
import Space from "antd/lib/space";
import Popconfirm from "antd/lib/popconfirm";
import Typography from "antd/lib/typography";
import TableToolbar from "../../../../components/TableToolbar";
import AddCategory from "../../components/AddCategory";
import UpdateCategory from "../../components/UpdateCategory";
import {
  addCategory,
  removeCategory,
  updateCategory,
  fetchCategories,
  selectCategories,
  selectFetchingCategories,
} from "../../categorySlice";
import {
  selectModalShowing,
  selectModalLoading,
  hideModal,
  showModal,
} from "../../../app/globalSlice";
const ActionEditAndDelete = ({
  record,
  onTriggerEdit,
  onDelete,
  disableEdit,
}) => {
  return (
    <Space size="middle">
      <Typography.Link
        disabled={disableEdit}
        onClick={() => onTriggerEdit(record)}
      >
        {"Edit"}
      </Typography.Link>
      <Popconfirm
        title="Bạn có chắc muốn xóa?"
        onConfirm={() => onDelete(record)}
        okText="OK"
        cancelText="Không"
      >
        <a key="delete" href="/#">
          {" "}
          Xóa
        </a>
      </Popconfirm>
    </Space>
  );
};
function CategoryManager(props) {
  const dispatch = useDispatch();
  const [edittingItem, setEditingItem] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const fetching = useSelector(selectFetchingCategories);
  const categories = useSelector(selectCategories);
  const modalShowing = useSelector(selectModalShowing);
  const modalLoading = useSelector(selectModalLoading);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  if (fetching) return <Skeleton />;
  const addEvent = (values) => {
    dispatch(addCategory(values));
    dispatch(hideModal());
  };
  const updateEvent = (values) => {
    dispatch(updateCategory(values));
    dispatch(hideModal());
  };
  const deleteEvent = (record) => {
    dispatch(removeCategory(record._id));
  };
  const triggerEdit = (item) => {
    setEditingItem(item);
    if (item) dispatch(showModal("UPDATE_CATEGORY"));
  };
  const columns = [
    {
      title: "Tên thể loại",
      dataIndex: "title",
      key: "title",
      editable: true,
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => String(a.title).localeCompare(String(b.title)),
      },
    },
    {
      title: "Giới thiệu",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ActionEditAndDelete
          record={record}
          onTriggerEdit={triggerEdit}
          onDelete={deleteEvent}
          disableEdit={modalLoading === "UPDATE_CATEGORY"}
        />
      ),
    },
  ];
  return (
    <div>
      <TableToolbar
        title="Quản lý tác giả"
        triggerAdd={() => dispatch(showModal("ADD_CATEGORY"))}
        triggerSync={() => dispatch(fetchCategories())}
      />
      {fetching ? (
        <Skeleton />
      ) : (
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: pageSize,
            onShowSizeChange: (current, size) => setPageSize(size),
            pageSizeOptions: [5, 10, 15, 20, 100],
          }}
          rowKey={(record) => record._id}
        />
      )}
      <AddCategory
        closeModal={() => dispatch(hideModal())}
        modalVisible={modalShowing === "ADD_CATEGORY"}
        modalLoading={modalLoading === "ADD_CATEGORY"}
        onSubmit={addEvent}
      />
      <UpdateCategory
        closeModal={() => dispatch(hideModal())}
        modalVisible={modalShowing === "UPDATE_CATEGORY"}
        modalLoading={modalLoading === "UPDATE_CATEGORY"}
        onSubmit={updateEvent}
        values={edittingItem}
      />
    </div>
  );
}

export default CategoryManager;
