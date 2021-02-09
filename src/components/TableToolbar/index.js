import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import AddIcon from '@ant-design/icons/FileAddOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';

export default function TableToolbar({ title, triggerAdd, triggerSync }) {
  return (
    <div style={{ lineHeight: 1, overflowX: 'auto', overflowY: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <h3 style={{ marginBottom: 0 }}>{title}</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button onClick={triggerAdd} style={{ marginRight: '10px' }} type="primary">
            <AddIcon />
            {'Thêm'}
          </Button>{' '}
          <Tooltip title="Update">
            <Button icon={<SyncOutlined />} shape="circle" onClick={triggerSync} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

TableToolbar.propTypes = {
  title: PropTypes.string,
  triggerAdd: PropTypes.func.isRequired,
  triggerSync: PropTypes.func.isRequired,
};

TableToolbar.defaultProps = {
  title: 'Quản lý',
};
