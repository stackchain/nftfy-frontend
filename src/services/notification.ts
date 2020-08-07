import { notification } from 'antd'

export const errorNotification = (message: string) => {
  notification.error({
    message,
    placement: 'bottomLeft',
    duration: 2
  })
}
