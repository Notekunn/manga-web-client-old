import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";
const rules = {
  title: [
    {
      required: true,
      message: "Vui lòng nhập tên thể loại!",
    },
  ],
};
const AddCategory = (props) => {
  const [form] = Form.useForm();
  const {
    modalVisible,
    closeModal,
    onSubmit: handleSubmit,
    modalLoading,
  } = props;
  const onSubmit = async () => {
    const values = await form.validateFields();
    handleSubmit(values);
    form.resetFields();
  };
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: "32px 40px 18px",
      }}
      destroyOnClose
      title="Thêm thể loại"
      visible={modalVisible}
      onCancel={closeModal}
      onOk={onSubmit}
      confirmLoading={modalLoading}
      forceRender
    >
      <Form form={form}>
        <Form.Item
          name="title"
          label="Tên thể loại"
          rules={rules.title}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Giới thiệu">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddCategory.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
};
export default AddCategory;
