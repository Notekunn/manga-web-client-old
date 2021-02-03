import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';

function AddAccountSuccess({ resetForm, closeForm, message }) {
    return (
        <Result
            status="error"
            title="Tạo tài khoản thất bại!"
            subTitle={message}
            extra={[
                <Button type="primary" key="console" onClick={closeForm}>
                    {"Về trang quản lý"}
                </Button>,
                <Button key="buy" onClick={resetForm}>
                    {"Đăng ký lại"}
                </Button>,
            ]}
        />
    )
}
AddAccountSuccess.propTypes = {
    resetForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}
export default AddAccountSuccess;