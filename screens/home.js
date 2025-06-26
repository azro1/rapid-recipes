import { StyleSheet, View, Text, Pressable } from 'react-native'

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
    alignItems: "center",
  },
  introBlock: {
    flex: 1,
    marginTop: 200,
    alignItems: "center",
    gap: 6
  },
  subHeading: {
    fontSize:  20,
    fontFamily: 'SourGummy-LightItalic',
    color: '#DEB887',
    paddingBottom: 10,
  },
})

export default Home


