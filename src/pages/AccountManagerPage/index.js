import { useState, useEffect } from 'react';
import './index.css';
import { Table, Button, Skeleton, Modal, Form } from 'antd';
import AddAccount from './AddAccount';
import { columns } from './TableCollumns';
import sampleData from './sample-data';
import { useSelector, useDispatch } from 'react-redux';
import * as userAction from '../../actions/user';
import { Redirect } from 'react-router-dom';
export default function AccountManagerPage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();
    const fetching = useSelector(state => state.user.loading);
    const token = useSelector(state => state.authentication.token);
    const users = useSelector(state => state.user.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAction.getAll(token))
        return () => {
            if (fetching) dispatch(userAction.getAllFailure())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!token) return <Redirect to="/" />
    return (
        <div>
            <Button onClick={() => setModalVisible(true)} type="primary" style={{ marginBottom: 16 }} >{'Thêm tài khoản'}</Button>
            { fetching && <Skeleton />}
            { users && <Table columns={columns} dataSource={users || sampleData} pagination={{ pageSize: 6 }} />}
            <Modal
                title="Thêm tài khoản"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={() => {
                    setConfirmLoading(true);
                    form.submit();
                }}
                onCancel={() => {
                    setModalVisible(false);
                    setConfirmLoading(false);
                }}
                destroyOnClose={true}
            >
                <AddAccount
                    form={form}
                    setModalVisible={setModalVisible}
                    setConfirmLoading={setConfirmLoading} />
            </Modal>
        </div >
    )
}


