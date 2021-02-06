import { useState } from 'react';
import AutoComplete from 'antd/lib/auto-complete';
import Select from 'antd/lib/select';
const { Option } = Select;
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
];

const InputPermission = (props) => {
    const [permission, setPermission] = useState({
        value: "member",
        key: "member",
        label: "Thành viên"
    });
    return (
        <Select
            labelInValue
            style={{ width: 120 }}
            onChange={setPermission}
            value={permission}
        >
            <Option value="moderator">Điều hành viên</Option>
            <Option value="translator">Phiên dịch viên</Option>
            <Option value="member">Thành viên</Option>
        </Select>
    )
}

// <AutoComplete
//     name="permission"
//     options={options}
//     style={{
//         width: 200,
//     }}
// searchValue={permission}
// value={permission}
// onSelect={e => setPermission(e.value)}
// component={<Input />}
// />
export default InputPermission;