

//generate a Fighter's stat - Roll 4 d6!
export default function randomStat(){
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
