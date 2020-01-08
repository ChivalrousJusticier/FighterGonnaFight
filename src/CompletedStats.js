import React from 'react'
import BonusBar from './BonusBar'
import './CompletedStats.css'
import BadGuyStats from './BadGuyStats'
import Stance0 from './zImageStance0.jpg'
import WindUp from './zImageWindUp.gif'
import PlayerFirstSwing from './zImagePlayerFirstSwing.gif'
import PlayerSecondAttack from './zImagePlayerSecondAttack.gif'
import SecondWindUp from './zImageSecondWindUp.gif'
import EnemyFirstAttack from './zImageEnemyFirstAttack.gif'
import EnemySecondAttack from './zImageEnemySecondAttack.gif'
import PlayerGameOver from './zImagePlayerGameOver.gif'
import EnemyGameOver from './zImageEnemyGameOver.gif'
import FighterGonnaFight from './zSoundFighterGonnaFight.mp3'
import Swoosh from './zSoundSwoosh.mp3'
import Swoosh2 from './zSoundSwoosh2.mp3'
import SwingHit from './zSoundSwingHit.mp3'
import SwingHit2 from './zSoundSwingHit2.mp3'
import Ow from './zSoundJ_OW.mp3'
import Oowah from './zSoundJ_Oowah.mp3'
import Owah2 from './zSoundG_Owah2.mp3'
import HaHa from './zSoundJ_HAHA.mp3'
import TryAgain from './zSoundJ_TryAgain.mp3'
import HaHaHa from './zSoundG_HaHaHa.mp3'
import Owah from './zSoundG_Owah.mp3'
import Wind from './zSoundOutdoorWind.mp3'
import { getModifier } from './CommonMethods'

class CompletedStats extends React.Component {
  constructor (props) {
    super(props)
    this.text = 'Begin'
    this.badGuyDexterityBonus = 1
    this.proficiencyBonus = 2
    this.badGuyProficiencyBonus = 2
    this.armorClass = 16
    this.badGuyArmorClass = 16
    this.badGuyMaxHitPoints = 12
    this.badGuyCurrentHitPoints = 12
    this.currentHitPoints = Number(this.maxHitPoints())
    this.rollToHitValue = 0
    this.swoosh = new Audio(Swoosh)
    this.swoosh2 = new Audio(Swoosh2)
    this.swingHit = new Audio(SwingHit)
    this.swingHit2 = new Audio(SwingHit2)
    this.ow = new Audio(Ow)
    this.owah = new Audio(Owah)
    this.owah2 = new Audio(Owah2)
    this.haHa = new Audio(HaHa)
    this.tryAgain = new Audio(TryAgain)
    this.haHaHa = new Audio(HaHaHa)
    this.wind = new Audio(Wind)

    this.state = {
      combatImage: Stance0,
      text: this.text,
      rollInitClicked: false,
      bonusRollInitClicked: false,
      playerTurn: false,
      attacked: false,
      bonusAttacked: false,
      actionTaken: false,
      bonusActionTaken: false,
      bonusAttackTaken: false,
      rolledToHit: false,
      bonusRolledToHit: false,
      bonusRolledDamage: false,
      secondWindUsed: false,
      successfulHit: false,
      bonusSuccessfulHit: false,
      badGuySecondWindUsed: false,
      currentHitPoints: Number(this.maxHitPoints()),
      badGuyCurrentHitPoints: this.badGuyMaxHitPoints,
      gameOver: false,
      badGuyActionTaken: false,
      badGuyBonusActionTaken: false
    }
  }

  // Resets states so "Bad Guy" logic can cycle
  resetBadGuyTurn = () => {
    this.setState({ playerTurn: false }, this.enemyAction)
    this.setState({ badGuyActionTaken: false })
    this.setState({ badGuyBonusActionTaken: false })
  }

  // Resets states so user can go through their turn sequence again.
  resetPlayerTurn = () => {
    this.setState({ playerTurn: true })
    this.setState({ actionTaken: false })
    this.setState({ bonusActionTaken: false })
    this.setState({ successfulHit: false })
    this.setState({ bonusAttackTaken: false })
    this.setState({ bonusRolledToHit: false })
    this.setState({ bonusRolledDamage: false })
    this.setState({ bonusAttacked: false })
    this.setState({ attacked: false })
    this.setState({ rolledToHit: false })
    this.setState({ rolledDamage: false })
    this.beginCombat()
  }

  // Returns higher modifier of Str or Dex stat, fighters can use either
  higherMod = () => {
    if (this.props.strength >= this.props.dexterity) {
      return (getModifier(this.props.strength))
    } else {
      return (getModifier(this.props.dexterity))
    }
  }

