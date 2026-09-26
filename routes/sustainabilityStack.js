import { useRef, useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHeading from '../components/screenHeading';
import {
  SustainabilityHome,
  SustainabilityAbout,
  FoodPick,
  FoodResults,
} from '../screens/sustainability';

const Stack = createNativeStackNavigator();

const SustainabilityStack = ({ navigation }) => {
  const goBack = useRef(() => {});
  const [title, setTitle] = useState('Sustainability');
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFCF5' }}>
      <ScreenHeading
        showBackButton
        navigation={{
          goBack: () => {
            if (canGoBack) goBack.current()
            else navigation.navigate('Menu')
          },
          openDrawer: () => navigation.openDrawer(),
        }}
        screen={title}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          freezeOnBlur: false,
          contentStyle: { backgroundColor: '#FFFCF5', padding: 0 },
        }}
        screenListeners={({ navigation: stackNavigation, route }) => ({
          focus: () => {
            goBack.current = () => stackNavigation.goBack();
            setTitle(route.params?.heading || route.name);
            setCanGoBack(stackNavigation.canGoBack());
          },
        })}
      >
        <Stack.Screen
          name="SustainabilityHome"
          component={SustainabilityHome}
          initialParams={{ heading: 'Sustainability' }}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="About" component={SustainabilityAbout} />
        <Stack.Screen name="Pick" component={FoodPick} />
        <Stack.Screen name="Results" component={FoodResults} />
      </Stack.Navigator>
    </View>
  );
};

export default SustainabilityStack;
