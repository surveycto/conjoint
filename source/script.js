/* global fieldProperties, setAnswer, getPluginParameter, goToNextField, clearAnswer, setMetaData, getPluginParameter */

// Set number of choices
var numChoice = 1
var tempResult = ''

// Set colors
var DARK_GREY = '#555555'
var LIGHT_GREY = '#e7e7e7'
var GREEN = '#4caf50'
var BLUE = '#008cba'
var RED = '#fe0000'

// Get attributes from form definition
var loadFormAttributes = getPluginParameter('attributes')
// Get bypass value from form definition
var loadByPass = getPluginParameter('bypass')
// Get data format from form definition
var loadedDataFormat = getPluginParameter('data_format')
// Use 0 for string, 1 for numeric
if (loadedDataFormat == 'string') {
  var dataFormat = 0
} else {
  var dataFormat = 1
}
// Get randomize parameter from form definition
// Convert loaded attributes into an array
var attributeArray = loadFormAttributes.split(',')
// Get randomize parameter from form definition
var loadRandomizeOption = getPluginParameter('randomize')
// Check value of randomize 
if (loadRandomizeOption === 1) {
  var randomizeAttributes = true;
}
// var attributeArray = [' Bread ' , ' Cheese ' , ' Greens ' , ' Meat ' , ' Sauce ' , ' Veggie ' ];
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
// Get labels from form definition
var loadLabels = getPluginParameter('labels')
if (loadLabels == undefined) {
  var loadedLabels = ['Profile 1', 'Profile 2'] // Set default labels
} else {
  var loadedLabels = loadLabels.split(',')
}

//  Create buttons and add labels (from above) to them
var button1 = document.getElementById('button1')
button1.innerHTML = loadedLabels[0]
var button2 = document.getElementById('button2')
button2.innerHTML = loadedLabels[1]
// Create column header and add labels (from above) to them
var header1 = document.getElementById('header1')
header1.innerHTML = loadedLabels[0]
var header2 = document.getElementById('header2')
header2.innerHTML = loadedLabels[1]
// Create bypass button
var bypass = document.getElementById('byPassButton')
if (loadByPass == undefined) {
  bypass.style.display = 'none' // Hide bypass button
} else {
  bypass.style.display = 'block' // Show bypass button
  bypass.innerText = loadByPass
}

// Retrieve current answer
var currentAnswer = fieldProperties.CURRENT_ANSWER

// Perform the randomization and save it
for (var i = 1; i <= numChoice; i++) {
  if (currentAnswer != null) {
    recreateTable(i)
  } else {
    randomize(i)
  }
}

// Define Fisher-Yates shuffle
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
  var copiedArray = theArray.slice() // Copy the array so the original array is not modified
  var out = shuffle(copiedArray)
  return (out[0])
}

function randomize(i) {
  // Get table element
  var tableElement = document.getElementById('conjoint_table_' + i);

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
   
  var s1 = []
  var s2 = []
  for (var c = 0; c < attributeLevels.length; c++) {
    s1.push(shuffle_one(levels[c]))
    s2.push(shuffle_one(levels[c]))
  }

  // Create table
  for(var k = 1; k <= attributeOrder.length; k++) {
    var index = attributeOrder[k - 1] - 1
    var rowElement = document.createElement('tr')
    var labelCell = document.createElement('td')
    var label = document.createElement('strong')
    label.innerHTML = attributeArray[index]
    labelCell.appendChild(label)
    var option1Cell = document.createElement('td')
    var option1 = document.createTextNode(s1[index])
    option1Cell.appendChild(option1)
    var option2Cell = document.createElement('td');
    var option2 = document.createTextNode(s2[index])
    option2Cell.appendChild(option2)

    if(dataFormat == 0) { // Save as string
      k === 1 ? tempResult = attributeArray[index] + ',' + s1[index] + ',' + s2[index] + '|' : tempResult += attributeArray[index] + ',' + s1[index] + ',' + s2[index] + '|'
    } else { // Save as numeric
      k === 1 ? tempResult = (attributeArray.indexOf(attributeArray[index]) + 1) + ',' +(levels[index].indexOf(s1[index]) + 1) + ',' + (levels[index].indexOf(s2[index]) + 1) + '|' : tempResult += (attributeArray.indexOf(attributeArray[index]) + 1) + ',' +(levels[index].indexOf(s1[index]) + 1) + ',' + (levels[index].indexOf(s2[index]) + 1) + '|'
    }
  
    rowElement.appendChild(labelCell)
    rowElement.appendChild(option1Cell)
    rowElement.appendChild(option2Cell)

    tableElement.appendChild(rowElement)
  }
}

