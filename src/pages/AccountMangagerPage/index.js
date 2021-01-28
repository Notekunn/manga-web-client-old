import { useState, /* useCallback */ } from 'react';
import './index.css';
import { Table, Button, Skeleton, Modal, Form } from 'antd';
import { useQuery } from 'urql';
import AddAccount from './AddAccount';
import { columns } from './TableCollumns';
import { getUsers } from '../../graphql/query';
export default function AccountManagerPage() {
    const [result, reExecuteQuery] = useQuery({ query: getUsers });
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();
    const { data, fetching } = result;
    return (
        <div>
            <Button onClick={() => setModalVisible(true)} type="primary" style={{ marginBottom: 16 }} >{'Thêm tài khoản'}</Button>
            { fetching ? <Skeleton /> : <Table columns={columns} dataSource={data?.users} pagination={{ pageSize: 6 }} />}
            <Modal
                title="Thêm tài khoản"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={() => {
                    setConfirmLoading(true);
                    form.submit();
                    reExecuteQuery();
                }}
                onCancel={() => {
                    setModalVisible(false);
                    setConfirmLoading(false);
                    reExecuteQuery();
                }}
            >
                <AddAccount
                    form={form}
                    setModalVisible={setModalVisible}
                    setConfirmLoading={setConfirmLoading} />
            </Modal>
        </div >
    )
}


