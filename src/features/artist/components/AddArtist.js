import { Form, Button, Input, Modal, Select, Steps, Spin } from 'antd';
import PropTypes from 'prop-types';
const rules = {
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên tác giả!',
    },
  ],
};
const AddForm = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, closeModal, onSubmit: handleSubmit } = props;
  const onSubmit = async () => {
    const values = await form.validateFields();
    handleSubmit(values);
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
    >
      <Form form={form}>
        <Form.Item name="name" label="Tên tác giả" rules={rules.name} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="userName" label="Tên người dùng">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddForm.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default AddForm;
