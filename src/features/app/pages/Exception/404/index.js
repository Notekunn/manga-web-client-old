import { Link } from 'react-router-dom';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
const Page404 = () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="Oops, Trang không khả dụng"
    extra={
      <Link to="/">
        <Button type="primary">Go Home</Button>
      </Link>
    }
  />
);
export default Page404;
