import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ntfy from '../../../../assets/nftfy.svg'
import { WalletContext } from '../../../../context/WalletContext'
import './Header.scss'

interface Props {
  buttonAction: () => void
}

export default function Header(props: Props) {
  const { buttonAction } = props
  const { accounts, accountIndex, setAccountIndex, wallet } = useContext(WalletContext)
  const selectAccount = (index: number) => {
    if (wallet) {
      wallet.selectAccount(accounts[index])
    }
    setAccountIndex(index)
  }
  const dropdownMenu = (
    <Menu>
      {accounts.map((_account, index) => (
        <Menu.Item key={`account-${accounts[index]}`} onClick={() => selectAccount(index)}>
          {accounts[index]}
        </Menu.Item>
      ))}
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
        {accounts.length > 0 && (
          <Dropdown overlay={dropdownMenu} placement='bottomRight' disabled={accounts.length === 1}>
            <Button className='walletName'>
              {accounts[accountIndex].substring(0, 6)}
              ...
              {accounts[accountIndex].substring(accounts[accountIndex].length - 4, accounts[accountIndex].length)}
              {accounts.length > 1 && <DownOutlined />}
            </Button>
          </Dropdown>
        )}
        {!accounts.length && (
          <Button onClick={buttonAction} type='primary' size='large'>
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
