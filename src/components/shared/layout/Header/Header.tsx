import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ntfy from '../../../../assets/nftfy.svg'
import { Wallet } from '../../../../services/api'
import './Header.scss'

interface Props {
  buttonAction: () => void
}

export default function Header(props: Props) {
  const { buttonAction } = props

  const accountsStorage: any = localStorage.getItem('accounts')
  const [accounts] = useState<Wallet[] | null>(accountsStorage as Wallet[])

  const selectedAcccountIndexStorage: any = localStorage.getItem('accountIndex')
  const [selectedAccount] = useState<number>(selectedAcccountIndexStorage || 0)

  const selectedWalletNameStorage: any = localStorage.getItem('walletName')
  const [walletName] = useState<string | null>(selectedWalletNameStorage)

  console.log('Header Accounts', accounts)
  console.log('Selected Account', selectedAccount)
  console.log('WalletName', walletName)

  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={ntfy} alt='NTFFY' />
        </Link>
      </div>
      <div className='wallet'>
        {accounts && (
          <Dropdown overlay={dropdownMenu} placement='bottomRight' arrow>
            <Button>
              {accounts[selectedAccount]}
              <DownOutlined />
            </Button>
          </Dropdown>
        )}
        {!accounts && (
          <Button onClick={buttonAction} type='primary' size='large'>
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
