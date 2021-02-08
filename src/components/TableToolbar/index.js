import React from 'react';
import Button from 'antd/lib/button';
import AddIcon from '@ant-design/icons/FileAddOutlined';

export default function TableToolbar({ title, triggerAdd }) {
  return (
    <div style={{ lineHeight: 1, overflowX: 'auto', overflowY: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <h3 style={{ marginBottom: 0 }}>{title}</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button onClick={triggerAdd} style={{ float: 'right' }} type="primary">
            <AddIcon />
            {'Thêm'}
          </Button>
        </div>
      </div>
    </div>
  );
}