//  Handle click events on button 1
function addResult1() {
  var result = ''
  if(dataFormat == 0) {
    result = tempResult + loadedLabels[0]
  } else {
    result = tempResult + 1
  }
  setAnswer(result)
  button1.style.backgroundColor = GREEN
  button2.style.backgroundColor = BLUE
  bypass.style.backgroundColor = RED
}

// Handle click events on button 2
function addResult2() {
  var result = ''
  if(dataFormat == 0) {
    result = tempResult + loadedLabels[1]
  } else {
    result = tempResult + 2
  }
  setAnswer(result)
  button2.style.backgroundColor = GREEN
  button1.style.backgroundColor = BLUE
  bypass.style.backgroundColor = RED
}

// Handle click events on bypass button
function pass() {
  var result = ''
  if(dataFormat == 0) {
    result = tempResult + loadByPass
  } else {
    result = tempResult + 0
  }
  setAnswer(result)
  bypass.style.backgroundColor = GREEN
  button1.style.backgroundColor = BLUE
  button2.style.backgroundColor = BLUE
}

// If a there is already has a response create a table not to be edited
function recreateTable(i) {
  // Get table element
  var tableElement = document.getElementById('conjoint_table_' + i);
  // Keep the same answer for the result
  result = currentAnswer 
  // Keep the same answer for the result
  var currentAnswerArray = currentAnswer.split('|')

  for(var l = 0; l < currentAnswerArray.length; l++) {
    if (l === (currentAnswerArray.length - 1)) {
      if(currentAnswerArray[currentAnswerArray.length - 1] === loadedLabels[0]) {
        button1.innerHTML = loadedLabels[0]
        disableButtons()
        button1.style.backgroundColor = DARK_GREY
        button1.style.color = LIGHT_GREY
      } else if(loadByPass != undefined && currentAnswerArray[currentAnswerArray.length - 1] === loadByPass) {
        bypass.innerHTML = loadByPass
        disableButtons()
        bypass.style.backgroundColor = DARK_GREY
        bypass.style.color = LIGHT_GREY
      } else {
        button2.innerHTML = loadedLabels[1]
        // button2.innerHTML = 2
        disableButtons()
        button2.style.backgroundColor = DARK_GREY
        button2.style.color = LIGHT_GREY
      }
    } else {
      var currentItem = currentAnswerArray[l].split(',')
      var rowElement = document.createElement('tr')
      var labelCell = document.createElement('td')
      var label = document.createElement('strong')
      if(dataFormat == 0) {
        label.innerHTML = currentItem[0]
      } else {
        label.innerHTML = attributeArray[currentItem[0] - 1] 
      }
      labelCell.appendChild(label)
      var option1Cell = document.createElement('td')
      if(dataFormat == 0) {
        var option1 = document.createTextNode(currentItem[1])
      } else {
        var option1 = document.createTextNode(levels[l][currentItem[1]-1])
      }
      option1Cell.appendChild(option1)
      var option2Cell = document.createElement('td')
      if(dataFormat == 0) {
        var option2 = document.createTextNode(currentItem[2])
      } else {
        var option2 = document.createTextNode(levels[l][currentItem[2]-1])
      }
      option2Cell.appendChild(option2)
  
      rowElement.appendChild(labelCell)
      rowElement.appendChild(option1Cell)
      rowElement.appendChild(option2Cell)
  
      tableElement.appendChild(rowElement)
    }
  }
}

// Disable all buttons
function disableButtons() {
  button1.disabled = true;
  button2.disabled = true;
  bypass.disabled = true;
  button1.style.backgroundColor = LIGHT_GREY
  button2.style.backgroundColor = LIGHT_GREY
  bypass.style.backgroundColor = LIGHT_GREY
  button1.style.color = DARK_GREY
  button2.style.color = DARK_GREY
  bypass.style.color = DARK_GREY
}