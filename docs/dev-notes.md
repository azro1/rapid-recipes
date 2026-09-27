# Dev notes

## What the app does

Rapid Recipes lets someone browse recipes by category: Home, Welcome, category, dishes, recipe. Welcome also offers Pick for Me, which opens a random recipe. There are no accounts.

The side menu is Menu, Favourites, Sustainability, About Us, and Help. The menu sits on the right and the drawer opens from the right. Help emails rapidrecipies.support@gmail.com. The spelling is recipies.

## How to build on it

- The green bar stays fixed above the stack. It does not slide with the page. Animation is simple_push.
- Home shows only the menu. Every screen you can go back from shows the back arrow on the left and the menu on the right.
- The bar is a SafeAreaView, height 70. Do not replace it with a manual status-bar inset.
- Dishes and recipe wait until their Supabase edge function finishes before the screen is shown.
- Search only filters the dishes in the open category.
- Favourites are stored on the device with AsyncStorage. They are not in the database. Swipe left on a favourite to remove it. That uses the same action as the heart on the recipe.
- Pick for Me asks TheMealDB for a random meal, then opens the recipe screen. Try again chooses another. It does not use categories. The name in the app is Pick for Me. The store listing still says Surprise Me.
- Category dish lists and recipe content use 16px side padding. About Us and Help match that.
- Body colour on cream is #4A4A4A. Forest is #3A5743. Buttons are #D94F30. Drawer active item is #A27035. Background is #FFFCF5.
- Support text that was tuned: About Us is 17 Light, line height 28. Category support is 17 Light, line height 25. Dish names are 16 Medium. Welcome choices use 18 Medium for the name and 16 Light for the line under it.

## Accessibility

Buttons, links, search, and recipe cards have labels for screen readers. Decorative pictures are hidden from the reader so the name is announced once. Icon buttons have a larger tap area.

## Sustainability

Sustainability is its own stack: home, why this matters, pick, results, recipe. Swipe back and the system back button move one screen. A recipe opened from results stays on this stack. The drawer does not take the edge swipe.

Use Ingredients is for food that has not been used yet. Use Leftovers is for food that has already been cooked. Both start from a fixed list, and someone can add their own item. A long press deletes a custom item. The fixed items stay.

Matches come from TheMealDB by ingredient, not from the recipes table. Ingredients are only stored after a recipe has been opened. Recipes that use more of the selected items come first. Use Leftovers keeps a meal only when the method already treats that food as cooked.

Do not add a sustainability badge, generic tips, tracking, or ads. Category recipes are still loaded only when that category is open. Favourites stay on the device.

## Store

- Android package is com.rapidrecipes.app. It can still change until the first upload.
- Expo Go's white loader is not the store splash. The store build keeps the splash until fonts are ready. There is no font timeout.
- Do not commit .env.
- After identity is approved: verify the contact phone, then create the app. A new personal Play account needs a closed test with 12 testers for 14 days before production.
