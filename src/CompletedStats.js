import React from "react";
import BonusBar from "./BonusBar"
import './CompletedStats.css';
import BadGuyStats from "./BadGuyStats"
import Stance0 from "./Stance0.jpg"
import WindUp from "./WindUp.gif"
import PlayerFirstSwing from "./PlayerFirstSwing.gif"
import PlayerSecondAttack from "./PlayerSecondAttack.gif"
import SecondWindUp from "./SecondWindUp.gif"
import EnemyFirstAttack from "./EnemyFirstAttack.gif"
import EnemySecondAttack from "./EnemySecondAttack.gif"
import PlayerGameOver from "./PlayerGameOver.gif"
import EnemyGameOver from "./EnemyGameOver.gif"
import FighterGonnaFight from "./FighterGonnaFight.mp3"
import Swoosh from "./Swoosh.mp3"
import Swoosh2 from "./Swoosh.mp3"
import SwingHit from "./SwingHit.mp3"
import Ow from "./J_OW.mp3"
import Oowah from "./J_Oowah.mp3"
import Owah2 from "./G_Owah2.mp3"
import HaHa from "./J_HAHA.mp3"
import TryAgain from "./J_TryAgain.mp3"
import HaHaHa from "./G_HaHaHa.mp3"
import Owah from "./G_Owah.mp3"
import Wind from "./OutdoorWind.mp3"

class CompletedStats extends React.Component{

  constructor(props){
    super(props);
    this.Text = "Begin";
    this.BadGuyDexterityBonus = 1;
    this.ProficiencyBonus = 2;
    this.BadGuyProficiencyBonus = 2;
    this.ArmorClass = 16;
    this.BadGuyArmorClass = 16;
    this.BadGuyMaxHitPoints = 12;
    this.BadGuyCurrentHitPoints = 12;
    this.CurrentHitPoints = Number(this.MaxHitPoints());
    this.RollToHitValue = 0;
    this.Swoosh = new Audio(Swoosh);
    this.Swoosh2 = new Audio(Swoosh2);
    this.SwingHit = new Audio(SwingHit);
    this.Ow = new Audio(Ow);
    this.Owah = new Audio(Owah)
    this.Owah2 = new Audio(Owah2);
    this.HaHa = new Audio(HaHa);
    this.TryAgain = new Audio(TryAgain);
    this.HaHaHa = new Audio(HaHaHa);
    this.Wind = new Audio(Wind);

    this.state = {
      CombatImage : Stance0,
      Text : this.Text,
      RollInitClicked : false,
      BonusRollInitClicked : false,
      PlayerTurn : false,
      Attacked : false,
      BonusAttacked : false,
      ActionTaken : false,
      BonusActionTaken: false,
      BonusAttackTaken : false,
      RolledToHit : false,
      BonusRolledToHit : false,
      BonusRolledDamage : false,
      SecondWindUsed : false,
      SuccessfulHit : false,
      BonusSuccessfulHit : false,
      BadGuySecondWindUsed : false,
      CurrentHitPoints : Number(this.MaxHitPoints()),
      BadGuyCurrentHitPoints : this.BadGuyMaxHitPoints,
      GameOver : false,
      BadGuyActionTaken : false,
      BadGuyBonusActionTaken : false
    };
  }

//Resets states so "Bad Guy" logic can cycle
  ResetBadGuyTurn = () => {
    this.setState({ PlayerTurn : false}, this.EnemyAction);
    this.setState({ BadGuyActionTaken : false });
    this.setState({ BadGuyBonusActionTaken : false });
  }

//Resets states so user can go through their turn sequence again.
  ResetPlayerTurn = () => {
    this.setState({ PlayerTurn : true})
    this.setState({ ActionTaken : false });
    this.setState({ BonusActionTaken : false });
    this.setState({ SuccessfulHit : false });
    this.setState({ BonusAttackTaken : false });
    this.setState({ BonusRolledToHit : false });
    this.setState({ BonusRolledDamage : false });
    this.setState({ BonusAttacked : false });
    this.setState({ Attacked : false})
    this.setState({ RolledToHit : false})
    this.setState({ RolledDamage : false})
    this.BeginCombat();
  }

//Returns higher modifier of Str or Dex stat, fighters can use either
  HigherMod = () => {
    if(this.props.Strength >= this.props.Dexterity){
      return(this.GetModifier(this.props.Strength))
    }
    else{
      return(this.GetModifier(this.props.Dexterity))
    }
  }

//calculates D&D modifier of a stat.
  GetModifier = (x) => {
    x = (Math.floor((x-10)/2));
    return x;
  }

//calculates maximum hit points based on chosen Constitution value.
  MaxHitPoints = () => {return(this.GetModifier(this.props.Constitution) + 10)
  }

//keeps combat log scrolled to the bottom
  ScrollLog = () => {
    var textarea = document.getElementById('combatLog');
    textarea.scrollTop = textarea.scrollHeight + textarea.scrollHeight;
  }

