import { Input, InputNumber, Form, AutoComplete } from 'antd';
const options = [
    {
        value: "moderator",
        label: "Điều hành viên"
    },
    {
        value: "translator",
        label: "Phiên dịch viên"
    },
    {
        value: "member",
        label: "Thành viên"
    }
]
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    let inputNode;
    if (inputType === 'number') inputNode = <InputNumber />;
    else if (inputType === 'permission') inputNode = (<AutoComplete
        options={options}
        style={{
            width: 200,
        }}
        placeholder="member"
    />)
    else inputNode = <Input />;
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