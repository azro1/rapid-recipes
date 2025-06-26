import {StyleSheet} from 'react-native'

// global stylesheet
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 40,
    color: "#44bcb7",
    marginBottom: 6
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20
  },
  button: {
    padding: 14,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#DB7093",
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'WorkSans-Bold'
  },
  error: {
    marginTop: 20,
    textAlign: "center"
  }
})

export default globalStyles