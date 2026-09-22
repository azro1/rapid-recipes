import { StyleSheet, View, Text, Pressable, Linking } from 'react-native'
import ScreenHeading from '../components/screenHeading'
import Header from '../components/header'

const SUPPORT_EMAIL = 'rapidrecipies.support@gmail.com'

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScreenHeading
        showBackButton={true}
        navigation={navigation}
        screen="Help"
      />
      <View style={styles.intro}>
        <Header
          fontSize={30}
          title="Help"
          align="left"
        />
        <Text style={styles.text}>
          If you have difficulty using Rapid Recipes, or any of its features are unavailable, please contact us. Include a short description of what you were trying to do, and we will respond as soon as we can.
        </Text>
        <Text style={styles.text}>
          You can reach us at the address below.
        </Text>
        <Pressable onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}>
          <Text style={styles.email}>{SUPPORT_EMAIL}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    flex: 1,
    gap: 16,
    marginTop: 40,
    maxWidth: 1960,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 25,
    color: '#4A4A4A',
  },
  email: {
    fontSize: 17,
    fontFamily: 'WorkSans-Medium',
    color: '#3A5743',
  },
})

export default Help
