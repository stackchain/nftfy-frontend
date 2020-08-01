import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ntfy from '../../../../assets/nftfy.svg'
import './Header.scss'

export default function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={ntfy} alt='NTFFY' />
        </Link>
      </div>
      <div className='wallet'>
        <Button href='/teste' type='primary' size='large'>
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
