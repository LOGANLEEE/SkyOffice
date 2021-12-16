import React from 'react'
import ComputerDialog from './components/ComputerDialog'
import LoginDialog from './components/LoginDialog'
import { MobileController } from './components/MobileController'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import { useAppSelector } from './hooks'
import { detectMobile } from './utils'

// import Debug from './components/Debug'

const isMobile = detectMobile()

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)

  return (
    <div className="App">
      {/* <Debug /> */}

      {/* Render the LoginDialog if not logged in yet. */}
      {!loggedIn && <LoginDialog />}

      {loggedIn && isMobile && <MobileController />}
      {/* {loggedIn && isMobile && <VirtualJoyStick />} */}

      {/* Render the ComputerDialog if user is using a computer. */}
      {computerDialogOpen && <ComputerDialog />}

      {/* Render the VideoConnectionDialog if user is not connected to a webcam. */}
      {!computerDialogOpen && !videoConnected && loggedIn && <VideoConnectionDialog />}
    </div>
  )
}

export default App
