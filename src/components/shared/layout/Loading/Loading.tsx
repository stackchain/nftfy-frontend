import { Progress } from 'antd'
import React, { useEffect, useState } from 'react'
import './Loading.scss'

export default function Loading() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        setPercent(percent + Number((Math.random() * (8 - 1) + 1).toFixed(0)))
      }, 500)
    }
  }, [percent])

  return (
    <Progress
      strokeColor={{
        from: '#fe8464',
        to: '#fe6e9a'
      }}
      percent={percent}
      strokeWidth={3}
      status='active'
      className='loading-bar'
    />
  )
}
