# Sample form use case details

This sample form demonstrates how to use the conjoint field plug-in to ease implementation of conjoint (discrete choice) analysis within SurveyCTO. Our example explores preferences relating to sandwiches. A sandwich has is made up of:



1. Bread
2. Cheese
3. Greens
4. Meat
5. Sauce
6. Veggies

These are what we refer to as attributes. You can have a number of options for each attribute. For example, you can have different types of bread: 



1. Bagel
2. Hero
3. Roll
4. Sliced white
5. Tortilla
6. Lettuce wrap

These are referred to as levels. Each attribute has one or more levels. The levels for each attribute are;

Cheese: 



1. Cheddar
2. Gouda
3. Jack
4. Mozzarella
5. Provolone
6. None

Greens:



1. Arugala
2. Green lettuce
3. Red lettuce
4. Spinach

Meat:



1. Ham
2. Roast beef
3. Turkey
4. Portobello
5. Egg
6. Bean patty

Sauce:



1. Hot sauce
2. Mayonnaise
3. Mustard
4. Oil and vinegar
5. None

Veggies:



1. Tomato
2. Jalapenos
3. Roasted peppers
4. Onion
5. Olives
6. Bean sprouts
7. Pickles
8. Avocado

As you can see, the levels for each attribute don’t have to be the same number. In the form we define attributes and the possible levels for each attribute in _calculate_ fields. We then pass these to the field plug-in. For each field, the plug-in randomly displays a combination of attributes and you can select the preferred option using the buttons. Once a selection is confirmed and you move to the next screen, you won’t be able to edit your choice (the buttons are disabled). 