  UpdateText = () => {
    this.setState({ Text : this.Text });
    setTimeout(this.ScrollLog, 100)
  }

  UpdateCurrentHitPoints = () => {
    this.setState({ CurrentHitPoints : this.CurrentHitPoints })
  }

  UpdateBadGuyHitPoints = () => {
    this.setState({ BadGuyCurrentHitPoints : this.BadGuyCurrentHitPoints })
  }

  SetPlayerTurnFalse = () => {
    this.setState({ PlayerTurn : false})
  }

  SetPlayerTurnTrue = () => {
    this.setState({ PlayerTurn : true})
  }

  UpdateAction = () => {
    this.setState({ ActionTaken : true});
  }

//Player action conditional combat logic, based on D&D.  Set states allow proceeding buttons
//to be displayed after current button clicked.
  BeginCombat = () => {
    if(this.BadGuyCurrentHitPoints > 0){
      if(!this.state.RollInitClicked){
        var audio = new Audio(FighterGonnaFight);
        audio.play();
        return (
             <button id="Init" onClick={()=>{(this.RollInit)(this.setState({ RollInitClicked : true }))}}>
             Roll for Initiative!
           </button>
       )
      }
      else if((this.state.RollInitClicked) && (!this.state.Attacked)){
        return(
          <button id="Init" onClick={()=>{(this.PlayerAttack)(this.setState({ Attacked : true }))}}>
            Attack!
          </button>
        )
      }
      else if((this.state.RollInitClicked) && (!this.state.RolledToHit)){
        return(
          <button id="Init" onClick={()=>{(this.PlayerRollToHit)(this.setState({ RolledToHit : true }))}}>
            Roll to Hit!
          </button>
        )
      }
      else if((!this.state.ActionTaken) && (this.state.RolledToHit) &&
              (this.state.SuccessfulHit)){
        return(
          <button id="Init" onClick={()=>{(this.RollDamage)(this.setState({ ActionTaken : true }))}}>
            Roll Damage!
          </button>
        )
      }
      else if ((this.state.ActionTaken) && (this.state.BonusActionTaken) && (!this.state.GameOver)){
        return(
          <button id="Init" onClick={()=>{this.ResetBadGuyTurn()}}>
            End Turn
          </button>
        )
      }
    }
    else if (!this.state.GameOver){
          this.PlayerWins();
          this.setState({ GameOver : true })
      }
    }

//Bonus Attack combat sequence.  Sets states to allow proceeding buttons to be displayed
  BonusAction1 = () => {
    if((!this.state.BonusActionTaken) && (this.state.PlayerTurn) &&
    (this.BadGuyCurrentHitPoints > 0) && (this.state.ActionTaken)){
        if(!this.state.BonusAttacked){
          return(
            <button id="Init" onClick={()=>{(this.BonusPlayerAttack)(this.setState({ BonusAttacked : true }))}}>
              Bonus Action Attack!
            </button>
          )
        }
        else if((this.state.RollInitClicked) && (!this.state.BonusRolledToHit)){
          return(
            <button id="Init" onClick={()=>{(this.BonusPlayerRollToHit)(this.setState({ BonusRolledToHit : true }))}}>
              Roll to Hit!
            </button>
          )
        }
        else if((this.state.BonusRolledToHit) && (this.state.BonusSuccessfulHit) && (!this.state.BonusRolledDamage)){
          return(
            <button id="Init" onClick={()=>{(this.BonusRollDamage)(this.setState({ BonusRolledDamage : true }))}}>
              Roll Damage!
            </button>
          )
        }
      else return null
    }
  }

//Displays "Second Wind" button if not already used once. Sets state to disallow bonus attack when clicked
  BonusAction2 = () => {
    if((!this.state.BonusActionTaken) && (!this.state.BonusAttacked) &&
    (this.state.PlayerTurn) && (this.state.ActionTaken)){
      if (!this.state.SecondWindUsed){
        return(
            <button id="SecondWind" onClick={()=>{(this.PlayerSecondWind)(this.setState({ BonusActionTaken : true}))}}>
              Bonus Action: Second Wind
            </button>
        )
      }
      else return null
    }
  }

//simulates rolling for initiative for both characters after "Roll for Initiative!" clickec.
  RollInit = () => {
   let PlayerRoll = 0;
   PlayerRoll = Math.floor((Math.random() * 19) +2);
   let EnemyRoll = 0;
   EnemyRoll = Math.floor((Math.random() * 19) +2);
   this.Text = "Your initiative roll was: " + PlayerRoll + "!\n";
   this.Text += "Bad Guy's initiative roll was: " + EnemyRoll + "!\n";
   if (PlayerRoll > EnemyRoll){
     this.Text += "You go first!\n";
     this.UpdateText();
     this.SetPlayerTurnTrue();
     this.PlayerTurn();
   }
   else {
     this.Text += "Bad Guy goes first!\n";
     this.UpdateText();
     this.SetPlayerTurnFalse();
     this.EnemyAction();
   }
 }

//Updates image and combat log after "Attack!" clicked
 PlayerAttack = () => {
   if ((this.state.BadGuyCurrentHitPoints > 0) && (this.state.PlayerTurn === true)){
     this.setState({ CombatImage : WindUp });
     this.Text += "You rear your sword back and take a mighty swing!\n"
     this.UpdateText()
   }
 }

//simulates rolling to hit in D&D
 PlayerRollToHit = () => {
   this.RollToHitValue = ((Math.floor((Math.random() * 19) +2)) + this.ProficiencyBonus +
   this.HigherMod());
   if(this.RollToHitValue >= this.BadGuyArmorClass){
     this.Text += "Your roll of " + this.RollToHitValue + " got the best of Bad Guy's armor class (" +
     this.BadGuyArmorClass + ")!\n";
     this.Text += "Roll for damage!\n";
     this.UpdateText();
     this.setState({ SuccessfulHit : true});
   }
   else{
     this.setState({ CombatImage : PlayerSecondAttack })
     this.Text += "Your roll of " + this.RollToHitValue + " wasn't enough to penetrate Bad Guy's armor class (" +
     this.BadGuyArmorClass + ")! You missed!\n";
     this.Swoosh.play();
     this.UpdateText();
     (this.setState({ ActionTaken : true }))
   }
 }

//Player victory gif, Delay function to keep sounds separated.  Updates log, plays sound
 PlayerWins = () => {
   this.Text += "You have defeated Bad Guy!!\n"
   this.UpdateText()
   this.setState({ BonusActionTaken : true })
   this.setState({ CombatImage : EnemyGameOver })
   this.Ow.play();
   let downSeconds = 3;
   function Delay() {
     downSeconds--;
     if (downSeconds > 0) {
       setTimeout(Delay, 100);
     }
     else {
       var audio = new Audio(Oowah)
       audio.play();
     }
   }
   setTimeout(Delay, 400);
   let seconds = 12;
   function Delay2() {
     seconds--;
     if (seconds > 0) {
       setTimeout(Delay2, 100);
     }
     else {
       var audio2 = new Audio(HaHaHa)
       audio2.play();
     }
   }
   setTimeout(Delay2, 650);
 }

//Different WindUp image and combat text when Bonus Attack clicked
 BonusPlayerAttack = () => {
   if ((this.state.BadGuyCurrentHitPoints > 0) && (this.state.PlayerTurn === true)){
     this.setState({ CombatImage : SecondWindUp });
     this.Text += "You prepare to skewer the enemy!\n"
     this.UpdateText()
   }
 }

//simulates rolling to hit, updates combat log, moves to next step depending on reult
 BonusPlayerRollToHit = () => {
   let RollToHitValue = 0;
   RollToHitValue = ((Math.floor((Math.random() * 19) +2)) + this.ProficiencyBonus +
   this.HigherMod());
   if(RollToHitValue >= this.BadGuyArmorClass){
     this.Text += "Your roll of " + RollToHitValue + " got the best of Bad Guy's armor class (" +
     this.BadGuyArmorClass + ")!\n";
     this.Text += "Roll for damage!\n";
     this.UpdateText();
     this.setState({ BonusSuccessfulHit : true});
   }
   else{
     this.Swoosh2.play();
     this.setState({ CombatImage : PlayerSecondAttack })
     this.Text += "Your roll of " + RollToHitValue + " wasn't enough to penetrate Bad Guy's armor class (" +
     this.BadGuyArmorClass + ")! You missed!\n";
     this.UpdateText();
     (this.setState({ BonusActionTaken : true }))
   }
 }

//simulates rolling for damage, updates combat log, image and hit points, plays sound
//delay function is to hopefully ensure that sound plays
 BonusRollDamage = () => {
   this.setState({ CombatImage : PlayerSecondAttack })
   let Damage = 0;
   Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.ProficiencyBonus);
   this.Text += "You slice into your enemy for " + Damage + " points of damage!\n";
   this.SwingHit.play();
   let downSeconds = 3;
   function Delay() {
     downSeconds--;
     if (downSeconds > 0) {
       setTimeout(Delay, 100);
     }
     else {
       var audio = new Audio(Ow)
       audio.play();
     }
   }
   setTimeout(Delay, 50);
   this.BadGuyCurrentHitPoints -= Damage;
   this.setState({ BonusActionTaken : true })
   this.UpdateBadGuyHitPoints();
   this.UpdateText();
 }