  // calculates maximum hit points based on chosen Constitution value.
  maxHitPoints = () => {
    return (getModifier(this.props.constitution) + 10)
  }

  // keeps combat log scrolled to the bottom
  scrollLog = () => {
    const textarea = document.getElementById('combatLog')
    textarea.scrollTop = textarea.scrollHeight + textarea.scrollHeight
  }

  updateText = () => {
    this.setState({ text: this.text })
    setTimeout(this.scrollLog, 100)
  }

  updateCurrentHitPoints = () => {
    this.setState({ currentHitPoints: this.currentHitPoints })
  }

  updateBadGuyHitPoints = () => {
    this.setState({ badGuyCurrentHitPoints: this.badGuyCurrentHitPoints })
  }

  setPlayerTurnFalse = () => {
    this.setState({ playerTurn: false })
  }

  setPlayerTurnTrue = () => {
    this.setState({ playerTurn: true })
  }

  updateAction = () => {
    this.setState({ actionTaken: true })
  }

  // Player action conditional combat logic, based on D&D.  Set states allow proceeding buttons
  // to be displayed after current button clicked.
  beginCombat = () => {
    if (this.badGuyCurrentHitPoints > 0) {
      if (!this.state.rollInitClicked) {
        const audio = new Audio(FighterGonnaFight)
        audio.play()
        return (
          <button id="Init" onClick={() => { (this.rollInit)(this.setState({ rollInitClicked: true })) }}>
             Roll for Initiative!
          </button>
        )
      } else if ((this.state.rollInitClicked) && (!this.state.attacked)) {
        return (
          <button id="Init" onClick={() => { (this.playerAttack)(this.setState({ attacked: true })) }}>
            Attack!
          </button>
        )
      } else if ((this.state.rollInitClicked) && (!this.state.rolledToHit)) {
        return (
          <button id="Init" onClick={() => { (this.playerRollToHit)(this.setState({ rolledToHit: true })) }}>
            Roll to Hit!
          </button>
        )
      } else if ((!this.state.actionTaken) && (this.state.rolledToHit) &&
              (this.state.successfulHit)) {
        return (
          <button id="Init" onClick={() => { (this.rollDamage)(this.setState({ actionTaken: true })) }}>
            Roll Damage!
          </button>
        )
      } else if ((this.state.actionTaken) && (this.state.bonusActionTaken) && (!this.state.gameOver)) {
        return (
          <button id="Init" onClick={() => { this.resetBadGuyTurn() }}>
            End Turn
          </button>
        )
      }
    } else if (!this.state.gameOver) {
      this.playerWins()
      this.setState({ gameOver: true })
    }
  }

  // Bonus Attack combat sequence.  Sets states to allow proceeding buttons to be displayed
  bonusAction1 = () => {
    if ((!this.state.bonusActionTaken) && (this.state.playerTurn) &&
    (this.badGuyCurrentHitPoints > 0) && (this.state.actionTaken)) {
      if (!this.state.bonusAttacked) {
        return (
          <button id="Init" onClick={() => { (this.bonusPlayerAttack)(this.setState({ bonusAttacked: true })) }}>
              Bonus Action Attack!
          </button>
        )
      } else if ((this.state.rollInitClicked) && (!this.state.bonusRolledToHit)) {
        return (
          <button id="Init" onClick={() => { (this.bonusPlayerRollToHit)(this.setState({ bonusRolledToHit: true })) }}>
              Roll to Hit!
          </button>
        )
      } else if ((this.state.bonusRolledToHit) && (this.state.bonusSuccessfulHit) && (!this.state.bonusRolledDamage)) {
        return (
          <button id="Init" onClick={() => { (this.bonusRollDamage)(this.setState({ bonusRolledDamage: true })) }}>
              Roll Damage!
          </button>
        )
      } else return null
    }
  }

  // Displays "Second Wind" button if not already used once. Sets state to disallow bonus attack when clicked
   bonusAction2 = () => {
     if ((!this.state.bonusActionTaken) && (!this.state.bonusAttacked) &&
    (this.state.playerTurn) && (this.state.actionTaken)) {
       if (!this.state.secondWindUsed) {
         return (
           <button id="SecondWind" onClick={() => { (this.playerSecondWind)(this.setState({ bonusActionTaken: true })) }}>
              Bonus Action: Second Wind
           </button>
         )
       } else return null
     }
   }

