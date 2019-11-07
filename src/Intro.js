import React from "react";
import Main from "./Main.js"
import "./Intro.css"


//Displays intro text until user clicks button to start character creation
class Intro extends React.Component {

  constructor(props){
    super(props);

  this.state = {
    EndIntro : false
  }
}

Button = () => {
  return (
    <div id="button">
      <button onClick={this.UpdatePage}>
        Let's fight!
      </button>
    </div>
  );
}

UpdatePage = () => {
  this.setState({ EndIntro : true })
}
  render(){
    if(!this.state.EndIntro){
      return(
        <body margin="0" id="Intro" class="Intro">
          <div id="around">
            <div id="pretty" class="pretty">
              <p> The notoriously infamous villain "Bad Guy" has ruined his homelands
              and is about to ruin yours!</p>

              <p> (He's also been mocking you viciously, insulting your mother, and contorting his
              face into really annoying sneers!)</p>

              <p> You've only one choice!  You must take up arms, become a fighter
               and end him once and for all!</p>

              <p>Will you take up the fight?</p>
              <p></p>
              {this.Button()}
            </div>
          </div>
        </body>
      )
    }


    else{
      return(
        <Main />
      )
    }
  }
}
export default Intro;
