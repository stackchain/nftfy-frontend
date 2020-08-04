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
  const { accounts, accountIndex, setAccountIndex } = useContext(WalletContext)

  const dropdownMenu = (
    <Menu>
      {accounts.map((_account, index) => (
        <Menu.Item key={`account-${accounts[index]}`} onClick={() => setAccountIndex(index)}>
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
          <Dropdown overlay={dropdownMenu} placement='bottomRight' arrow>
            <Button>
              {accounts[accountIndex]}
              <DownOutlined />
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
