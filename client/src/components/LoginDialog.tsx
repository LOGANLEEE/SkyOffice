import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

import Adam from '../assets/Adam_login.png'
import Ash from '../assets/Ash_login.png'
import Lucy from '../assets/Lucy_login.png'
import Nancy from '../assets/Nancy_login.png'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { detectMobile } from '../utils'

SwiperCore.use([Navigation])

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  /* padding: 36px 60px; */
  padding: ${({ isMobile }) => (isMobile ? '10px 10px' : '36px 60px')};
  width: ${({ isMobile }) => (isMobile ? '100%' : undefined)};
`

const Title = styled.h1`
  font-size: 24px;
  color: #eee;
  text-align: center;
`

const SubTitle = styled.h3`
  width: 160px;
  font-size: 16px;
  color: #eee;
  text-align: center;
`

const Content = styled.div`
  display: flex;
  margin: 36px 0;
`

const Left = styled.div`
  /* margin-right: 48px; */
  margin-right: ${({ isMobile }) => (isMobile ? '12px' : '48px')};

  --swiper-navigation-size: 24px;

  .swiper-container {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #dbdbe0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`

const Right = styled.div`
  width: 300px;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

export default function LoginDialog() {
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const connected = useAppSelector((state) => state.user.connected)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const isMobile = detectMobile()

  return (
    <Wrapper isMobile={isMobile}>
      <Title>크리플루아의 사무실입니다.</Title>
      <Content>
        <Left isMobile={isMobile}>
          <SubTitle>케릭터를 고르세요.</SubTitle>
          <Swiper
            // install Swiper modules
            navigation
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setAvatarIndex(swiper.activeIndex)
              const game = phaserGame.scene.keys.game as Game
              game.myPlayer?.setPlayerTexture(avatars[avatarIndex].name)
            }}
          >
            {avatars.map((avatar) => (
              <SwiperSlide key={avatar.name}>
                <img src={avatar.img} alt={avatar.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Left>
        <Right>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            variant="outlined"
            color="secondary"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && 'Name is required'}
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value)
              if (connected) {
                const game = phaserGame.scene.keys.game as Game
                game.myPlayer.setPlayerName(name)
              }
            }}
          />
          {!videoConnected && (
            <Warning>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                웹캠/마이크 연결되지 않음. <br />
                <strong>최상의 경험을 위해 연결해보세요!</strong>
              </Alert>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  const game = phaserGame.scene.keys.game as Game
                  game.network.webRTC?.getUserMedia()
                }}
              >
                웹캠 연결하기
              </Button>
            </Warning>
          )}

          {videoConnected && (
            <Warning>
              <Alert>웹캠 연결됨!</Alert>
            </Warning>
          )}
        </Right>
      </Content>
      <Bottom>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            if (name === '') {
              setNameFieldEmpty(true)
            } else {
              if (connected) {
                console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
                const game = phaserGame.scene.keys.game as Game
                game.registerKeys()
                game.myPlayer.setPlayerName(name)
                game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
                game.network.readyToConnect()
                dispatch(setLoggedIn(true))
              }
            }
          }}
        >
          입장하기
        </Button>
      </Bottom>
    </Wrapper>
  )
}
