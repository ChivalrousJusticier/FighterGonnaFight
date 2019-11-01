import React from 'react';
import './App.css';
var stats = [];
var text = "<p> Unassigned Stats </p> <div class=\"row\">";
var text2 = "<p> Drag stats to desired category below </p><br />  <div class=\"row2\">";
var text3 = " <p id=\"space\"> <div class=\"row\">";

//stats.Length = 5;
var x = Math.floor((Math.random() * 20) +1);

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
  x = fourD6.reduce((a, b) => a + b);

return x;
}

function setStats(){

  for(var i=0; i<6; i++){
    stats.push(randomStat());
    var titles = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    text += "<div class=\"column\">" + stats[i] + "</div></p>";
    text2 += "<div class= \"column2\">" + titles[i] + "</div></p>";
    text3 += "<div class= \"" + titles[i] + "\"></div></p>";
  }
  text += "</div><br />";
  document.getElementById("demo").innerHTML = text;
  text2 += "</div>"
  document.getElementById("next").innerHTML = text2;
  text3 += "</div>"
  document.getElementById("again").innerHTML = text3;
}


function App() {
  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">

        <h1>
          Fighter Gonna Fight
        </h1>

      </header>
    </div>



  <div>
  <p id="demo"> Roll your fighter's stats!

  <br />
  <button onClick={setStats}>ROLL</button></p>
  </div>
  <div>
    <p id="next"> hi </p>
    </div>
    <div>
      <p id="again"> hi </p>
      </div>

  </React.Fragment>
);
}

//  stats.forEach(RandomStat());


export default App;
