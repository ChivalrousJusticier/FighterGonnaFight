// import React from 'react';
// import Stats from './Stats'
// //import ReactDOM from 'react-dom'
// import Example from './example'
// import { DndProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
// import './App.css';
//  import {randomStat} from './randomStat'
// //
// //
// var stats = [];
// var text = "<p> Unassigned Stats </p> <div class=\"row\">";
// var text2 = "<p> Drag stats to desired category below </p><br />  <div class=\"row2\">";
// var text3 = " <p id=\"space\"> <div class=\"row\">";
//
//
//
// function setStats(){
//
//   for(var i=0; i<6; i++){
//     stats.push(randomStat());
//     var titles = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
//     //text += "<div class=\"column\">" + stats[i] + "</div></p>";
//     text += "<div>" + <Stats name="joe"/> + "</div></p>";
//     text2 += "<div class= \"column2\">" + titles[i] + "</div></p>";
//     text3 += "<div class= \"" + titles[i] + "\"></div></p>";
//   }
//   text += "</div><br />";
//   document.getElementById("demo").innerHTML = text;
//   text2 += "</div>"
//   document.getElementById("next").innerHTML = text2;
//   text3 += "</div>"
//   document.getElementById("again").innerHTML = text3;
// }
// <button onClick={setStats}>ROLL</button></p>

// function App() {
//   return (
//     <DndProvider backend={HTML5Backend}>
//     <React.Fragment>
//     <div className="App">
//       <header className="App-header">
//
//         <h1>
//           Fighter Gonna Fight
//         </h1>
//
//       </header>
//     </div>
//
//
//
//   <div>
//   <p id="demo"> Roll your fighter's stats!</p>
//
//   <br />
//
//   <Example />
//   </div>
//   <div>
//     <p id="next"> hi </p>
//     </div>
//     <div>
//       <p id="again"> hi </p>
//       </div>
//
//   </React.Fragment>
//   </DndProvider>
// );
