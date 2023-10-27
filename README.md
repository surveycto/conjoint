# Conjoint Analysis

![Default appearance for the 'conjoint' field plug-in](extras/conjoint.png)

## Description

This field plug-in is designed to help implement [conjoint analysis](https://en.wikipedia.org/wiki/Conjoint_analysis).

(Add a brief summary of what conjoint analysis is, and how this field plug-in helps.)

[![Download now](extras/beta-release-download.jpg)](https://github.com/surveycto/conjoint/blob/master/conjoint.fieldplugin.zip)

### Features

* Define various features (attributes) and their different possible states or degrees (levels). (See an example [here](extras/use-case-details.md).)
* Generate profiles consisting of random combinations of attribute levels based on the defined features.
* Randomize the order in which the attributes are displayed.
* Restrict changing answer once recorded to prevent bias.

For more details see the Support Center Guide [How to conduct Conjoint Analysis in SurveyCTO](https://support.surveycto.com/hc/en-us/articles/19564034894867).

### Data format

The field stores a pipe (`|`) separated list of the ordinal representations of the options, as defined in the form. These are mapped to what is presented to the respondant and the choice selected. For example:

(What is each item in the list? And what do the numbers mean? And why is the 2 at the end by itself?)

    1,3,6|2,3,5|3,6,1|2

(What's the point of starting with 1, 2, and 3 in each item of the list if those are always going to be the same? Instead, I would have the data format be like this:

    3,3,6|6,5,1|2

Here is the string version:

    Roll,Turkey,Bean sprouts|Lettuce wrap,Egg,Tomato|Profile 2

That way, it is clear that the first item in the list is the first profile, the second item in the list is the second profile, and the third item in the list is which profile was selected.

)

Here, it means the options were presented as follows: 

|  | Profile 1 | Profile 2 |
| --- | --- | --- |
| Bread | Roll | Lettuce wrap|
| Protein | Turkey | Egg |
| Veggie | Bean sprouts | Tomato |

And the selected option was `Profile 2`.

You can also store a `string` representation of the options using the `data_format` parameter. In this example, the data will be stored as: 

`Bread,Roll,Lettuce wrap|Protein,Turkey,Egg|Veggie,Bean sprouts,Tomato|Profile 2`

Each field will be presented this way.

## How to use

### Getting started

1. Download the [sample form](https://github.com/surveycto/conjoint/blob/master/extras/Sample%20form%20Conjoint%20Analysis.xlsx) from this repo and upload it to your SurveyCTO server.
2. Download the [conjoint.fieldplugin.zip file](https://github.com/surveycto/conjoint/blob/master/conjoint.fieldplugin.zip) from this repo, and attach it to the test form on your SurveyCTO server.
3. Make sure to provide the correct parameters (see below).

### Parameters

| Key | Value |
| --- | --- |
| `attributes` | Comma-separated list of attributes. |
| `levels` | This consists of two parts. The full string should be a pipe-separated list, with an item for each attribute. Each item in that list should be a comma-separated list of levels for that attribute. |
| `labels` (Optional) | A comma-separated list of labels. These are used as the table headers and button labels. For now, there can only be two labels, one for each possible choice. The default labels are *Profile 1* and *Profile 2*. |
| `randomize` (Optional) | Indicates whether the attributes should be randomized or not (How would they be randomized? Shouldn't they always be randomized?). By default, attributes are not randomized, they appear in a fixed order. Set this to `1` to have the attributes randomized. |
| `bypass` (Optional) | Provides an option for users to choose none of the presented profiles by using a button. Initially, this button is hidden. However, when a value is assigned, this will trigger the display of a button labeled with the assigned value. (What does the value of this signify? Is it the value assigned to the field when it is bypassed?) |
| `data_format` (Optional) | The default behavior of the field plug-in is for the field value to store the ordinal (numeric) values of the attributes and levels. However, if you use this parameter to specify `data_format = 'string'`, then the field plug-in will store the string values instead, as supplied by the `attributes` and `levels` parameters. |

(There should be a lot more detail on the format of attributes, and levels, including how they relate to each other.)

### Examples

Here is an example *appearance* for your *text* field that uses this field plug-in: 

    custom-conjoint(attributes = ${attributes},
    levels = ${levels_array},
    labels=${labels},
    bypass='None of the above')

(I would not use field references, but write everything out, so the user knows what everything should really look like without having to open the form/)

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
