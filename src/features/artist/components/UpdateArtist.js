import { useEffect, memo } from 'react';
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
const UpdateArtist = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, closeModal, onSubmit: handleSubmit, modalLoading, values } = props;
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
        padding: '32px 40px 18px',
      }}
      destroyOnClose
      title="Sửa tác giả"
      visible={modalVisible}
      onCancel={closeModal}
      onOk={onSubmit}
      confirmLoading={modalLoading}
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
UpdateArtist.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalLoading: PropTypes.bool,
  values: PropTypes.shape({
    name: PropTypes.string,
    userName: PropTypes.string,
  }),
};
UpdateArtist.defaultProps = {
  values: {},
};
export default memo(UpdateArtist);