  // simulates rolling for initiative for both characters after "Roll for Initiative!" clickec.
  rollInit = () => {
    let playerRoll = 0
    playerRoll = Math.floor((Math.random() * 19) + 2)
    let enemyRoll = 0
    enemyRoll = Math.floor((Math.random() * 19) + 2)
    this.text = 'Your initiative roll was: ' + playerRoll + '!\n'
    this.text += "Bad Guy's initiative roll was: " + enemyRoll + '!\n'
    if (playerRoll > enemyRoll) {
      this.text += 'You go first!\n'
      this.updateText()
      this.setPlayerTurnTrue()
      this.playerTurn()
    } else {
      this.text += 'Bad Guy goes first!\n'
      this.updateText()
      this.setPlayerTurnFalse()
      this.enemyAction()
    }
  }

  // Updates image and combat log after "Attack!" clicked
 playerAttack = () => {
   if ((this.state.badGuyCurrentHitPoints > 0) && (this.state.playerTurn === true)) {
     this.setState({ combatImage: WindUp })
     this.text += 'You rear your sword back and take a mighty swing!\n'
     this.updateText()
   }
 }

 // simulates rolling to hit in D&D
 playerRollToHit = () => {
   this.rollToHitValue = ((Math.floor((Math.random() * 19) + 2)) + this.proficiencyBonus +
   this.higherMod())
   if (this.rollToHitValue >= this.badGuyArmorClass) {
     this.text += 'Your roll of ' + this.rollToHitValue + " got the best of Bad Guy's armor class (" +
     this.badGuyArmorClass + ')!\n'
     this.text += 'Roll for damage!\n'
     this.updateText()
     this.setState({ successfulHit: true })
   } else {
     this.setState({ combatImage: PlayerSecondAttack })
     this.text += 'Your roll of ' + this.rollToHitValue + " wasn't enough to penetrate Bad Guy's armor class (" +
     this.badGuyArmorClass + ')! You missed!\n'
     this.swoosh.play()
     this.updateText();
     (this.setState({ actionTaken: true }))
   }
 }

 // Player victory gif, Delay function to keep sounds separated.  Updates log, plays sound
 playerWins = () => {
   this.text += 'You have defeated Bad Guy!!\n'
   this.updateText()
   this.setState({ bonusActionTaken: true })
   this.setState({ combatImage: EnemyGameOver })
   this.ow.play()
   let downSeconds = 3
   function delay () {
     downSeconds--
     if (downSeconds > 0) {
       setTimeout(delay, 100)
     } else {
       const audio = new Audio(Oowah)
       audio.play()
     }
   }
   setTimeout(delay, 400)
   let seconds = 12
   function delay2 () {
     seconds--
     if (seconds > 0) {
       setTimeout(delay2, 100)
     } else {
       const audio2 = new Audio(HaHaHa)
       audio2.play()
     }
   }
   setTimeout(delay2, 650)
 }

 // WindUp image and combat text when Bonus Attack clicked
 bonusPlayerAttack = () => {
   if ((this.state.badGuyCurrentHitPoints > 0) && (this.state.playerTurn === true)) {
     this.setState({ combatImage: SecondWindUp })
     this.text += 'You prepare to skewer the enemy!\n'
     this.updateText()
   }
 }

 // simulates rolling to hit, updates combat log, moves to next step depending on reult
 bonusPlayerRollToHit = () => {
   let rollToHitValue = 0
   rollToHitValue = ((Math.floor((Math.random() * 19) + 2)) + this.proficiencyBonus +
   this.higherMod())
   if (rollToHitValue >= this.badGuyArmorClass) {
     this.text += 'Your roll of ' + rollToHitValue + " got the best of Bad Guy's armor class (" +
     this.badGuyArmorClass + ')!\n'
     this.text += 'Roll for damage!\n'
     this.updateText()
     this.setState({ bonusSuccessfulHit: true })
   } else {
     this.swoosh2.play()
     this.setState({ combatImage: PlayerSecondAttack })
     this.text += 'Your roll of ' + rollToHitValue + " wasn't enough to penetrate Bad Guy's armor class (" +
     this.badGuyArmorClass + ')! You missed!\n'
     this.updateText();
     (this.setState({ bonusActionTaken: true }))
   }
 }

