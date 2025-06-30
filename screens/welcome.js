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
          paddingBottom={6}
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
      marginTop: 200,
      alignItems: 'center',
      gap: 6
    },
    leadText: {
      textAlign: "center",
      fontSize: 16,
      fontFamily: 'WorkSans-Light',
      lineHeight: 23,
      paddingBottom: 10,
    }
})

export default Welcome
