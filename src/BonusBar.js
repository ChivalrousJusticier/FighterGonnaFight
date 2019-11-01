import React from "react";

function GetDecorator(x){
  if(x>0){
    return "+"
  }
}

function GetModifier(x){
  x = (Math.floor((x-10)/2));
  return x;
}

class BonusBar extends React.Component{

  MaxHitPoints = () => {return(this.GetModifier(this.props.Constitution) + 10)}

  GetDecorator = (x) => {
    if(x>0){
      return "+"
    }
  }

  GetModifier = (x) => {
    x = (Math.floor((x-10)/2));
    return x;
  }

  render(){

    return(
      <>
      <div class="FullVerticalWrapper">
        <div class="Scores">Your Stats
          <div class="StatBonus">
            <label>STRENGTH</label>{this.GetDecorator(GetModifier(this.props.Strength))}{GetModifier(this.props.Strength)}
            <div class="StatValue">{this.props.Strength}
            </div>
          </div>
          <div class="StatBonus">
            <label>DEXTERITY</label>{this.GetDecorator(GetModifier(this.props.Dexterity))}{GetModifier(this.props.Dexterity)}
            <div class="StatValue">{this.props.Dexterity}
            </div>
          </div>
          <div class="StatBonus">
            <label>CONSTITUTION</label>{this.GetDecorator(GetModifier(this.props.Constitution))}{GetModifier(this.props.Constitution)}
            <div class="StatValue">{this.props.Constitution}
            </div>
          </div>
          <div class="StatBonus">
            <label>INTELLIGENCE</label>{this.GetDecorator(GetModifier(this.props.Intelligence))}{GetModifier(this.props.Intelligence)}
            <div class="StatValue">{this.props.Intelligence}
            </div>
          </div>
          <div class="StatBonus">
            <label>WISDOM</label>{this.GetDecorator(GetModifier(this.props.Wisdom))}{GetModifier(this.props.Wisdom)}
            <div class="StatValue">{this.props.Wisdom}
            </div>
          </div>
          <div class="StatBonus">
            <label>CHARISMA</label>{this.GetDecorator(GetModifier(this.props.Charisma))}{GetModifier(this.props.Charisma)}
            <div class="StatValue">{this.props.Charisma}
            </div>
          </div>
          <div class="StatBonus">

            <label>HIT POINTS</label>{this.props.CurrentHitPoints}
          </div>
          <meter min="0" low={this.MaxHitPoints()*.25} high={this.MaxHitPoints()*.75} optimum = {this.MaxHitPoints()}value={this.props.CurrentHitPoints} max={this.MaxHitPoints()}></meter>
        </div>
      </div>

      </>
    )
  }

}
export default BonusBar;
