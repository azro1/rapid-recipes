import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// screens
import AboutScreen from '../screens/about'
import HelpScreen from '../screens/help'
import FavouritesScreen from '../screens/favourites'

// routes
import MainStackScreen from './mainStack';

const RootDrawerNavigator = () => {
  return (
<Drawer.Navigator screenOptions={{ 
      drawerActiveTintColor: "#A27035",
      headerStyle: {
        backgroundColor: "#44bcb7"
      },
      headerTitleStyle: {
        fontFamily: 'WorkSans-Medium',
      },
      drawerLabelStyle: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium'
      },
      headerShown: false
    }} >
      <Drawer.Screen name="Menu" component={MainStackScreen} />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
      <Drawer.Screen name="About Us" component={AboutScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  )
}

export default RootDrawerNavigator
