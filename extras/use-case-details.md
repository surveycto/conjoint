# Sample form use case details

This sample form demonstrates how to use the conjoint field plug-in to ease implementation of conjoint (discrete choice) analysis within SurveyCTO. Suppose you want to make the ultimate sandwich to sell at your shop. But what kind of sandwich? There are so many choices! That's where conjoint analysis comes in. It's like a tool to figure out what kind of sandwich your clients would love the most and how much they'd be willing to pay for it.

## Attributes and levels

First, we have to think about the parts of the sandwich – these are called **attributes**. In sandwich terms, attributes could be things like the type of bread, the type of protein, and the veggies.

So, our sandwiches are made up of:

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

Now, you can't ask everyone about every single combination of these; that would be like trying to make every possible sandwich. Too many sandwiches! Instead, you pick a few combinationation to show your clients. Maybe one sandwich has a bagel, egg, and tomato, and another has tortilla, ham, and olives. Next, you’d ask your classmates to rate or pick their favorite sandwiches from the combos you've made. Let's say you make a little booth at lunchtime with pictures of your sandwich combos and a survey.

In the form, we define attributes and the possible levels for each attribute in [*calculate* fields](https://docs.surveycto.com/02-designing-forms/01-core-concepts/03zb.field-types-calculate.html). We then pass these to the field plug-in which puts together combinations of attributes at specific levels to create product profiles. For each field, the plug-in randomly displays two profiles and you can select the preferred option using the buttons. Once a selection is confirmed and you move to the next screen, you won’t be able to edit your choice (the buttons are disabled). 
