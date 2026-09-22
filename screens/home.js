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
              style={styles.image}
              resizeMode="contain"
            />
            <Header
              title="Rapid Recipes"
              fontSize={34}
              lineHeight={38}
              paddingBottom={0}
            />
            <Text style={styles.subHeading}>Tasty creations in minutes, without the fuss.</Text>
            <Pressable style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate('Welcome')}>
              <Text style={globalStyles.buttonText}>Explore Our Recipes</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  introBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 148,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  button: {
    marginTop: 28,
  },
  subHeading: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.6,
    marginTop: 10,
    color: '#4A4A4A',
    textAlign: 'center',
  },
})

export default Home
