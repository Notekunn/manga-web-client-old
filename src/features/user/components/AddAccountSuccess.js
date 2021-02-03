import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';

function AddAccountSuccess({ resetForm, closeForm }) {
    return (
        <div>
            <Result
                status="success"
                title="Tạo tài khoản thành công!"
                subTitle="Bạn đã tạo tài khoản thành công."
                extra={[
                    <Button type="primary" key="console" onClick={closeForm}>
                        {"Về trang quản lý"}
                    </Button>,
                    <Button key="buy" onClick={resetForm}>
                        {"Đăng ký tiếp"}
                    </Button>,
                ]}
            />
        </div>
    )
}
AddAccountSuccess.propTypes = {
    resetForm: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired
}
export default AddAccountSuccess;