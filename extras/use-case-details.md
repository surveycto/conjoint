# Sample form use case details

(Is there a link to this anywhere?)

(This doc does an excellent job starting to explain conjoint analysis, but I think it can go a bit further, and discuss how the attributes and levels actually are used.)

This sample form demonstrates how to use the conjoint field plug-in to ease implementation of conjoint (discrete choice) analysis within SurveyCTO. Our example explores preferences relating to sandwiches.

Our sandwiches are made up of:

1. Bread
2. Protein
3. Veggies

These categories are what we refer to as **attributes**. You can have a number of options for each attribute. For example, you can have different types of **Bread**: 

1. Bagel
2. Hero
3. Roll
4. Sliced white
5. Tortilla
6. Lettuce wrap

These options are referred to as **levels**. Each attribute has one or more levels. The levels for **Protein** are:

1. Ham
2. Roast beef
3. Turkey
4. Portobello
5. Egg
6. Bean patty

And the levels for **Veggies** are:

1. Tomato
2. Jalapenos
3. Roasted peppers
4. Onion
5. Olives
6. Bean sprouts
7. Pickles
8. Avocado

As you can see, the *levels* for each attribute don’t have to be the same number (what?). In the form, we define attributes and the possible levels for each attribute in [*calculate* fields](https://docs.surveycto.com/02-designing-forms/01-core-concepts/03zb.field-types-calculate.html). We then pass these to the field plug-in. For each field, the plug-in randomly displays a combination of attributes and you can select the preferred option using the buttons. Once a selection is confirmed and you move to the next screen, you won’t be able to edit your choice (the buttons are disabled). 