//siimulates rolling for damage, updates combat log, image, hit points,
//delay function is to hopefully ensure that sound plays
 RollDamage = () => {
   this.setState({ CombatImage : PlayerFirstSwing })
   let Damage = 0;
   Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.ProficiencyBonus);
   this.Text += "You slice into your enemy for " + Damage + " points of damage!\n";
   this.SwingHit.play();
   let downSeconds = 3;
   function Delay() {
     downSeconds--;
     if (downSeconds > 0) {
       setTimeout(Delay, 100);
     }
     else {
       var audio = new Audio(Ow)
       audio.play();
     }
   }
   setTimeout(Delay, 50);
   this.BadGuyCurrentHitPoints -= Damage;
   (this.setState({ ActionTaken : true }))
   this.UpdateBadGuyHitPoints();
   this.UpdateText();
 }

//for when "Second Wind" is clicked.  Calculates amount healed, updates hit points, plays sound
 PlayerSecondWind = () => {
   this.setState({ SecondWindUsed : true});
   this.setState({ BonusAttackTaken : true});
   this.Wind.play();
   let SecondWind = 0;
   SecondWind = ((Math.floor((Math.random() * 9) +2)) + 1);
   this.Text += "You use the Second Wind ability to heal for " + SecondWind +
   " hit points!\n"
   if ((this.CurrentHitPoints + SecondWind) > Number(this.MaxHitPoints())){
     this.CurrentHitPoints = Number(this.MaxHitPoints())
   }
   else {
     this.CurrentHitPoints += SecondWind;
   }
   this.UpdateText();
   this.UpdateCurrentHitPoints();
 }

   PlayerTurn = () => {
     this.Text += "Take your turn!!\n";
     this.UpdateText();
   }

