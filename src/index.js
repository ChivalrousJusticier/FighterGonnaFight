import React from "react";
import ReactDOM from 'react-dom';
// import { render } from "react-dom";
import { DndProvider } from 'react-dnd'
import HTML5Backend from "react-dnd-html5-backend";
// import {Character, Strength} from "./Main";
import Main from "./Main";
import CompletedStats from "./CompletedStats";
import './index.css';

// const text = "Begin!";

//@DragDropContext(HTML5Backend)
class App extends React.Component {
  render() {
    return(
      <>
      <DndProvider backend={HTML5Backend}>
      <Main />
      </DndProvider>
      </>
    )
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
// import { DndProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Source from './Source';
// import Target from './Target';
//
// import './index.css';
//
// class Container extends Component {
//   constructor() {
//     super();
//     this.state = {
//       droppedItem: {}
//     };
//     this.onDrop = this.onDrop.bind(this);
//   }
//
//   onDrop(item) {
//     this.setState({
//       droppedItem: item
//     });
//   }
//
//   render() {
//     return (
//       <DndProvider backend={HTML5Backend}>
//       <div className="App">
//         <div className="source">
//           <Source name="Block A" id="a" />
//           <Source name="Block B" id="b" />
//         </div>
//         <div className="destination">
//           <Target droppedItem={this.state.droppedItem} onDrop={this.onDrop} />
//         </div>
//       </div>
//       </DndProvider>
//     );
//   }
// }
// //const ContainerWrapper = DragDropContext(HTML5Backend)(Container);
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Container />, rootElement);
// //import React from 'react';
// //import ReactDOM from 'react-dom';
// //import './index.css';
// //import Example from './Example'
// //import { DndProvider } from 'react-dnd'
// //import HTML5Backend from 'react-dnd-html5-backend'
// //import Container from './Container';
// //import * as serviceWorker from './serviceWorker';
//
// //ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// //serviceWorker.unregister();
//
// // function App() {
// //   return (
// //     <div className="App">
// //       <DndProvider backend={HTML5Backend}>
// //         <Example />
// //       </DndProvider>
// //     </div>
// //   )
// // }
// //
// // const rootElement = document.getElementById('root')
// // ReactDOM.render(<App />, rootElement)
//
// //ReactDOM.render(<Container />, document.getElementById('root'));
