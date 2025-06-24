import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// screens
import AboutScreen from '../screens/about'

// routes
import MainStackScreen from './mainStack';

const RootDrawerNavigator = () => {
  return (
<Drawer.Navigator screenOptions={{ 
      headerTintColor: "#fff",
      drawerActiveTintColor: "#93569D",
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
      <Drawer.Screen name="About Us" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default RootDrawerNavigator
