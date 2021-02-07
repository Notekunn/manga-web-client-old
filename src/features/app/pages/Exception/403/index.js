import { Link } from 'react-router-dom';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
const Page403 = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, bạn không có quyền với trang này!."
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
);
export default Page403;
