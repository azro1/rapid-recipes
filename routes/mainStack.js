import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// screens
import Home from '../screens/home';
import Welcome from '../screens/welcome';
import Categories from '../screens/categories';
import CategoryDishes from '../screens/categoryDishes';
import Recipe from '../screens/recipe';

import ScreenHeading from '../components/screenHeading';

const MainStackScreen = () => {
   return (  
      <Stack.Navigator screenOptions={{ 
         headerShown: true,
         animation: 'fade',
      }}>
      <Stack.Screen name='Home' component={Home} options={{
         header: ({ navigation, route, back }) => (
            <ScreenHeading 
               showBackButton={false} 
               navigation={navigation} 
               screen={route.name} 
            />
         )
      }}/>
      <Stack.Screen name='Welcome' component={Welcome} options={{
         header: ({ navigation, route, back }) => (
            <ScreenHeading 
               showBackButton={!!back} 
               navigation={navigation} 
               screen={route.name} 
            />
         )
      }}/>
      <Stack.Screen name='Categories' component={Categories} options={{
         header: ({ navigation, route, back }) => (
            <ScreenHeading 
               showBackButton={!!back} 
               navigation={navigation} 
               screen={route.name} 
            />
         )
      }}/>
      <Stack.Screen name='CategoryDishes' component={CategoryDishes} options={{
         header: ({ navigation, route, back }) => (
            <ScreenHeading 
               showBackButton={!!back} 
               navigation={navigation} 
               screen={route.name} 
            />
         )
      }}/>
      <Stack.Screen name='Recipe' component={Recipe} options={{
         header: ({ navigation, route, back }) => (
            <ScreenHeading 
               showBackButton={!!back} 
               navigation={navigation} 
               screen={route.name} 
            />
         )
      }}/>
    </Stack.Navigator>
   )
}

export default MainStackScreen 
