import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
const rules = {
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên tác giả!',
    },
  ],
};
const AddArtist = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, closeModal, onSubmit: handleSubmit, modalLoading } = props;
  const onSubmit = async () => {
    const values = await form.validateFields();
    handleSubmit(values);
    form.resetFields();
  };
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 18px',
      }}
      destroyOnClose
      title="Thêm tác giả"
      visible={modalVisible}
      onCancel={closeModal}
      onOk={onSubmit}
      confirmLoading={modalLoading}
      forceRender
    >
      <Form form={form}>
        <Form.Item name="name" label="Tên tác giả" rules={rules.name} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="about" label="Giới thiệu">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddArtist.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
};
export default AddArtist;
