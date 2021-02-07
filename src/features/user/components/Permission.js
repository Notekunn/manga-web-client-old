import Tag from 'antd/lib/tag';
const colorPermissions = {
  admin: 'red',
  moderator: 'gold',
  translator: 'blue',
  member: 'lime',
};
const Permission = ({ permission }) => {
  const color = colorPermissions[permission];
  return (
    <Tag color={color} key={permission}>
      {permission?.toUpperCase()}
    </Tag>
  );
};
export default Permission;
