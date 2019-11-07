import React from "react";
import styled from "styled-components";
import { DropTarget } from "react-dnd";

const Container = styled.div`
height: 150px;
width: 120px;
box-shadow: 0 0 ${p => (p.canDrop ? "1.75" : "0.75")}rem 0.1rem
  rgba(100, 0, 0, 0.5);
background-color: ${p => (p.isOver ? "rgba(100, 0, 0, 0.1)" : "")};
margin: 1rem;
`;
const List = styled.div`
  justify-content: center;
  text-align: "center";
  display: flex;
  flex-wrap: wrap;
`;

const StatsContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  box-shadow: inset 0 0 2rem rgba(100, 0, 0, 0.3);
  animation: 1s linear 0s fade-out;
  @keyframes fade-out {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeaderStyle = styled.div`
text-align: center;
  flex: 1;
`;

  const spec = {
    drop(props, monitor, component){
      const { id } = monitor.getItem();
      if (props.list.some(stat => stat.id > 0)) {
      //if (props.list.some(stats => stats.id === id)) {
        alert("This stat has already been filled");
        return;
      }
    props.setDexterity(id);
    }
  }

  function collect(connect, monitor) {
    return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
    }
  }


//creates a drag and drop destination container
class DexterityBox extends React.Component {
  render() {
    const { list, canDrop, isOver, connectDropTarget } = this.props;

      return (
        <Container canDrop={canDrop} isOver={isOver}>
          {connectDropTarget(
            <div align="center" style={{ flex: 1, padding: "0rem", height: "14vh" }}>

                <HeaderStyle>
                  <h3>Dexterity</h3>
                </HeaderStyle>

              <List>
                {list.map(({ id, title }) => (
                  <StatsContainer key={id}>{title}</StatsContainer>
                ))}
              </List>
            </div>
          )}
        </Container>
      );

  }

}


export default DropTarget("STAT_ITEM", spec, collect)(DexterityBox);
