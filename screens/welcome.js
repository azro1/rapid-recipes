import { StyleSheet, View, Text, Pressable } from 'react-native'

// global styles
import globalStyles from '../styles/global'

// components
import Header from '../components/header'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header 
          fontSize={30} 
          title='Welcome to Rapid Recipes'
        />
        <Text style={styles.leadText}> Welcome to a world of flavors! Explore our diverse selection of recipes categorized by cuisine, dietary preferences, and meal types. Select a category and let the cooking adventure begin!</Text>

        <Pressable style={globalStyles.button} onPress={() => navigation.navigate('Categories')} >
            <Text style={globalStyles.buttonText}>Choose a Category</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      paddingHorizontal: 12,
    },
    content: {
      flex: 1,
      marginTop: 160,
      gap: 10,
      alignItems: 'center',
    },
    leadText: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: 'WorkSans-Light',
      lineHeight: 25,
      paddingBottom: 18,
    }
})

export default Welcome