 // simulates rolling for damage, updates combat log, image and hit points, plays sound
 // delay function is to hopefully ensure that sound plays
 bonusRollDamage = () => {
   this.setState({ combatImage: PlayerSecondAttack })
   let damage = 0
   damage = Number((Math.floor((Math.random() * 5) + 2)) + this.proficiencyBonus)
   this.text += 'You slice into your enemy for ' + damage + ' points of damage!\n'
   this.swingHit2.play()
   let downSeconds = 3
   function delay () {
     downSeconds--
     if (downSeconds > 0) {
       setTimeout(delay, 100)
     } else {
       const audio = new Audio(Ow)
       audio.play()
     }
   }
   setTimeout(delay, 50)
   this.badGuyCurrentHitPoints -= damage
   this.setState({ bonusActionTaken: true })
   this.updateBadGuyHitPoints()
   this.updateText()
 }

 // siimulates rolling for damage, updates combat log, image, hit points,
 // delay function is to hopefully ensure that sound plays
 rollDamage = () => {
   this.setState({ combatImage: PlayerFirstSwing })
   let damage = 0
   damage = Number((Math.floor((Math.random() * 5) + 2)) + this.proficiencyBonus)
   this.text += 'You slice into your enemy for ' + damage + ' points of damage!\n'
   this.swingHit.play()
   let downSeconds = 3
   function delay () {
     downSeconds--
     if (downSeconds > 0) {
       setTimeout(delay, 100)
     } else {
       const audio = new Audio(Ow)
       audio.play()
     }
   }
   setTimeout(delay, 50)
   this.badGuyCurrentHitPoints -= damage;
   (this.setState({ actionTaken: true }))
   this.updateBadGuyHitPoints()
   this.updateText()
 }

 // for when "Second Wind" is clicked.  Calculates amount healed, updates hit points, plays sound
 playerSecondWind = () => {
   this.setState({ secondWindUsed: true })
   this.setState({ bonusAttackTaken: true })
   this.wind.play()
   let secondWind = 0
   secondWind = ((Math.floor((Math.random() * 9) + 2)) + 1)
   this.text += 'You use the Second Wind ability to heal for ' + secondWind +
   ' hit points!\n'
   if ((this.currentHitPoints + secondWind) > Number(this.maxHitPoints())) {
     this.currentHitPoints = Number(this.maxHitPoints())
   } else {
     this.currentHitPoints += secondWind
   }
   this.updateText()
   this.updateCurrentHitPoints()
 }

   playerTurn = () => {
     this.text += 'Take your turn!!\n'
     this.updateText()
   }

