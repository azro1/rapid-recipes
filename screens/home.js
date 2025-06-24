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
              paddingBottom={6}
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
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 20,
    fontFamily: 'WorkSans-Light',
    marginBottom: 20
  },
})

export default Home


