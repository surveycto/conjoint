/* global fieldProperties, setAnswer, getPluginParameter, goToNextField, clearAnswer, setMetaData, getPluginParameter */

/*
 * SurveyCTO Conjoint Analysis Field Plugin
 * 
 * This script handles the logic for a conjoint analysis survey question.
 * It loads attributes and levels from the form definition, randomizes them (with constraints),
 * and presents them to the user for selection.
 */

// --- Configuration & Global Variables ---

// Set number of choices available to the user
var numChoice = 1

// Holds the temporary result string before saving
var tempResult = ''

// Holds the full result including metadata (useful for rebuilding the table later)
var stringResult = ''

// Define Color Constants for UI Elements
var DARK_GREY = '#555555'
var LIGHT_GREY = '#e7e7e7'
var GREEN = '#4caf50'
var BLUE = '#008cba'
var RED = '#fe0000'

// --- Load Plugin Parameters ---

// Get attributes list from the form definition (comma-separated identifying names)
var loadFormAttributes = getPluginParameter('attributes')

// Get bypass value from form definition (optional) - used for "None of the above" or "Opt-out"
var loadByPass = getPluginParameter('bypass')

// Get data format preference from form definition: 'string' or 'numeric'
var loadedDataFormat = getPluginParameter('data_format')

// Determine data format code: 0 for string, 1 for numeric
// String format saves the actual text values. Numeric format saves the 1-based indices.
if (loadedDataFormat == 'string') {
  var dataFormat = 0
} else {
  var dataFormat = 1
}

// Convert loaded attributes string into an array
var attributeArray = loadFormAttributes.split(',')

// Get randomize parameter from form definition (1 for yes, otherwise no)
var loadRandomizeOption = getPluginParameter('randomize')

// Check value of randomize option
var randomizeAttributes = false
if (loadRandomizeOption === 1) {
  randomizeAttributes = true;
}

// Get attribute levels from form definition. 
// Expected format: levels1|levels2|levels3. . .  
// Each 'levelsX' corresponds to an attribute and is a comma-separated list of values.
var loadAttributeLevels = getPluginParameter('levels')

// Get number of top-most attributes to fix in place (default 0)
// If this is set (e.g. to 1), the first X attributes will not be shuffled.
// The remaining attributes will be randomized if randomize=1.
var loadFixedAttributes = getPluginParameter('fixed_attributes')
var numFixedAttributes = 0
if (loadFixedAttributes) {
  numFixedAttributes = parseInt(loadFixedAttributes, 10);
  if (isNaN(numFixedAttributes)) {
    numFixedAttributes = 0;
  }
}

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
var loadedLabels;
if (loadLabels == undefined) {
  loadedLabels = ['Profile 1', 'Profile 2'] // Set default labels
} else {
  loadedLabels = loadLabels.split(',')
}

// --- UI Initialization ---

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
  bypass.style.display = 'none' // Hide bypass button if no label provided
} else {
  bypass.style.display = 'block' // Show bypass button
  bypass.innerText = loadByPass
}

// --- Main Execution Logic ---

// Retrieve current answer (if returning to this field)
var currentAnswer = fieldProperties.CURRENT_ANSWER
var metadata = getMetaData() // Retrieve metadata associated with the field

// Perform the randomization and save it, or restore existing state
for (var i = 1; i <= numChoice; i++) {
  if (currentAnswer != null) {
    // If there is an existing answer, recreate the table from it
    recreateTable(i)
  } else {
    // Otherwise, generate a new randomized table
    randomize(i)
  }
}

// --- Helper Functions ---

// Define Fisher-Yates shuffle algorithm
// Randomly shuffles an array in place
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
// Returns a single random element from the array
function shuffle_one(theArray) {
  var copiedArray = theArray.slice() // Copy the array so the original array is not modified
  var out = shuffle(copiedArray)
  return (out[0])
}

/*
 * Randomize Function
 * Core logic to generate the conjoint profiles.
 * It determines the order of attributes and selects random levels for each.
 */