   // Bad Guy turn.  Follows D&D logic to the best of my ability.  Delay function to separate sounds.
   // Rolls to hit, rolls damage, updates image and log, plays sound, sets states enabling turn to process.
   enemyFirstAttack = () => {
     this.text += 'Bad Guy attempts an attack!\n'
     this.setState({ combatImage: EnemyFirstAttack })
     this.updateText()
     this.rollToHitValue = ((Math.floor((Math.random() * 19) + 2)) + this.badGuyProficiencyBonus +
     this.badGuyDexterityBonus)
     this.text += 'Bad Guy rolls to hit.  He rolls a ' + this.rollToHitValue + '!\n'
     this.updateText()
     if (this.rollToHitValue >= this.armorClass) {
       console.log(this.currentHitPoints)
       this.swingHit.play()
       let Damage = 0
       Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.badGuyProficiencyBonus)
       this.text += 'Your armor class is' + this.armorClass + ', so he hits!\n'
       this.updateText()
       this.text += 'Bad Guy swings his short sword. You take ' + Damage + ' points of damage!\n'
       this.currentHitPoints -= Damage
       this.setState({ badGuyActionTaken: true })
       this.setState({ currentHitPoints: this.currentHitPoints }, this.enemyBonusAction)
       this.updateText()
     } else {
       this.text += 'Bad Guy misses!\n'
       this.swoosh.play()
       this.updateText()
       this.setState({ badGuyActionTaken: true }, this.enemyBonusAction)
     }
   }

   // Rolls for amount healed, updates combat log, plays sound, sets states to prevent
   // additional use on following turns, and to mark bonus action as spent
   enemySecondWind = () => {
     let SecondWind = 0
     SecondWind = ((Math.floor((Math.random() * 9) + 2)) + 1)
     this.text += 'Bad Guy uses the Second Wind bonus action to heal for ' + SecondWind +
       ' hit points!\n'
     if ((SecondWind + this.badGuyCurrentHitPoints) > this.badGuyMaxHitPoints) {
       this.badGuyCurrentHitPoints = this.badGuyMaxHitPoints
     } else {
       this.badGuyCurrentHitPoints += SecondWind
     }
     this.updateBadGuyHitPoints()
     this.updateText()
     this.setState({ badGuySecondWindUsed: true })
     this.setState({ badGuyBonusActionTaken: true }, this.enemyVictory)
     this.setPlayerTurnTrue()
     this.wind.play()
   }

   // Bad Guy bonus attack logic, updates combat log, image, and plays sound(s)
   enemySecondAttack = () => {
     if ((this.state.currentHitPoints > 0) && (!this.state.playerTurn)) {
       this.text += 'Bad Guy attempts a second attack!\n'
       this.updateText()
       this.setState({ combatImage: EnemySecondAttack })
       this.rollToHitValue = 0
       this.rollToHitValue = ((Math.floor((Math.random() * 19) + 2)) + this.badGuyProficiencyBonus +
       this.badGuyDexterityBonus)
       this.text += 'Bad Guy rolls to hit.  He rolls a ' + this.rollToHitValue + '!\n'
       this.updateText()
       if (this.rollToHitValue >= this.armorClass) {
         this.swingHit2.play()
         let Damage = 0
         Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.badGuyProficiencyBonus)
         this.text += 'Your armor class is' + this.armorClass.toString() + ', he hits!\n'
         this.updateText()
         this.text += 'Bad Guy swings his short sword. You take ' + Damage + ' points of damage!\n'
         this.setState({ badGuyBonusActionTaken: true })
         this.updateText()
         this.currentHitPoints -= Damage

         this.setState({ currentHitPoints: this.currentHitPoints }, this.enemyVictory)
         setTimeout(this.setPlayerTurnTrue, 100)
       } else {
         this.text += 'Bad Guy misses!\n'
         this.swoosh2.play()
         this.setState({ badGuyBonusActionTaken: true }, this.enemyTurnOver)
         this.updateText()
       }
     }
   }

   enemyTurnOver = () => {
     this.text += "Bad Guy's turn is over.\n"
     this.playerTurn()
     this.updateText()
     this.resetPlayerTurn()
   }

   // plays badGuy victory gif, combat log, plays sound
   enemyVictory = () => {
     function playSound () {
       const audio = new Audio(TryAgain)
       audio.play()
     }
     if (this.currentHitPoints < 1) {
       this.setState({ gameOver: true })
       this.text += 'Bad Guy has defeated you!\n'
       this.setState({ combatImage: PlayerGameOver })
       this.updateText()
       this.owah2.play()
       setTimeout(playSound, 1000)
     } else {
       this.enemyTurnOver()
     }
   }

   // Bad Guy will attack if it's his turn and player still alive
   enemyAction = () => {
     console.log(this.state.currentHitPoints)
     console.log(this.state.playerTurn)
     if ((this.state.currentHitPoints > 0) && (!this.state.playerTurn)) {
       setTimeout(this.enemyFirstAttack, 100)
     }
   }

   // Invokdes second wind function if under half health, otherwise attacks, victory sequence if player dead.
   enemyBonusAction = () => {
     if ((this.badGuyCurrentHitPoints < (this.badGuyMaxHitPoints / 2)) && (!this.state.badGuySecondWindUsed) &&
      (this.state.currentHitPoints > 0) && (!this.state.playerTurn)) {
       setTimeout(this.enemySecondWind, 750)
     } else if ((this.state.currentHitPoints > 0) && (!this.state.playerTurn) && (!this.badGuyBonusActionTaken)) {
       setTimeout(this.enemySecondAttack, 500)
     } else if (this.currentHitPoints < 1) {
       this.enemyVictory()
     }
   }

   render () {
     return (
    <>
    <div class="barContainer">
      <BonusBar
        currentHitPoints={this.state.currentHitPoints} strength={this.props.strength}
        dexterity={this.props.dexterity} constitution={this.props.constitution}
        intelligence={this.props.intelligence} wisdom={this.props.wisdom}
        charisma={this.props.charisma}/>
      <div class="verticalMiddle">
        <div class="image" id="combatImage">
          <img src={this.state.combatImage}
            alt="new"
            style={{ width: 960, height: 600 }}
            resizeMode='cover'
          />
        </div>
        <div id="upperContent" class="upperContent">
          <div id="upperSubLeft" class="upperSub">
            {this.beginCombat()}
          </div>
          <div id="upperSubRight" class="upperSub">
            <div id="upperSubRight" class="upperSub">
            </div>
            <div id="middleSubRight" class="upperSub">
              {this.bonusAction1()}
            </div>
            <div id="lowerSubRight" class="upperSub">
              {this.bonusAction2()}
            </div>
          </div>
        </div>
        <div id="combatLog" class="content">
          {this.state.text}
        </div>
      </div>
      <BadGuyStats badGuyCurrentHitPoints={this.state.badGuyCurrentHitPoints} />
    </div>
    </>
     )
   }
}
export default CompletedStats
