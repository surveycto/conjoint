# Conjoint Analysis

![Default appearance for the 'conjoint' field plug-in](extras/conjoint.png)

## Description

This field plug-in is designed to help implement [conjoint analysis](https://en.wikipedia.org/wiki/Conjoint_analysis).

[![Download now](extras/beta-release-download.jpg)](https://github.com/surveycto/conjoint/blob/master/conjoint.fieldplugin.zip)

### Features

* Define various features (attributes) and their different possible states or degrees (levels).
* Generates profiles consisting of random combinations of attribute levels.
* Allows for randomization of the order in which the attributes should be displayed.
* Restricts modifications to answers once recorded to prevent bias.

For more details see the Support Center Guide on [how to conduct Conjoint Analysis in SurveyCTO](https://support.surveycto.com/hc/en-us/articles/19564034894867).

### Data format

This field plug-in supports the `text` field type. The field stores a pipe (|) separated list of the the options presented to the respondant and the choice selected. For example: 

`Bread,Bagel,Hero|Cheese,Cheddar,Mozzarella|Greens,Spinach,Arugala|Protein,Portobello,Roast beef|Sauce,Mustard,Mayonnaise|Veggie,Pickles,Pickles|Option 1`

Here, it means the options were presented as follows: 

|  | Option 1 | Option 2 |
| --- | --- | --- |
| Bread | Bagel | Hero|
| Cheese | Cheddar | Mozzarella |
| Greens | Spinach | Arugala |
| Protein | Portobello | Roast beef |
| Sauce | Mustard | Mayonnaise |
| Veggie | Pickles | Pickles |

And the selected option was `Option 1`.

Each field will be presented this way.

## How to use

### Getting started

1. Download the [sample form](https://github.com/surveycto/conjoint/blob/master/extras/Sample%20form%20Conjoint%20Analysis.xlsx) from this repo and upload it to your SurveyCTO server.
2. Download the [conjoint.fieldplugin.zip file](https://github.com/surveycto/conjoint/blob/master/conjoint.fieldplugin.zip) from this repo, and attach it to the test form on your SurveyCTO server.
3. Make sure to provide the correct parameters (see below).

### Parameters

| Key | Value |
| --- | --- |
| `attributes` | Comma separated list of attributes. |
| `levels` | This should have two parts. The full string should include a pipe separated list of levels for each attribute. The levels for each attribute will be a comma separated list. |
| `labels` (Optional) | A comma separated list of labels. These will appear as table headers and as button labels. For now, there can only be two labels. The default labels are _Porfile 1_ and _Profile 2_. |
| `randomize` (Optional) | Indicates whether the attributes should be randomized or not. By default attributes are not randomized, they appear in a fixed order. Set this to `1` to have the attributes randomized. |
| `bypass` (Optional) | Provides an option for users to choose none of the presented profiles by using a button. Initially, this button is hidden. However, when a value is assigned, this will trigger the display of a button labeled with the assigned value. |

### Examples

Examples of usage are: 

`custom-conjoint(attributes = ${attributes}, levels = ${levels_array}, labels=${labels}, bypass='None of the above')`


## More resources

* **Sample form**  
This form will help you explore the features in this field plug-in.  
[Download sample form](https://github.com/surveycto/conjoint/blob/master/extras/Sample%20form%20Conjoint%20Analysis.xlsx)  

* **Developer documentation**  
Instructions and resources for developing your own field plug-ins.  
[https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)

* **User documentation**  
How to get started using field plug-ins in your SurveyCTO form.  
[https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html](https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html)
