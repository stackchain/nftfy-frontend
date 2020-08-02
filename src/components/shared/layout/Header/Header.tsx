import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ntfy from '../../../../assets/nftfy.svg'
import './Header.scss'

interface Props {
  buttonAction: () => void
}

export default function Header(props: Props) {
  const { buttonAction } = props

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
