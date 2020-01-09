import React from 'react'
import './BadGuy.css'
import { getDecorator, getModifier } from './CommonMethods'
import {
  badGuyStrength, badGuyDexterity, badGuyConstitution, badGuyIntelligence,
  badGuyWisdom, badGuyCharisma, badGuyMaxHitPoints, statTitles
} from './Constants'

class BadGuyStats extends React.Component {
  outputStats = statTitles.map((value, index) => {
    const statsProps = [badGuyStrength, badGuyDexterity, badGuyConstitution,
      badGuyIntelligence, badGuyWisdom, badGuyCharisma]
    const statsPropsLink = statsProps[index]
    return (
      <span className="badGuyStatBonus" key={index}>
        <label>{value.toUpperCase()}</label>{getDecorator(getModifier(statsPropsLink))}{getModifier(statsPropsLink)}
        <span className="badGuyStatValue">{statsPropsLink}
        </span>
      </span>
    )
  })

  render () {
    return (
      <>
        <span className="fullVerticalWrapper">
          <span className="badGuyScores">Bad Guy Stats
            {this.outputStats}
            <span className="statBonus">
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
