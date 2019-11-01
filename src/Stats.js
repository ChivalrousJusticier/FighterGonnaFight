import React from "react";
import { DragSource } from "react-dnd";
import styled from "styled-components";

const Container = styled.div`

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: inset 0 0 2rem rgba(0, 0, 100, 0.3);
  padding: 1rem; //Leave this at 1rem
  &:hover {
    background-color: ${p =>
      p.isDragging ? "rgba(100, 0, 0, 0.5)" : "rgba(0, 0, 100, 0.5)"};
  }
`;


const statSource = {
  beginDrag(props, monitor){
    const item = { id: props.id };
    return item;
  }
};

function collect(connect, monitor) {
  return{
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
};
}

class Stats extends React.Component {
  render() {
    const { title, isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div align="center" style={{margin: "0rem", padding: "0.5rem"}}>
        <Container isDragging={isDragging}>{title}</Container>
      </div>
    );
  }
}

export default DragSource("STAT_ITEM", statSource, collect)(Stats);
