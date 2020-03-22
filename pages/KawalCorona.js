import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableHighlight,Image} from 'react-native';

export default class KawalCorona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      results: [],
    };
  }
  componentDidMount() {
    this._getLatest('positif');
    this._getLatest('sembuh');
    this._getLatest('meninggal');
  }

  _getLatest = async url => {
    this.setState({isLoading: true});
    try {
      let response = await fetch('https://api.kawalcorona.com/' + url);
      let responseJson = await response.json();
      await this.setState({
        isLoading: false,
        results: [...this.state.results, responseJson],
      });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              World COVID-19 Status
            </Text>
            <Image
          style={styles.stretch}
          source={require('../assets/corona.png')}
        />
          </View>
        </View>
      );
    }
    const numeral = require('numeral');
    const buttonsListArr = this.state.results.map((val, key) => (
      <View
        key={key}
        style={[
          styles.box,
          val.name == 'Total Positif'
            ? styles.boxWarning
            : val.name == 'Total Sembuh'
            ? styles.boxSuccess
            : styles.boxDanger,
        ]}>
          <Text
            key={'value' + key}
            style={{padding: 3, fontSize: 40, fontWeight: 'bold'}}>
            {numeral(val.value).format('0,0')}
          </Text>
          <Text key={'name' + key}>{val.name.toUpperCase()}</Text>
      </View>
    ));
    return (
      <View style={{flex: 1, padding: 20, flexDirection: 'column'}}>
        <View style={styles.center}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                World COVID-19 Status
            </Text>  
            <Image
          style={styles.stretch}
          source={require('../assets/corona.png')}
        />        
            {buttonsListArr}
            <Text style={[styles.center,styles.footer]}>
                Sumber Data : https://kawalcorona.com/api/
            </Text>
            <TouchableHighlight  underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Data Per Negara</Text>
                </View>
            </TouchableHighlight>
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  footer:{
    marginTop:30
  },
   button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  stretch: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
});
