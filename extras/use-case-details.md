# Sample form use case details

This sample form demonstrates how to use the conjoint field plug-in to ease implementation of conjoint (discrete choice) analysis within SurveyCTO. Our example explores preferences relating to sandwiches.

Our sandwiches are made up of:

1. Bread
2. Protein
3. Veggies

These categories are what we refer to as **attributes**. These are the features or characteristics of a product or service that can vary. You can have a number of options for each attribute. For example, you can have different types of **Bread**: 

1. Bagel
2. Hero
3. Roll
4. Sliced white
5. Tortilla
6. Lettuce wrap

These options are referred to as **levels**. Levels are the different variations or options for each attribute. Each attribute has one or more levels. The levels for **Protein** are:

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

As you can see, the number of *levels* for each attribute don’t have to be the same. In the form, we define attributes and the possible levels for each attribute in [*calculate* fields](https://docs.surveycto.com/02-designing-forms/01-core-concepts/03zb.field-types-calculate.html). We then pass these to the field plug-in which puts together combinations of attributes at specific levels to create product profiles. For each field, the plug-in randomly displays two profiles and you can select the preferred option using the buttons. Once a selection is confirmed and you move to the next screen, you won’t be able to edit your choice (the buttons are disabled). 
