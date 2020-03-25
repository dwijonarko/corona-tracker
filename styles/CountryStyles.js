import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    margin: 10,
    minWidth: 100,
    padding: 10,
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
  boxInfo: {
    minWidth: 100,
    minHeight: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    paddingLeft: 10,
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
});
