# Sample form use case details

This sample form demonstrates how to use the conjoint field plug-in to ease implementation of conjoint (discrete choice) analysis within SurveyCTO. Our example explores preferences relating to sandwiches. A sandwich has is made up of:



1. Bread
2. Meat
3. Veggies

These are what we refer to as **attributes**. You can have a number of options for each attribute. For example, you can have different *types of bread*: 



1. Bagel
2. Hero
3. Roll
4. Sliced white
5. Tortilla
6. Lettuce wrap

These are referred to as **levels**. Each attribute has one or more levels. The levels for each attribute are;

*Meat:*



1. Ham
2. Roast beef
3. Turkey
4. Portobello
5. Egg
6. Bean patty

*Veggies:*



1. Tomato
2. Jalapenos
3. Roasted peppers
4. Onion
5. Olives
6. Bean sprouts
7. Pickles
8. Avocado

As you can see, the *levels* for each attribute don’t have to be the same number. In the form we define attributes and the possible levels for each attribute in _calculate_ fields. We then pass these to the field plug-in. For each field, the plug-in randomly displays a combination of attributes and you can select the preferred option using the buttons. Once a selection is confirmed and you move to the next screen, you won’t be able to edit your choice (the buttons are disabled). 
