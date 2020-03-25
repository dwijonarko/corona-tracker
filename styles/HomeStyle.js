import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 10,
    minWidth: 200,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxWarning: {
    backgroundColor: '#fb3',
  },
  boxDanger: {
    backgroundColor: '#ff3547',
  },
  boxSuccess: {
    backgroundColor: '#00c851',
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 30,
  },
  button: {
    marginBottom: 10,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  stretch: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
