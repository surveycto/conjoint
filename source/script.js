/* global fieldProperties, setAnswer, getPluginParameter, goToNextField, clearAnswer, setMetaData, getPluginParameter */

// Set number of choices
var numChoice = 1
var tempResult = ""

// Get attributes from form definition
var loadFormAttributes = getPluginParameter('attributes')
// Get attributes from form definition
var loadByPass = getPluginParameter('bypass')

// Convert loaded attributes into an array
var attributeArray = loadFormAttributes.split(',')
// Get randomize parameter from form definition
var loadRandomizeOption = getPluginParameter('randomize')
// Check value of randomize 
if (loadRandomizeOption === 1) {
  var randomizeAttributes = true;
}
// var attributeArray = [" Bread " , " Cheese " , " Greens " , " Meat " , " Sauce " , " Veggie " ];
// Get attribute levels from form. 
var loadAttributeLevels = getPluginParameter('levels') // levels1 | levels2 |levels3. .  
// Create array of levels resulting in [levels1, levels2, levels3. . .]
var attributeLevels = loadAttributeLevels.split('|') 
// Store an array of arrays - each level will have an array for that level
var levels = []
// Create array variables for each set of levels
for (var b = 0; b < attributeLevels.length; b++) {
  levels[b] = attributeLevels[b].split(',')
}

var loadLabels = getPluginParameter('labels')
if (loadLabels == undefined) {
  var loadedLabels = ['Profile 1', 'Profile 2']
} else {
  var loadedLabels = loadLabels.split(',')
}

var button1 = document.getElementById('button1')
button1.innerHTML = loadedLabels[0]
var button2 = document.getElementById('button2')
button2.innerHTML = loadedLabels[1]
var header1 = document.getElementById('header1')
header1.innerHTML = loadedLabels[0]
var header2 = document.getElementById('header2')
header2.innerHTML = loadedLabels[1]

var bypass = document.getElementById('byPassButton')
if (loadByPass == undefined) {
  bypass.style.display = 'none'
} else {
  bypass.style.display = 'block'
  bypass.innerText = loadByPass
}

var currentAnswer = fieldProperties.CURRENT_ANSWER

// Arrays containing all attribute levels
// var breadArray = [" Bagel " , " Hero " , " Roll " , " Sliced white " , " Tortilla " , " Lettuce wrap " ]
// var cheeseArray = [" Cheddar " , " Gouda " , " Jack " , " Mozzarella " , " Provolone " , " None " ]
// var greenArray = [" Arugala " , " Green lettuce " , " Red lettuce " , " Spinach " ]
// var meatArray = [" Ham " , " Roast beef " , " Turkey " , " Portobello " , " Egg " , " Bean patty " ]
// var sauceArray = [" Hot sauce " , " Mayonnaise " , " Mustard " , " Oil and vinegar " , " None " ]
// var veggieArray = [" Tomato " , " Jalapenos " , " Roasted peppers " , " Onion " , " Olives " , " Bean sprouts " , " Pickles " , " Avocado " ]

// Fisher-Yates shuffle
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

// Shuffle an array and choose the first entry
function shuffle_one(theArray) {
  var out = shuffle(theArray)
  var out = out[0]
  return (out)
}

function randomize(i) {
  // Get table element
  var tableElement = document.getElementById("conjoint_table_" + i);

  // var attributeOrder = [1 ,2 ,3 ,4 ,5 ,6]
  // Get order of attributes
  var attributeOrder = [] // Array to store order of attributes
  // Generate order of attributes. By default this is a fixed order
  for (var a = 1; a <= attributeArray.length; a++) {
    attributeOrder.push(a)
  } // Will result in ordered array starting at 1 upto total number of attributes

  // Active if attributes are to be shown randomly. 
  if(randomizeAttributes) {
    shuffle(attributeOrder)
  }
  
  // var s1 = [ shuffle_one ( breadArray ) , shuffle_one ( cheeseArray ) , shuffle_one ( greenArray ) , shuffle_one ( meatArray ) , shuffle_one ( sauceArray ) , shuffle_one ( veggieArray ) ]
  // var s2 = [ shuffle_one ( breadArray ) , shuffle_one ( cheeseArray ) , shuffle_one ( greenArray ) , shuffle_one ( meatArray ) , shuffle_one ( sauceArray ) , shuffle_one ( veggieArray ) ] 
  
  var s1 = []
  var s2 = []
  for (var c = 0; c < attributeLevels.length; c++) {
    s1.push(shuffle_one(levels[c]))
    s2.push(shuffle_one(levels[c]))
  }

  for(var k = 1; k <= attributeOrder.length; k++) {
    var index = attributeOrder[k - 1] - 1
    var rowElement = document.createElement("TR");
    var labelCell = document.createElement("TD");
    var label = document.createElement("b");
    label.innerHTML = attributeArray[index]
    labelCell.appendChild(label)
    var option1Cell = document.createElement("TD");
    var option1 = document.createTextNode(s1[index])
    option1Cell.appendChild(option1)
    var option2Cell = document.createElement("TD");
    var option2 = document.createTextNode(s2[index])
    option2Cell.appendChild(option2)

    k === 1 ? tempResult = attributeArray[index] + ',' + s1[index] + ',' + s2[index] + '|' : tempResult += attributeArray[index] + ',' + s1[index] + ',' + s2[index] + '|'

    rowElement.appendChild(labelCell)
    rowElement.appendChild(option1Cell)
    rowElement.appendChild(option2Cell)

    tableElement.appendChild(rowElement)
  }

  // setMetaData(result)
  // console.log(result)
}

