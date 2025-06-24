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
    elevation: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginBottom: 10,
    padding: 5
  },
})

export default Card
