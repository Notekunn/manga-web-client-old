import { useEffect } from 'react';
import Skeleton from 'antd/lib/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMe, selectFetchingMe, selectMe } from '../../userSlice';
function ProfilePage(props) {
  const fetching = useSelector(selectFetchingMe);
  const user = useSelector(selectMe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
    return () => {};
  }, [dispatch]);

  if (fetching) return <Skeleton />;
  if (user)
    return (
      <div>
        <h2>Họ tên</h2>
        <h1>
          {user.name} ({user.userName})
        </h1>
      </div>
    );
  return <div></div>;
}

export default ProfilePage;
