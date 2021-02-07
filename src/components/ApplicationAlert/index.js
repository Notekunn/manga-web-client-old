import { useEffect } from 'react';
import antdMessage from 'antd/lib/message';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage, selectNotices } from '../../features/app/alertSlice';
function ApplicationAlert(props) {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  useEffect(() => {
    // antdMessage.destroy();
    notices.forEach((notice) => {
      const func = antdMessage[notice.type];
      func(notice.message, notice.duration, () => dispatch(clearMessage(notice.key)));
    });
  }, [dispatch, notices]);
  return <></>;
}
export default ApplicationAlert;
