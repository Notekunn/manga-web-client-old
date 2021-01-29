import { useEffect } from 'react'
import antdMessage from 'antd/lib/message';
import { connect } from 'react-redux';
import { clearMessage } from '../../actions/alert';
function ApplicationAlert(props) {
    const { message, type, duration, clearMessage } = props;
    useEffect(() => {
        if (!message) return;
        const showMessage = antdMessage[type];
        showMessage(message, duration || 5)
            .then(clearMessage)
        return antdMessage.destroy;
    }, [message, clearMessage, type, duration]);
    return (
        <>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        message: state.alert.message,
        type: state.alert.type,
        duration: state.alert.duration,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationAlert);