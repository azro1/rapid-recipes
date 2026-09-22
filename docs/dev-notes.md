# Dev notes

## What the app does

Rapid Recipes lets someone browse recipes by category: Home, Welcome, category, dishes, recipe. There are no accounts.

The side menu is Menu, Favourites, About Us, and Help. Help emails rapidrecipies.support@gmail.com. The spelling is recipies.

## How to build on it

- The green bar stays fixed above the stack. It does not slide with the page. Animation is simple_push.
- Home shows only the menu. Every screen you can go back from shows the back arrow on the left and the menu on the right.
- The bar is a SafeAreaView, height 70. Do not replace it with a manual status-bar inset.
- Dishes and recipe wait until their Supabase edge function finishes before the screen is shown.
- Search only filters the dishes in the open category.
- Favourites are stored on the device with AsyncStorage. They are not in the database.
- Category dish lists and recipe content use 16px side padding. About Us and Help match that.
- Body colour on cream is #4A4A4A. Forest is #3A5743. Buttons are #D94F30. Drawer active item is #A27035. Background is #FFFCF5.
- Support text that was tuned: Welcome is 18 Light, line height 28. About Us is 17 Light, line height 28. Category support is 17 Light, line height 25. Dish names are 16 Medium.

## Store

- Android package is com.rapidrecipes.app. It can still change until the first upload.
- Expo Go's white loader is not the store splash. The store build keeps the splash until fonts are ready. There is no font timeout.
- Do not commit .env.
- After identity is approved: verify the contact phone, then create the app. A new personal Play account needs a closed test with 12 testers for 14 days before production.
