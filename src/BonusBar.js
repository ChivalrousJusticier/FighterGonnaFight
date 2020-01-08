import React from 'react'
import { getDecorator, getModifier } from './CommonMethods'

class BonusBar extends React.Component {
  maxHitPoints = () => { return (getModifier(this.props.constitution) + 10) }
  stats = ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA'];
  statsProps = [this.props.strength, this.props.dexterity, this.props.constitution,
    this.props.intelligence, this.props.wisdom, this.props.charisma];

  outputStats = this.stats.map((value, index) => {
    const statsPropsLink = this.statsProps[index]
    return (
      <span class="statBonus">
        <label>{value}</label>{getDecorator(getModifier(statsPropsLink))}{getModifier(statsPropsLink)}
        <span class="statValue">{statsPropsLink}
        </span>
      </span>
    )
  })

  render () {
    return (
      <>
      <span class="fullVerticalWrapper">
        <span class="scores">Your Stats
          {this.outputStats}
          <span class="statBonus">

            <label>HIT POINTS</label>{this.props.currentHitPoints}
          </span>
          <meter min="0" low={this.maxHitPoints() * 0.25} high={this.maxHitPoints() * 0.75} optimum = {this.maxHitPoints()}value={this.props.currentHitPoints} max={this.maxHitPoints()}></meter>
        </span>
      </span>
      </>
    )
  }
}
export default BonusBar
