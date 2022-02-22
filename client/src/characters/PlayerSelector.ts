import Phaser from 'phaser'
import MyPlayer from './MyPlayer'
import { PlayerBehavior } from '../../../types/PlayerBehavior'
import Item from '../items/Item'
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'

export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height)

    scene.physics.add.existing(this)
  }

  update(
    player: MyPlayer,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    isMobile?: boolean,
    pointer?: IJoystickUpdateEvent
  ) {
    // if (isMobile) {
    //   if (!pointer) return
    // } else {
    //   if (!cursors) return
    // }

    // no need to update player selection while sitting
    if (player.playerBehavior === PlayerBehavior.SITTING) {
      return
    }

    // update player selection box position so that it's always in front of the player
    const { x, y } = player
    if (cursors.left?.isDown || pointer?.direction === 'LEFT') {
      this.setPosition(x - 32, y)
    } else if (cursors.right?.isDown || pointer?.direction === 'RIGHT') {
      this.setPosition(x + 32, y)
    } else if (cursors.up?.isDown || pointer?.direction === 'FORWARD') {
      this.setPosition(x, y - 32)
    } else if (cursors.down?.isDown || pointer?.direction === 'BACKWARD') {
      this.setPosition(x, y + 32)
    }

    // while currently selecting an item,
    // if the selector and selection item stop overlapping, clear the dialog box and selected item
    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox()
        this.selectedItem = undefined
      }
    }
  }
}
