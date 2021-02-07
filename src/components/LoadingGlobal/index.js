import React from 'react'
import Spin from 'antd/lib/spin';
import './LoadingGlobal.css';
export default function LoadingGlobal() {
  return (
    <div className="loading-global">
      <Spin size="large" id="spinner" />
    </div>
  )
}
