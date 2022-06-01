/* global fieldProperties, setAnswer, goToNextField, clearAnswer, setMetaData, getPluginParameter */

// var load_form_attributes = getPluginParameter('attributes');
// var attribute_array = load_form_attributes.split(',');
// var attribute_array = load_attributes
// console.log('Attributes ' + load_attributes.toString())
// var load_values = getPluginParameter('values')
// console.log('Values ' + load_values.toString())
// var values_array = (new Function("return [" + load_values+ "];")());
// var values_array = load_values

// Replace values of array with attribute names
var attribute_array = ['Religion', 'Tribe', 'Party', 'Actions-public', 'Actions-private', 'Promises'];
// Replace values of array with attribute values
// For text values
var values_array = [['Christian', 'Muslim'], ['Sukuma', 'Chagga'], ['CCM', 'Opposition'], ['Gave nothing to your community', 'Gave money to your community'], ['Gave you nothing', 'Gave you money'], ['Has promises but no plan', 'Has promises and a plan']];
// For image values uncomment the below and replace with the url to your images 
// Note: this only works online, if you want it to work offline, you'll need to store images
// locally and then use the path to the local image rather than the url.
// If you would like to use either an image or text, just use either the url string or regular string where appropriate.
// var values_array = [['https://example.com/image/christian.jpg', 'https://example.com/image/muslim.jpg'], ['https://example.com/image/sukuma.jpg', 'https://example.com/image/chagga.jpg'], ['https://example.com/image/ccm.jpg', 'https://example.com/image/opposition.jpg'], ['https://example.com/image/nothing.jpg', 'https://example.com/image/something.jpg'], ['https://example.com/image/you-nothing.jpg', 'https://example.com/image/you-something.jpg'], ['https://example.com/image/no-plan.jpg', 'https://example.com/image/plan.jpg']];
var buttons = document.querySelectorAll('input[name="opt"]')

if (attribute_array.length !== values_array.length) {
  alert("Your attributes array and values array do not match.");
}
var numbers_array = [];
for (var i = 0; i < attribute_array.length; i++) {
  numbers_array.push(i);
}

if (!sessionStorage.random_result) {
  sessionStorage.random_result = shuffle(numbers_array);
}

var random_result = sessionStorage.random_result.split(',');
console.log(random_result.toString())
    
// Replace the round number with round number you are on
fill_table(1);

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onchange = function () {
    // remove 'selected' class from a previously selected option (if any)
    var selectedOption = document.querySelector('.choice-container.selected')
    if (selectedOption) {
      selectedOption.classList.remove('selected')
    }
    this.parentElement.classList.add('selected') // add 'selected' class to the new selected option
    change.apply(this) // call the change() function and tell it which value was selected
  }
}

// Functions
function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Save the user's response (update the current answer)
function change () {
  setAnswer(this.value)
  // If the appearance is 'quick', then also progress to the next field
  if (fieldProperties.APPEARANCE.includes('quick') === true) {
    goToNextField()
  }
}

function fill_table(number) {
    
  var table_element = document.getElementById("conjoint_table_" + number);
  
  var label = "Rd_" + (number) + "_";
  
  // Rows
  for (var i = 0;i<random_result.length;i++) {
    var row_element = document.createElement("TR");
    
    // Row cells
    for (var j=0;j<3;j++) {
      var data_element = document.createElement("TD");
      
      var random_value = random_result[i];
      
      if (j !== 0) {
        var random_values_array = [];
        for (var x = 0; x < values_array[random_value].length; x++) {
          random_values_array.push(x);
        }
        var random_index = shuffle(random_values_array);
        var value = values_array[random_value];
        var attributeValue = value[random_index[0]];
        var text;

        // Conditional to check if value is string or url
        // Note: this is a simple check, if your data is more 
        // complex than use a regex.
        // Also, if you are doing it offline, this check will NOT work
        // you must instead write the conditional to check for a 
        // local file, likely in the file directory of device or tmp.
        // For example, instead of checking for 'http', you might check for 'file:'
        if (attributeValue.indexOf('http') !== -1) {
          text = document.createElement('img');
          text.src = attributeValue;
          text.height = '150' // height of image in pixels
          text.width = '150' // width of image in pixels
        } else {
          text = document.createTextNode(attributeValue);
        }
        
        // If you want to use different choice names in your embedded data, change the values below
        if (j === 1) {
          var choice = "A";
        } else {
          var choice = "B";
        }
        var new_label = label + choice + "_" + attribute_array[random_value];
        var metaDataStore = new_label + "|" + attributeValue;
        setMetaData(metaDataStore);
      } else {
        var text = document.createElement("B");
        var bolded_text = document.createTextNode(attribute_array[random_value]);

        text.appendChild(bolded_text);
      }
      
      data_element.appendChild(text); 
      row_element.appendChild(data_element);
    }
  
    table_element.appendChild(row_element);   
  }
  
}