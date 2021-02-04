import AutoComplete from 'antd/lib/auto-complete';
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
export default function InputPermission() {
    return (
        <AutoComplete
            options={options}
            style={{
                width: 200,
            }}
            searchValue={"member"}
        />
    )
}