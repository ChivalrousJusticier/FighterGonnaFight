import React from "react";
import './BadGuy.css';


function GetDecorator(x){
  if(x>0){
    return "+"
  }
}

function GetModifier(x){
  x = (Math.floor((x-10)/2));
  return x;
}

class BadGuyStats extends React.Component{

render(){

  const {
    BadGuyStrength = 15,
    BadGuyStrengthBonus = GetModifier(BadGuyStrength),
    BadGuyProficiencyBonus = 2,
    BadGuyArmorClass = 16,
    BadGuyDexterity = 13,
    BadGuyConstitution = 14,
    BadGuyIntelligence = 10,
    BadGuyWisdom = 8,
    BadGuyCharisma = 12,
    BadGuyDexterityBonus = GetModifier(BadGuyDexterity),
    BadGuyConstitutionBonus = GetModifier(BadGuyConstitution),
    BadGuyIntelligenceBonus = GetModifier(BadGuyIntelligence),
    BadGuyWisdomBonus = GetModifier(BadGuyWisdom),
    BadGuyCharismaBonus = GetModifier(BadGuyCharisma),
    BadGuyMaxHitPoints = 10 + BadGuyConstitutionBonus,

  } = this.props;




  return(
    <>
    <div class="FullVerticalWrapper">
      <div class="BadGuyScores">Bad Guy Stats
        <div class="BadGuyStatBonus">
          <label>STRENGTH</label>{GetDecorator(BadGuyStrengthBonus)}{BadGuyStrengthBonus}
          <div class="BadGuyStatValue">{BadGuyStrength}
          </div>
        </div>
        <div class="BadGuyStatBonus">
          <label>DEXTERITY</label>{GetDecorator(BadGuyDexterityBonus)}{BadGuyDexterityBonus}
          <div class="BadGuyStatValue">{BadGuyDexterity}
          </div>
        </div>
        <div class="BadGuyStatBonus">
          <label>CONSTITUTION</label>{GetDecorator(BadGuyConstitutionBonus)}{BadGuyConstitutionBonus}
          <div class="BadGuyStatValue">{BadGuyConstitution}
          </div>
        </div>
        <div class="BadGuyStatBonus">
          <label>INTELLIGENCE</label>{GetDecorator(BadGuyIntelligenceBonus)}{BadGuyIntelligenceBonus}
          <div class="BadGuyStatValue">{BadGuyIntelligence}
          </div>
        </div>
        <div class="BadGuyStatBonus">
          <label>WISDOM</label>{GetDecorator(BadGuyWisdomBonus)}{BadGuyWisdomBonus}
          <div class="BadGuyStatValue">{BadGuyWisdom}
          </div>
        </div>
        <div class="BadGuyStatBonus">
          <label>CHARISMA</label>{GetDecorator(BadGuyCharismaBonus)}{BadGuyCharismaBonus}
          <div class="BadGuyStatValue">{BadGuyCharisma}
          </div>
        </div>
        <div class="StatBonus">
          <label>HIT POINTS</label>{this.props.BadGuyCurrentHitPoints}
        </div>
        <div>
          <meter min="0" low={BadGuyMaxHitPoints*.25} high={BadGuyMaxHitPoints*.75} optimum = {BadGuyMaxHitPoints}value={this.props.BadGuyCurrentHitPoints} max={BadGuyMaxHitPoints}></meter>
        </div>
      </div>
    </div>

    </>
  )
}
}
export default BadGuyStats;
