import { StyleSheet, View, Text, Pressable, Image } from 'react-native'

// global styles
import globalStyles from '../styles/global';

// components
import Header from '../components/header';

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <View style={styles.introBlock}>
            <Image 
              source={require('../assets/images/salad.png')} 
              style={{ width: 90, height: 90 }} 
              resizeMode="contain" 
            />
            <Header 
              title="Rapid Recipes"
              fontSize={34}
              paddingBottom={2}
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
    marginTop: 148,
    alignItems: "center",
  },
  subHeading: {
    fontSize:  24,
    fontFamily: 'KirangHaerang-Regular',
    color: '#A27035',
    paddingBottom: 14,
  },
})

export default Home


