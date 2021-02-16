import { useEffect, memo } from "react";
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
const UpdateCategory = (props) => {
  const [form] = Form.useForm();
  const {
    modalVisible,
    closeModal,
    onSubmit: handleSubmit,
    modalLoading,
    values,
  } = props;
  const onSubmit = async () => {
    const val = await form.validateFields();
    handleSubmit({ ...values, ...val });
  };
  useEffect(() => {
    form.setFieldsValue(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: "32px 40px 18px",
      }}
      destroyOnClose
      title="Sửa thể loại"
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
UpdateCategory.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
  values: PropTypes.shape({
    name: PropTypes.string,
    userName: PropTypes.string,
  }),
};
UpdateCategory.defaultProps = {
  values: {},
};
export default memo(UpdateCategory);
