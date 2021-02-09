import * as Sentry from '@sentry/react'
import { message } from 'antd'

export const notifySuccess = (text: string) => {
  message.success(text)
}
export const notifyWarning = (text: string) => {
  message.success(text)
}
export const notifyError = (text: string, err?: Error) => {
  message.error(text)
  if (err) {
    Sentry.captureException(err)
  }
}
