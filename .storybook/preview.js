import '../src/styles/fonts.css'
import '../src/styles/reset.css'
import 'antd/dist/antd.css'

const customViewports = {
  'iphone-5-se': {
    name: 'iPhone 5/SE',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  'iphone-6-7-8': {
    name: 'iPhone 6/7/8',
    styles: {
      width: '375px',
      height: '667px'
    }
  },
  'iphone-6-7-8 Plus': {
    name: 'iPhone 6/7/8 Plus',
    styles: {
      width: '414px',
      height: '736px'
    }
  },
  ipad: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  'ipad-pro': {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  'imac-27': {
    name: 'iMac 27',
    styles: {
      width: '1280px',
      height: '720px'
    }
  }
}
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: customViewports }
}
