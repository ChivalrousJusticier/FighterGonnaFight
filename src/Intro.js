import React from 'react'
import Main from './Main.js'
import './Intro.css'

// Displays intro text until user clicks button to start character creation
class Intro extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      endIntro: false
    }
  }

  button = () => {
    return (
      <div id="button">
        <button onClick={this.updatePage}>
        Let's fight!
        </button>
      </div>
    )
  }

updatePage = () => {
  this.setState({ endIntro: true })
}

render () {
  if (!this.state.endIntro) {
    return (
      <div margin="0" id="intro" className="intro">
        <div id="around">
          <div id="pretty" className="pretty">
            <p> The notoriously infamous villain "Bad Guy" has ruined his homelands
              and is about to ruin yours!</p>

            <p> (He's also been mocking you viciously, insulting your mother, and contorting his
              face into really annoying sneers!)</p>

            <p> You've only one choice!  You must take up arms, become a fighter
               and end him once and for all!</p>

            <p>Will you take up the fight?</p>
            <p></p>
            {this.button()}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Main />
    )
  }
}
}
export default Intro
