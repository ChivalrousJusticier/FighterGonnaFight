import React from "react";
import styled from "styled-components";

import Stats from "./Stats";

const Header = styled.div`
  flex: 1;
  text-align: center;
`;

const List = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
align: center;
display: flex;
flex-direction: column;
flex: ;
box-shadow: 0 0 0.75rem 0.1rem rgba(0, 0, 100, 0.5);
margin: 1rem;
padding: 0.5rem;
`;

//Displays the random stats generated in Main.js
class StatList extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <Container>
        <Header>
          <h2>Stats</h2>
        </Header>
        <List>
          {list.map(({ id, value }) => <Stats key={id} id={id} value={value} />)}
        </List>
      </Container>

    );
  }
}

export default StatList;
