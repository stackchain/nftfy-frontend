import { Button } from 'antd'
import React from 'react'
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
  const accounts = accountsStorage as Wallet[] | null

  const selectedAccountStorage: any = localStorage.getItem('selectedAccount')
  const selectedAccount = selectedAccountStorage as number

  console.log('Header Accounts', accounts)
  console.log('Selected Account', selectedAccount)

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={ntfy} alt='NTFFY' />
        </Link>
      </div>
      <div className='wallet'>
        <Button onClick={buttonAction} type='primary' size='large'>
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
