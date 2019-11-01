import React from "react";
import randomStat from "./randomStat"
//import { render } from "react-dom";
import styled from "styled-components";

import StrengthBox from "./StrengthBox";
import ConstitutionBox from "./ConstitutionBox";
import IntelligenceBox from "./IntelligenceBox";
import WisdomBox from "./WisdomBox";
import CharismaBox from "./CharismaBox";
import DexterityBox from "./DexterityBox";
import StatList from "./StatsList";
import CompletedStats from "./CompletedStats"

// export let Character = 0;
// export let Strength = 0;
// export let Dexterity = 0;
// export let Constitution = 0;
// export let Intelligence = 0;
// export let Wisdom = 0;
// export let Charisma = 0;

const Container = styled.div`
  display: flex;
  align: center;
  justify-content: center;
`;

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

  // UpdateStrength = () => {
  //   this.setState({ Strength : Strength})
  // }
//Updating these 'handle' setState's needs to happen
//in separate statements
  handleDropDexterity = id => {
    this.setState({addedDexterity: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Dexterity: Number(this.state.addedDexterity.map(x => x.title))});
    // Dexterity = this.state.Dexterity;
  };
  handleDropConstitution = id => {
    this.setState({addedConstitution: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Constitution: Number(this.state.addedConstitution.map(x => x.title))});
    // Constitution = this.state.Constitution;
  };
  handleDropIntelligence = id => {
    this.setState({addedIntelligence: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Intelligence: Number(this.state.addedIntelligence.map(x => x.title))});
    // Intelligence = this.state.Intelligence;
  };
  handleDropStrength= id => {
    this.setState({addedStrength: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Strength: Number(this.state.addedStrength.map(x => x.title))});
    // Strength = this.state.Strength;
  };
  handleDropWisdom = id => {
    this.setState({addedWisdom: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Wisdom: Number(this.state.addedWisdom.map(x => x.title))});
    // Wisdom = this.state.Wisdom;
  };
  handleDropCharisma = id => {
    this.setState({addedCharisma: ([this.state.list.find(stats => stats.id === id)])});
    this.setState({list: this.state.list.filter(stats => stats.id !== id)});
    this.setState({Charisma: Number(this.state.addedCharisma.map(x => x.title))});
    // Charisma = this.state.Charisma;
  };

  Button = () => {
    return (
      <div>
        <button onClick={this.UpdatePage}>
          Next Stage!
        </button>
      </div>
    );
  }

  UpdatePage = () => {
    this.setState({ nextModule : true })
  }


  render() {
    const { list, addedStrength, addedDexterity, addedConstitution, addedIntelligence,
      addedWisdom, addedCharisma } = this.state;

    console.log('render', this.props, this.state);
    if(!this.state.nextModule){
      return (

        <React.Fragment>



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
        </React.Fragment>



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
