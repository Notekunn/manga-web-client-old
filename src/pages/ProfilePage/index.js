import { useEffect } from 'react'
import Skeleton from 'antd/lib/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import * as userAction from '../../actions/user';
function ProfilePage(props) {
    const { loading, user } = useSelector(state => state.user);
    const token = useSelector(state => state.authentication.token);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction.getMe(token))
        return () => {
            if (loading) dispatch(userAction.getMeFailure())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, token])

    if (loading) return <Skeleton />
    if (user) return (
        <div>
            <h2>Họ tên</h2>
            <h1>{user.name} ({user.userName})</h1>
        </div>
    )
    return <div></div>
}

export default ProfilePage;