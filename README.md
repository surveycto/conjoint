# Conjoint Analysis

![Default appearance for the 'conjoint' field plug-in](extras/conjoint.png)

## Description

This field plug-in is designed to help implement [Conjoint Analysis](https://en.wikipedia.org/wiki/Conjoint_analysis) a popular market research technique that helps determine how people value different attributes of a product or service. The plug-in seeks to provide an easy and convenient way to set up this within SurveyCTO.
[![Download now](extras/download-button.png)](https://github.com/surveycto/baseline-select_one/raw/master/baseline-select_one.fieldplugin.zip)

### Features



### Data format

This field plug-in supports the `text` field type. The field stores a pipe (|) separated list of the the options presented to the respondant and the choice selected. For example: 

`Bread,Bagel,Hero|Cheese,Cheddar,Mozzarella|Greens,Spinach,Arugala|Meat,Portobello,Roast beef|Sauce,Mustard,Mayonnaise|Veggie,Pickles,Pickles|Option 1`

Here, it means the options were presented as follows: 

| --- | Option 1 | Option 2 |
| --- | --- | --- |
| Bread | Bagel | Hero|
| Cheese | Cheddar | Mozzarella |
| Greens | Spinach | Arugala |
| Meat | Portobello | Roast beef |
| Sauce | Mustard | Mayonnaise |
| Veggie | Pickles | Pickles |

And the selected option was `Option 1`.

Each field will be presented this way.

## How to use

### Getting started

1. Download the sample form from this repo and upload it to your SurveyCTO server.
2. Download the conjoint.fieldplugin.zip file from this repo, and attach it to the test form on your SurveyCTO server.
3. Make sure to provide the correct parameters (see below).

### Parameters

| Key | Value |
| --- | --- |
| `attributes` | Comma separated list of attributes |
| `levels` | This should have two parts. The full string should include a pipe separated list of levels for each attribute. The levels for each attribute will be a comma separated list |
| `labels` | A comma separated list of labels. These will appear as table headers and as button labels. For now, these can only be two labels |
| `randomize` (Optional) | Indicates whether the attributes should be randomized or not. By default attributes are not randomized, they appear in a fixed order. Set this to `1` to have the attributes randomized |

### Examples

Examples of usage are: 

`custom-conjoint(attributes = ${attributes}, levels = ${levels_array}, labels=${labels})`


## More resources

* **Sample form**  
This form will help you explore the differences between this field plug-in and the default text field.  
[Download sample form](https://github.com/surveycto/baseline-select_one/raw/master/extras/test-form/test-form-package-baseline-select_one.zip)  

* **Developer documentation**  
Instructions and resources for developing your own field plug-ins.  
[https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)

* **User documentation**  
How to get started using field plug-ins in your SurveyCTO form.  
[https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html](https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html)