//Bad Guy turn.  Follows D&D logic to the best of my ability.  Delay function to separate sounds.
//Rolls to hit, rolls damage, updates image and log, plays sound, sets states enabling turn to process.
   EnemyFirstAttack = () => {
     this.Text += "Bad Guy attempts an attack!\n"
     this.setState ({ CombatImage : EnemyFirstAttack })
     this.UpdateText();
     this.RollToHitValue = ((Math.floor((Math.random() * 19) +2)) + this.BadGuyProficiencyBonus +
     this.BadGuyDexterityBonus);
     this.Text += "Bad Guy rolls to hit.  He rolls a " + this.RollToHitValue + "!\n"
     this.UpdateText();
     if(this.RollToHitValue >= this.ArmorClass){
       console.log(this.CurrentHitPoints)
       this.SwingHit.play()
       let downSeconds = 4;
       function Delay() {
         downSeconds--;
         if (downSeconds > 0) {
           setTimeout(Delay, 100);
         }
         else {
           var audio = new Audio(Owah)
           audio.play();
         }
       }
       setTimeout(Delay, 100);
       let Damage = 0;
       Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.BadGuyProficiencyBonus);
       this.Text += "Your armor class is" + this.ArmorClass + ", so he hits!\n";
       this.UpdateText();
       this.Text += "Bad Guy swings his short sword. You take " + Damage + " points of damage!\n"
       this.CurrentHitPoints -= Damage;
       this.setState({ BadGuyActionTaken : true })
       this.setState({ CurrentHitPoints : this.CurrentHitPoints }, this.EnemyBonusAction)
       this.UpdateText();
     }

     else {
       this.Text += "Bad Guy misses!\n"
       this.Swoosh.play();
       this.UpdateText();
       this.setState({ BadGuyActionTaken : true }, this.EnemyBonusAction)
     }
   }

