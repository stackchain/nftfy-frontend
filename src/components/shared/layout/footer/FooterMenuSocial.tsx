import React from 'react'
import styled from 'styled-components'
import discordIcon from '../../../../assets/discordIcon.svg'
import githubIcon from '../../../../assets/githubIcon.svg'
import linkedInIcon from '../../../../assets/linkedInIcon.svg'
import telegramIcon from '../../../../assets/telegramIcon.svg'
import twitterIcon from '../../../../assets/twitterIcon.svg'
import { viewport } from '../../../../styles/variables'

export const FooterMenuSocial: React.FC = () => {
  return (
    <S.FooterMenu>
      <S.LinkItem>
        <img src={linkedInIcon} alt='linkedIn' />
      </S.LinkItem>
      <S.LinkItem>
        <img src={discordIcon} alt='discord' />
      </S.LinkItem>
      <S.LinkItem>
        <img src={twitterIcon} alt='twitter' />
      </S.LinkItem>
      <S.LinkItem>
        <img src={githubIcon} alt='github' />
      </S.LinkItem>
      <S.LinkItem>
        <img src={telegramIcon} alt='telegram' />
      </S.LinkItem>
    </S.FooterMenu>
  )
}

const S = {
  FooterMenu: styled.nav``,
  LinkItem: styled.a`
    width: 16px;
    height: 16px;
    text-decoration: none;
    cursor: pointer;
    & + a {
      margin-left: 18px;
    }
    @media (max-width: ${viewport.xl}) {
      display: none;
    }
  `
}
