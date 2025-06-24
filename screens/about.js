import {StyleSheet, View, Text} from 'react-native'

// screen heeading
import ScreenHeading from '../components/screenHeading';

// components
import Header from '../components/header';

const About = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <ScreenHeading
            showBackButton={true}
            navigation={navigation}
            screen="About Us"
        />
        <View style={styles.intro}>
            <Header 
              fontSize={30}
              title='About Rapid Recipes' 
            />
              <Text style={styles.text}>At Rapid Recipes, we believe cooking should be fast, simple, and enjoyable—no excuses, no nonsense. Our app is built for real people who want great meals without the hassle. We bring you quick, reliable recipes that get you from hungry to satisfied in no time. No complicated jargon or fancy chef tricks—just straightforward recipes, clear instructions, and a passion for good food... that’s who we are!</Text>
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
      gap: 20,
      marginTop: 40,
      maxWidth: 1960,
      marginHorizontal: 'auto',
      paddingHorizontal: 12,
    },
    text: {
      textAlign: "center",
      paddingBottom: 18,
      fontSize: 18,
      fontFamily: 'WorkSans-Light',
      lineHeight: 30,
    }
})
export default About

