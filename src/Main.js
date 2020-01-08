import React from "react";
import styled from "styled-components";
import StatBox from "./StatBox";
import StatList from "./StatsList";
import CompletedStats from "./CompletedStats"
import {statTitles} from "./Constants.js"

const Container = styled.div`
  display: flex;
  align: center;
  justify-content: center;
`;

//generate a Fighter's stat - Roll 4 d6!
function randomStat(){
  let fourD6 = [];
  for (let i = 0; i < 4; i++) {
    fourD6.push(Math.floor((Math.random() * 5) +2));
  }
  fourD6.sort();
  fourD6.shift();
  return fourD6.reduce((a, b) => a + b);
}

//creates 6 random stats for the user's consideration.
const initialList = [
  { id: 1, value: randomStat() },
  { id: 2, value: randomStat() },
  { id: 3, value: randomStat() },
  { id: 4, value: randomStat() },
  { id: 5, value: randomStat() },
  { id: 6, value: randomStat() },
];

class Main extends React.Component {
  constructor(props){
    super(props);

  this.state = {
    tempTitle : "",
    list: initialList,
    nextModule : false,
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charsima: 0
  };
}

// handleDrop saves drag and dropped stats to state, and updates list of undragged stats.
  handleDrop = (id) => {
    this.setState({ [this.state.tempTitle] : [this.state.list.find(stats => stats.id === id)][0].value})
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
  }

//retrieves stat title from StatBox and saves to state
  getTitle = (statBoxTitle) => {
    this.setState({ tempTitle: statBoxTitle})
  }

//this callback takes the value saved to state in handleDrop, sends to StatBox to be displayed after dragging
  getDraggedStat = stat => {
    if (this.state[stat] > 0){
      return this.state[stat]
    }
  }

//a button to move to next stage once desired stats are where the user wants them
  button = () => {
    return (
      <div>
        <button onClick={this.updatePage}>
          Next Stage!
        </button>
      </div>
    );
  }

//conditionally render the page via state
  updatePage = () => {
    this.setState({ nextModule : true })
  }

  render() {
    const { list } = this.state;

    console.log('render', this.props, this.state);
    if(!this.state.nextModule){
      return (

        <>
        <Container>
        <h1>
        Create your fighter!
        </h1>
        </Container>
        <Container class="statlist">
        <StatList list={list} />
        </Container>
        <Container><br />
        Drag rolled stats from above to categories below!
        <br />
        </Container>
        <br />
        <Container>
        {
          statTitles.map((title) => {
            return (<StatBox
            statWord = {title}
            draggedStat = {this.getDraggedStat}
            setStat = {this.handleDrop}
            assemble = {this.getTitle}/>)
          })
        }
        </Container>
        <Container>
        {this.button()}
        </Container>
        </>
      );
    }
    else{

      return(
        <CompletedStats
        strength={this.state.Strength}
        dexterity={this.state.Dexterity}
        constitution={this.state.Constitution}
        intelligence={this.state.Intelligence}
        wisdom={this.state.Wisdom}
        charisma={this.state.Charisma}/>
      )
    }
  }
}

export default Main;
