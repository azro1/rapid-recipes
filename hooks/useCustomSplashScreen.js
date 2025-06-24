import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const useCustomSplashScreen = () => {
  const [fontsLoaded] = useFonts({
    'work-sans-black': require('../assets/fonts/WorkSans-Black.ttf'),
    'work-sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    'work-sans-light': require('../assets/fonts/WorkSans-Light.ttf'),
    'work-sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'work-sans-thin': require('../assets/fonts/WorkSans-Thin.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  return { fontsLoaded }
};