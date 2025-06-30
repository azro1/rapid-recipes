import {StyleSheet, View, Text} from 'react-native'

const Card = (props) => {
  return (
    <View style={styles.card}>
      { props.children }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,                  
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.2,         
    shadowRadius: 4,
    marginBottom: 10,
    padding: 5,
  },
})

export default Card
