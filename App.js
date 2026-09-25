import 'react-native-gesture-handler';
import './suppressGotrueWarning'
import { useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootDrawerNavigator from './routes/drawer'
import { FavouritesProvider } from './context/FavouritesContext'

LogBox.ignoreLogs(['Stack guards not supported']);
SplashScreen.preventAutoHideAsync();

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFCF5';

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'WorkSans-Black': require('./assets/fonts/WorkSans-Black.ttf'),
    'WorkSans-ExtraBold': require('./assets/fonts/WorkSans-ExtraBold.ttf'),
    'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
    'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
  })
  const [gaveUp, setGaveUp] = useState(false)
  const ready = fontsLoaded || fontError || gaveUp

  useEffect(() => {
    const timer = setTimeout(() => setGaveUp(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (ready) SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return <View style={{ flex: 1, backgroundColor: '#FFFCF5' }} />

  return (
    <FavouritesProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar />
        <RootDrawerNavigator />
      </NavigationContainer>
    </FavouritesProvider>
  );
}

export default App