function randomize(i) {
  // Get table element to populate
  var tableElement = document.getElementById('conjoint_table_' + i);

  // Initialize array for attribute ordering (1-based index)
  // Example: [1, 2, 3, 4, 5, 6]
  var attributeOrder = []
  for (var a = 1; a <= attributeArray.length; a++) {
    attributeOrder.push(a)
  }

  // Active if attributes are to be shown randomly. 
  if (randomizeAttributes) {
    // CUSTOM LOGIC: Fix the first X attributes, randomize the rest.
    var numFixed = numFixedAttributes; // Number of attributes to keep fixed at the top (e.g. 1 means index 0 is fixed)

    // Ensure we have enough attributes to split
    if (numFixed < attributeOrder.length) {
      // Split the array into fixed and shuffled parts
      var fixedPart = attributeOrder.slice(0, numFixed);
      var shuffledPart = attributeOrder.slice(numFixed);

      // Shuffle only the remaining attributes
      shuffle(shuffledPart);

      // Combine them back together: Fixed on top, shuffled below
      attributeOrder = fixedPart.concat(shuffledPart);
    } else {
      // Fallback if numFixed covers the whole array (no shuffling needed effectively, or shuffle all if 0)
      // If numFixed is >= length, order is preserved as is. 
    }

    // Debugging string to see the order
    var attributeOrderString = attributeOrder.join(',');
  }

  // Select random levels for each attribute for Profile 1 (s1) and Profile 2 (s2)
  var s1 = []
  var s2 = []
  for (var c = 0; c < attributeLevels.length; c++) {
    s1.push(shuffle_one(levels[c]))
    s2.push(shuffle_one(levels[c]))
  }

  // Create table rows based on the determined attribute order
  for (var k = 1; k <= attributeOrder.length; k++) {
    // Get the actual attribute index from our ordered list
    // attributeOrder contains 1-based indices, so subtract 1 for 0-based array access
    var index = attributeOrder[k - 1] - 1

    var rowElement = document.createElement('tr')

    // Attribute Label Column
    var labelCell = document.createElement('td')
    var label = document.createElement('strong')
    label.innerHTML = attributeArray[index]
    labelCell.appendChild(label)

    // Profile 1 Option Column
    var option1Cell = document.createElement('td')
    var option1 = document.createTextNode(s1[index])
    option1Cell.appendChild(option1)

    // Profile 2 Option Column
    var option2Cell = document.createElement('td');
    var option2 = document.createTextNode(s2[index])
    option2Cell.appendChild(option2)

    // Build the result strings
    // Format: AttributeName,Level1,Level2|AttributeName,Level1,Level2|...
    // Note: Separator logic (adding '|') is applied after each item
    var currentString = attributeArray[index] + ',' + s1[index] + ',' + s2[index] + '|'

    // Build Temp Result (depends on dataFormat)
    var currentTemp = ''
    if (dataFormat == 0) { // Save as string
      currentTemp = currentString
    } else { // Save as numeric (1-based indices)
      currentTemp = (attributeArray.indexOf(attributeArray[index]) + 1) + ',' + (levels[index].indexOf(s1[index]) + 1) + ',' + (levels[index].indexOf(s2[index]) + 1) + '|'
    }

    // Append to global result variables using ternary to handle the first element case (though logic implies simple concatenation works if initialized empty, preserving original ternary style for safety)
    if (k === 1) {
      stringResult = currentString
      tempResult = currentTemp
    } else {
      stringResult += currentString
      tempResult += currentTemp
    }

    // Append cells to row
    rowElement.appendChild(labelCell)
    rowElement.appendChild(option1Cell)
    rowElement.appendChild(option2Cell)

    // Append row to table
    tableElement.appendChild(rowElement)
  }
}

// Log results for debugging
console.log('String result: ' + stringResult)
console.log('Temp result: ' + tempResult)

// --- Event Handlers ---

//  Handle click events on button 1 (Profile 1 Selected)
function addResult1() {
  var result = ''
  if (dataFormat == 0) {
    result = tempResult + loadedLabels[0] // Append label name
  } else {
    result = tempResult + 1 // Append '1'
  }
  setMetaData(stringResult) // Save metadata re-creation info
  setAnswer(result)         // Save final answer

  // Visual feedback
  button1.style.backgroundColor = GREEN
  button2.style.backgroundColor = BLUE
  bypass.style.backgroundColor = RED
}

// Handle click events on button 2 (Profile 2 Selected)
function addResult2() {
  var result = ''
  if (dataFormat == 0) {
    result = tempResult + loadedLabels[1]
  } else {
    result = tempResult + 2
  }
  setMetaData(stringResult)
  setAnswer(result)

  // Visual feedback
  button2.style.backgroundColor = GREEN
  button1.style.backgroundColor = BLUE
  bypass.style.backgroundColor = RED
}

// Handle click events on bypass button (None/Opt-out)
function pass() {
  var result = ''
  if (dataFormat == 0) {
    result = tempResult + loadByPass
  } else {
    result = tempResult + 0
  }
  setMetaData(stringResult)
  setAnswer(result)

  // Visual feedback
  bypass.style.backgroundColor = GREEN
  button1.style.backgroundColor = BLUE
  button2.style.backgroundColor = BLUE
}

// If a there is already has a response create a table not to be edited
// This reconstructs the view for a previously answered question
function recreateTable(i) {
  // Get table element
  var tableElement = document.getElementById('conjoint_table_' + i);
  // Keep the same answer for the result
  result = currentAnswer
  // Parse the answer string
  var currentAnswerArray = currentAnswer.split('|')
  var metaDataArray = metadata.split('|')

  for (var l = 0; l < currentAnswerArray.length; l++) {
    // The last element contains the choice selection (Label1, Label2, or Bypass)
    if (l === (currentAnswerArray.length - 1)) {
      if (currentAnswerArray[currentAnswerArray.length - 1] === loadedLabels[0]) {
        button1.innerHTML = loadedLabels[0]
        disableButtons()
        button1.style.backgroundColor = DARK_GREY
        button1.style.color = LIGHT_GREY
      } else if (loadByPass != undefined && currentAnswerArray[currentAnswerArray.length - 1] === loadByPass) {
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
      // Reconstitute table rows
      var currentItem = currentAnswerArray[l].split(',')
      var currentMetaItem = metaDataArray[l].split(',')
      var rowElement = document.createElement('tr')
      var labelCell = document.createElement('td')
      var label = document.createElement('strong')
      if (dataFormat == 0) {
        label.innerHTML = currentItem[0]
      } else {
        label.innerHTML = currentMetaItem[0] //attributeArray[currentItem[0] - 1] 
      }
      labelCell.appendChild(label)
      var option1Cell = document.createElement('td')
      if (dataFormat == 0) {
        var option1 = document.createTextNode(currentItem[1])
      } else {
        var option1 = document.createTextNode(currentMetaItem[1]) //(levels[l][currentItem[1]-1])
      }
      option1Cell.appendChild(option1)
      var option2Cell = document.createElement('td')
      if (dataFormat == 0) {
        var option2 = document.createTextNode(currentItem[2])
      } else {
        var option2 = document.createTextNode(currentMetaItem[2]) //(levels[l][currentItem[2]-1])
      }
      option2Cell.appendChild(option2)

      rowElement.appendChild(labelCell)
      rowElement.appendChild(option1Cell)
      rowElement.appendChild(option2Cell)

      tableElement.appendChild(rowElement)
    }
  }
}

// Disable all buttons (used when answer is locked)
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