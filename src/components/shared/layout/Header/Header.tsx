import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React, { useContext } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Link, useHistory, useLocation } from 'react-router-dom'
import ntfy from '../../../../assets/nftfy.svg'
import { WalletContext } from '../../../../context/WalletContext'
import './Header.scss'

interface Props {
  buttonAction: () => void
}

export default function Header(props: Props) {
  const { buttonAction } = props
  const { accounts, accountIndex, setAccountIndex, wallet } = useContext(WalletContext)
  const location = useLocation()
  const history = useHistory()

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
          <>
            {location.pathname === '/nest' ? (
              <Button onClick={() => history.push('/')} type='primary' size='large' className='navigate-button'>
                Wallet
              </Button>
            ) : (
              <Button onClick={() => history.push('/nest')} type='primary' size='large' className='navigate-button'>
                Nest
              </Button>
            )}
          </>
        )}
        {accounts.length > 0 && (
          <>
            <Dropdown overlay={dropdownMenu} placement='bottomRight' disabled={accounts.length === 1}>
              <Button className='walletName'>
                <div className='wallet-icon'>
                  <Jazzicon diameter={22} seed={jsNumberForAddress(accounts[accountIndex])} />
                </div>
                {accounts[accountIndex].substring(0, 3)}
                ...
                {accounts[accountIndex].substring(accounts[accountIndex].length - 3, accounts[accountIndex].length)}
                {accounts.length > 1 && <DownOutlined />}
              </Button>
            </Dropdown>
          </>
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
