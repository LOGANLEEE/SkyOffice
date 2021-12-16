import React, { useCallback, useEffect, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import styled from 'styled-components'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

export const MobileController = () => {
  /*
  MOVE
  {
    "type": "move",
    "x": -5.308349609375,
    "y": 2.15716552734375,
    "direction": "LEFT"
}
*/

  /*
stop 
{
    "type": "stop",
    "x": null,
    "y": null,
    "direction": null
}

*/

  const game = phaserGame.scene.keys.game as Game

  const [status, setStatus] = useState<IJoystickUpdateEvent>({
    type: 'stop',
    x: null,
    y: null,
    direction: null,
  })

  const updater = useCallback((e: IJoystickUpdateEvent) => setStatus(e), [])

  useEffect(() => {
    // console.debug('mobilecontroleler:', status)
    game.update(1, 2, status)
  }, [status])

  // const asd = document.getElementById('root')
  // asd?.dispatchEvent(new KeyboardEvent('keypress', { key: 'E' }))

  // This is simply an example that demonstrates
  // how you can dispatch an event on the element.

  // This is simply an example that demonstrates
  // how you can dispatch an event on the element.

  return (
    <Wrapper id="joyStick">
      <Joystick
        size={100}
        baseColor="red"
        stickColor="blue"
        start={updater}
        move={updater}
        stop={updater}
      ></Joystick>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 54px;
  right: 30px;
`
