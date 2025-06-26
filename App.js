import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

// drawer
import RootDrawerNavigator from './routes/drawer'

const App = () => { 
  const [fontsLoaded] = useFonts({
    'WorkSans-Black': require('./assets/fonts/WorkSans-Black.ttf'),
    'WorkSans-ExtraBold': require('./assets/fonts/WorkSans-ExtraBold.ttf'),
    'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
    'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
    'SourGummy-Regular': require('./assets/fonts/SourGummy-Regular.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if(!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  }

    return (
      <NavigationContainer>
        <StatusBar />
        <RootDrawerNavigator />
      </NavigationContainer>
    );

}

export default App