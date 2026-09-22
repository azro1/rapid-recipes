import { useRef, useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Welcome from '../screens/welcome';
import Categories from '../screens/categories';
import CategoryDishes from '../screens/categoryDishes';
import Recipe from '../screens/recipe';
import ScreenHeading from '../components/screenHeading';

const Stack = createNativeStackNavigator();

const MainStackScreen = ({ navigation }) => {
  const goBack = useRef(() => {});
  const [title, setTitle] = useState('Home');
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFCF5' }}>
      <ScreenHeading
        showBackButton={canGoBack}
        navigation={{
          goBack: () => goBack.current(),
          openDrawer: () => navigation.openDrawer(),
        }}
        screen={title}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          freezeOnBlur: false,
          contentStyle: { backgroundColor: '#FFFCF5', padding: 0 },
        }}
        screenListeners={({ navigation: stackNavigation, route }) => ({
          focus: () => {
            goBack.current = () => stackNavigation.goBack();
            setTitle(route.name);
            setCanGoBack(stackNavigation.canGoBack());
          },
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryDishes" component={CategoryDishes} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </View>
  );
};

export default MainStackScreen;
