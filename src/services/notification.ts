import { notification } from 'antd'

export const error = (message: string) => {
  notification.error({
    message,
    placement: 'bottomLeft',
    duration: 2
  })
}
