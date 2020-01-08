import React from 'react'
import './BadGuy.css'
import { getDecorator, getModifier } from './CommonMethods'
import {
  badGuyStrength, badGuyDexterity, badGuyConstitution, badGuyIntelligence,
  badGuyWisdom, badGuyCharisma, badGuyMaxHitPoints
} from './Constants'

class BadGuyStats extends React.Component {
  stats = ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA'];
  statsProps = [badGuyStrength, badGuyDexterity, badGuyConstitution,
    badGuyIntelligence, badGuyWisdom, badGuyCharisma];

  outputStats = this.stats.map((value, index) => {
    const statsPropsLink = this.statsProps[index]
    return (
      <span class="badGuyStatBonus">
        <label>{value}</label>{getDecorator(getModifier(statsPropsLink))}{getModifier(statsPropsLink)}
        <span class="badGuyStatValue">{statsPropsLink}
        </span>
      </span>
    )
  })

  render () {
    return (
    <>
    <span class="fullVerticalWrapper">
      <span class="badGuyScores">Bad Guy Stats
        {this.outputStats}
        <span class="statBonus">
          <label>HIT POINTS</label>{this.props.badGuyCurrentHitPoints}
        </span>
        <span>
          <meter min="0" low={badGuyMaxHitPoints * 0.25} high={badGuyMaxHitPoints * 0.75} optimum = {badGuyMaxHitPoints}value={this.props.badGuyCurrentHitPoints} max={badGuyMaxHitPoints}></meter>
        </span>
      </span>
    </span>

    </>
    )
  }
}
export default BadGuyStats
