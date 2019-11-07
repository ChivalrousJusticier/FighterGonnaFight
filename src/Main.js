import React from "react";
import styled from "styled-components";
import StrengthBox from "./StrengthBox";
import ConstitutionBox from "./ConstitutionBox";
import IntelligenceBox from "./IntelligenceBox";
import WisdomBox from "./WisdomBox";
import CharismaBox from "./CharismaBox";
import DexterityBox from "./DexterityBox";
import StatList from "./StatsList";
import CompletedStats from "./CompletedStats"

const Container = styled.div`
  display: flex;
  align: center;
  justify-content: center;
`;

//generate a Fighter's stat - Roll 4 d6!
function randomStat(){
  var x1 = Math.floor((Math.random() * 5) +2);
  var x2 = Math.floor((Math.random() * 5) +2);
  var x3 = Math.floor((Math.random() * 5) +2);
  var x4 = Math.floor((Math.random() * 5) +2);
  //Find the highest 3 rolls and add them!
  var fourD6 = [x1, x2, x3, x4];
  fourD6.sort(function(a,b){return a - b});
  fourD6.shift();
  var x = fourD6.reduce((a, b) => a + b);

return x;
}

//creates 6 random stats for the user's consideration.
const initialList = [
  { id: 1, title: randomStat(), added: false },
  { id: 2, title: randomStat(), added: false },
  { id: 3, title: randomStat(), added: false },
  { id: 4, title: randomStat(), added: false },
  { id: 5, title: randomStat(), added: false },
  { id: 6, title: randomStat(), added: false },
];

class Main extends React.Component {
  state = {
    list: initialList,
    addedStrength: [],
    addedDexterity: [],
    addedConstitution: [],
    addedIntelligence: [],
    addedWisdom: [],
    addedCharisma: [],
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
    CurHP: 0,
    MaxHP: 0,
    nextModule : false
  };

//Updating these 'handle' setState's needs to happen
//in separate statements or bad things happen
//these "handle" callback functions each do three things, add the dropped stat to a list,
//remove the stat from the as yet undragged list of stats, and
//assign the stat to a variable to be used in the next stage
  handleDropDexterity = id => {
    this.setState({addedDexterity: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Dexterity: Number(this.state.addedDexterity.map(x => x.title))});
  };
  handleDropConstitution = id => {
    this.setState({addedConstitution: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Constitution: Number(this.state.addedConstitution.map(x => x.title))});
  };
  handleDropIntelligence = id => {
    this.setState({addedIntelligence: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Intelligence: Number(this.state.addedIntelligence.map(x => x.title))});
  };
  handleDropStrength= id => {
    this.setState({addedStrength: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Strength: Number(this.state.addedStrength.map(x => x.title))});
  };
  handleDropWisdom = id => {
    this.setState({addedWisdom: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Wisdom: Number(this.state.addedWisdom.map(x => x.title))});
  };
  handleDropCharisma = id => {
    this.setState({addedCharisma: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Charisma: Number(this.state.addedCharisma.map(x => x.title))});
  };

//a button to move to next stage once desired stats are where the user wants them
  Button = () => {
    return (
      <div>
        <button onClick={this.UpdatePage}>
          Next Stage!
        </button>
      </div>
    );
  }

//a way to conditionally render the page via state
  UpdatePage = () => {
    this.setState({ nextModule : true })
  }

  render() {
    const { list, addedStrength, addedDexterity, addedConstitution, addedIntelligence,
      addedWisdom, addedCharisma } = this.state;

    console.log('render', this.props, this.state);
    if(!this.state.nextModule){
      return (

        <>
        <Container>
        <h1>
        Create your fighter!
        </h1>
        </Container>
        <Container class="Statlist">
        <StatList list={list} />
        </Container>
        <Container><br />
        Drag rolled stats from above to categories below!
        <br />
        </Container>
        <br />
        <Container>
        <StrengthBox
          list={addedStrength}
          setStrength={this.handleDropStrength}
        />
        <DexterityBox
          list={addedDexterity}
          setDexterity={this.handleDropDexterity}
        />
        <ConstitutionBox
          list={addedConstitution}
          setConstitution={this.handleDropConstitution}
        />
        <IntelligenceBox
          list={addedIntelligence}
          setIntelligence ={this.handleDropIntelligence}
        />
        <WisdomBox
          list={addedWisdom}
          setWisdom={this.handleDropWisdom}
        />
        <CharismaBox
          list={addedCharisma}
          setCharisma={this.handleDropCharisma}
        />
        </Container>
        <Container>
        {this.Button()}
        </Container>
        </>
      );
    }
    else{
      return(
        <CompletedStats Strength={this.state.Strength} Dexterity={this.state.Dexterity}
        Constitution={this.state.Constitution} Intelligence={this.state.Intelligence}
        Wisdom={this.state.Wisdom} Charisma={this.state.Wisdom}/>
      )
    }
  }
}

export default Main;
