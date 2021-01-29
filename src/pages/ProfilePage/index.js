import { useEffect } from 'react'
import Skeleton from 'antd/lib/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userAction from '../../actions/user';
function ProfilePage(props) {
    const { loading, data } = useSelector(state => state.user);
    const token = useSelector(state => state.authentication.token);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction.getMe(token))
    }, [dispatch, token])

    if (!token) return <Redirect to="/" />
    if (loading) return <Skeleton />
    if (data) return (
        <div>
            <h2>Họ tên</h2>
            <h1>{data.name}({data.userName})</h1>
        </div>
    )
    return <div></div>
}

export default ProfilePage;