import { StyleSheet, View, Text, Pressable, Image } from 'react-native'

// global styles
import globalStyles from '../styles/global';

// components
import Header from '../components/header';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <View style={styles.introBlock}>
            <Header 
              title="Rapid Recipes"
              fontSize={38}
            />
            <Text style={styles.subHeading}>Tasty Creations in Minutes!</Text>
            <Pressable style={globalStyles.button} onPress={() => navigation.push('Welcome')}>
              <Text style={globalStyles.buttonText}>Explore Our Recipes</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  introBlock: {
    marginTop: 200,
    alignItems: "center",
  },
  subHeading: {
    fontSize:  20,
    fontFamily: 'KirangHaerang-Regular',
    color: '#A1866F',
    paddingBottom: 16,
  },
})

export default Home


