import Link from 'react-router-dom/Link';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
const Page500 = () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, the server is reporting an error."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
export default Page500;