// Perform the randomization and save it
for (var i = 1; i <= numChoice; i++) {
  if (currentAnswer != null) {
    recreateTable(i);
  } else {
    randomize(i);
  }
}

function addResult1() {
  var result = ""
  result = tempResult + loadedLabels[0]
  setAnswer(result)
  button1.style.backgroundColor = "#4CAF50"
  button2.style.backgroundColor = "#008CBA"
  bypass.style.backgroundColor = "#FE0000"
  // goToNextField()
}

function addResult2() {
  var result = ""
  result = tempResult + loadedLabels[1]
  setAnswer(result)
  button2.style.backgroundColor = "#4CAF50"
  button1.style.backgroundColor = "#008CBA"
  bypass.style.backgroundColor = "#FE0000"
  // goToNextField()
}

function pass() {
  var result = ""
  result = tempResult + loadByPass
  setAnswer(result)
  bypass.style.backgroundColor = "#4CAF50"
  button1.style.backgroundColor = "#008CBA"
  button2.style.backgroundColor = "#008CBA"
  // goToNextField()
}

// If a there is already has a response create a table not to be edited
function recreateTable(i) {
  // Get table element
  var tableElement = document.getElementById("conjoint_table_" + i);
  // Keep the same answer for the result
  result = currentAnswer 
  // Keep the same answer for the result
  var currentAnswerArray = currentAnswer.split('|')

  for(var l = 0; l < currentAnswerArray.length; l++) {
    if (l === (currentAnswerArray.length - 1)) {
      if(currentAnswerArray[currentAnswerArray.length - 1] === loadedLabels[0]) {
        button1.innerHTML = loadedLabels[0]
        disableButtons()
      } else {
        button2.innerHTML = loadedLabels[1]
        disableButtons()
      }
    } else {
      var currentItem = currentAnswerArray[l].split(',')
      var rowElement = document.createElement("TR");
      var labelCell = document.createElement("TD");
      var label = document.createElement("b");
      label.innerHTML = currentItem[0]
      labelCell.appendChild(label)
      var option1Cell = document.createElement("TD");
      var option1 = document.createTextNode(currentItem[1])
      option1Cell.appendChild(option1)
      var option2Cell = document.createElement("TD");
      var option2 = document.createTextNode(currentItem[2])
      option2Cell.appendChild(option2)
  
      rowElement.appendChild(labelCell)
      rowElement.appendChild(option1Cell)
      rowElement.appendChild(option2Cell)
  
      tableElement.appendChild(rowElement)
    }
  }
}

// Perform the randomization and save it
// for (var i = 1; i <= numChoice; i++) {
//   randomize(i);
// }

// function addResult1() {
//   var result = ""
//   result += loadedLabels[0]
//   setAnswer(result)
//   button1.style.backgroundColor = "#4CAF50"
//   button2.style.backgroundColor = "#008CBA"
//   // goToNextField()
// }

function disableButtons() {
  button1.disabled = true;
  button2.disabled = true;
  bypass.disabled = true;
  button1.style.backgroundColor = "#e7e7e7"
  button2.style.backgroundColor = "#e7e7e7"
  bypass.style.backgroundColor = "#e7e7e7"
  button1.style.color = "#555555"
  button2.style.color = "#555555"
  bypass.style.color = "#555555"
}