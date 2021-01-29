import { useEffect } from 'react'
import { message as antdMessage } from 'antd';
import { connect } from 'react-redux';
import { clearMessage } from '../../actions/alert';
function ApplicationAlert(props) {
    const { message, type, clearMessage } = props;
    useEffect(() => {
        if (!message) return;
        const showMessage = antdMessage[type];
        showMessage(message, 5)
            .then(clearMessage)
        return antdMessage.destroy;
    }, [message, clearMessage, type]);
    return (
        <>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        message: state.alert.message,
        type: state.alert.type
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationAlert);