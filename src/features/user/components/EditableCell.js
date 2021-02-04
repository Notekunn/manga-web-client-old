import { Input, Form, } from 'antd';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputNode = <Input />,
    record,
    index,
    children,
    ...restProps }) => {

    return (
        <td {...restProps}>
            {   editing ?
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0, }}
                    rules={[{
                        required: true,
                        message: `Please Input ${title}!`,
                    }]}
                >
                    {inputNode}
                </Form.Item>
                :
                children
            }
        </td>
    );
};
export default EditableCell;