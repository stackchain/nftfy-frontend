import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import './Loading.scss'

export default function Loading() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fe8464' }} spin />

  return (
    <div className='loading-spin'>
      <Spin indicator={antIcon} />
    </div>
  )
}
