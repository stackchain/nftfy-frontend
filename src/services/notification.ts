import { notification } from 'antd'

export const errorNotification = (message: string, error?: any) => {
  notification.error({
    message,
    placement: 'bottomRight',
    duration: 2
  })
  console.error(error)
}

export const infoNotification = (message: string, duration?: number) => {
  notification.info({
    message,
    placement: 'bottomRight',
    duration: duration || 4.5
  })
}