//Rolls for amount healed, updates combat log, plays sound, sets states to prevent
//additional use on following turns, and to mark bonus action as spent
   EnemySecondWind = () => {
       let SecondWind = 0;
       SecondWind = ((Math.floor((Math.random() * 9) +2)) + 1);
       this.Text += "Bad Guy uses the Second Wind bonus action to heal for " + SecondWind +
       " hit points!\n"
       if ((SecondWind + this.BadGuyCurrentHitPoints) > this.BadGuyMaxHitPoints){
         this.BadGuyCurrentHitPoints = this.BadGuyMaxHitPoints
       }
       else {
         this.BadGuyCurrentHitPoints += SecondWind;
       }
       this.UpdateBadGuyHitPoints();
       this.UpdateText();
       this.setState({ BadGuySecondWindUsed : true});
       this.setState ({ BadGuyBonusActionTaken : true}, this.EnemyVictory)
       this.SetPlayerTurnTrue()
       this.Wind.play();
     }

   //Bad Guy bonus attack logic, updates combat log, image, and plays sound(s)
   EnemySecondAttack = () => {
     if ((this.state.CurrentHitPoints > 0) && (!this.state.PlayerTurn)){
       this.Text += "Bad Guy attempts a second attack!\n"
       this.UpdateText();
       this.setState({ CombatImage : EnemySecondAttack })
       this.RollToHitValue = 0;
       this.RollToHitValue = ((Math.floor((Math.random() * 19) +2)) + this.BadGuyProficiencyBonus +
       this.BadGuyDexterityBonus);
       this.Text += "Bad Guy rolls to hit.  He rolls a " + this.RollToHitValue + "!\n"
       this.UpdateText();
       if(this.RollToHitValue >= this.ArmorClass){
         this.SwingHit.play();
         let downSeconds = 4;
         function Delay() {
           downSeconds--;
           if (downSeconds > 0) {
             setTimeout(Delay, 100);
           }
           else {
             var audio = new Audio(Owah)
             audio.play();
           }
         }
         setTimeout(Delay, 100);
         let Damage = 0;
         Damage = Number((Math.floor((Math.random() * 5) + 2)) + this.BadGuyProficiencyBonus);
         this.Text += "Your armor class is" + this.ArmorClass.toString() + ", he hits!\n";
         this.UpdateText();
         this.Text += "Bad Guy swings his short sword. You take " + Damage + " points of damage!\n"
         this.setState ({ BadGuyBonusActionTaken : true})
         this.UpdateText();
         this.CurrentHitPoints -= Damage;

         this.setState({ CurrentHitPoints : this.CurrentHitPoints }, this.EnemyVictory)
         setTimeout(this.SetPlayerTurnTrue, 100)
       }
         else {
           this.Text += "Bad Guy misses!\n"
           this.Swoosh2.play();
           this.Swoosh2.play();
           this.setState ({ BadGuyBonusActionTaken : true}, this.EnemyTurnOver)
           this.UpdateText();
         }
       }
     }

   EnemyTurnOver = () => {
     this.Text += "Bad Guy's turn is over.\n";
     this.PlayerTurn();
     this.UpdateText();
     this.ResetPlayerTurn();
   }

