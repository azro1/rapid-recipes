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
    lineHeight: 20,
    color: '#3A3A3A'
  },
  button: {
    padding: 14,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#D94F30",
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'WorkSans-Bold',
    letterSpacing: 0.5,
  },
  error: {
    marginTop: 20,
    textAlign: "center"
  }
})

export default globalStyles