//plays BadGuy victory gif, combat log, plays sound
   EnemyVictory = () => {
     if (this.CurrentHitPoints < 1){
       this.setState({ GameOver : true })
       this.Text += "Bad Guy has defeated you!\n"
       this.setState({ CombatImage : PlayerGameOver })
       this.UpdateText();
       this.Owah2.play();
       let downSeconds = 8;
       function Delay() {
         downSeconds--;
         if (downSeconds > 0) {
           setTimeout(Delay, 100);
         }
         else {
           var audio = new Audio(HaHa)
           audio.play();
         }
       }
       setTimeout(Delay, 100);
       let seconds = 12;
       function Delay2() {
         seconds--;
         if (seconds > 0) {
           setTimeout(Delay2, 100);
         }
         else {
           var audio2 = new Audio(TryAgain)
           audio2.play();
         }
       }
       setTimeout(Delay2, 650);
     }
     else{
       this.EnemyTurnOver();
     }
   }

//Bad Guy will attack if it's his turn and player still alive
   EnemyAction = () => {
     console.log(this.state.CurrentHitPoints);
     console.log(this.state.PlayerTurn);
     if ((this.state.CurrentHitPoints > 0) && (!this.state.PlayerTurn)){
       setTimeout(this.EnemyFirstAttack, 100);
      }
   }

//Invokdes second wind function if under half health, otherwise attacks, victory sequence if player dead.
   EnemyBonusAction = () => {
     if((this.BadGuyCurrentHitPoints < (this.BadGuyMaxHitPoints/2)) && (!this.state.BadGuySecondWindUsed) &&
      (this.state.CurrentHitPoints > 0) && (!this.state.PlayerTurn)){
         setTimeout(this.EnemySecondWind, 750)
     }
     else if((this.state.CurrentHitPoints > 0) && (!this.state.PlayerTurn) && (!this.BadGuyBonusActionTaken)){
       setTimeout(this.EnemySecondAttack, 500)
     }
     else if (this.CurrentHitPoints < 1){
       this.EnemyVictory();
     }
  }

render(){

   return(
    <>
    <div class="BarContainer">
      <BonusBar
      CurrentHitPoints={this.state.CurrentHitPoints} Strength={this.props.Strength}
      Dexterity={this.props.Dexterity} Constitution={this.props.Constitution}
      Intelligence={this.props.Intelligence} Wisdom={this.props.Wisdom}
      Charisma={this.props.Charisma}  />
      <div class="VerticalMiddle">
      <div class="Image" id="CombatImage">
        <img src={this.state.CombatImage}
        alt="new"
        style={{width: 960, height:600}}
        resizeMode='cover'
        />
      </div>
        <div id="upperContent" class="upperContent">
          <div id="upperSubLeft" class="upperSub">
          {this.BeginCombat()}
          </div>
          <div id="upperSubRight" class="upperSub">
            <div id="upperSubRight" class="upperSub">
            </div>
            <div id="middleSubRight" class="upperSub">
            {this.BonusAction1()}
            </div>
            <div id="lowerSubRight" class="upperSub">
            {this.BonusAction2()}
            </div>
          </div>
        </div>
        <div id="combatLog" class="content">
          {this.state.Text}
        </div>
      </div>
      <BadGuyStats BadGuyCurrentHitPoints={this.state.BadGuyCurrentHitPoints} />
    </div>
    </>
  );
}
}
export default CompletedStats;
