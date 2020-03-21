import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      localDataSource:[]
    };
  }

  componentDidMount() {
    this._getLatest('https://coronavirus-tracker-api.herokuapp.com/v2/latest');
    this._getLocalLatest('https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=ID');
  }

  _getLatest = async (url) => {
    this.setState({isLoading: true});
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      const responseMap = Object.entries(responseJson.latest);
      await this.setState({
        isLoading: false,
        dataSource: responseMap,
      });
      console.log(this.state.dataSource);
    } catch (error) {
      console.error(error);
    }
  };

  _getLocalLatest = async (url) => {
    this.setState({isLoading: true});
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      const responseMap = Object.entries(responseJson.locations[0].latest);
      await this.setState({
        isLoading: false,
        localDataSource: responseMap,
      });
      console.log(responseMap);
    } catch (error) {
      console.error(error);
    }
  };

  _itemComponent = ({item}) => {
    var numeral = require('numeral');
    return (
      <View
        style={[styles.box,
          item[0] === 'confirmed'
            ? styles.boxWarning
            : item[0] === 'deaths'
            ? styles.boxDanger
            : styles.boxSuccess
          ]}>
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{padding: 3, fontSize: 40,fontWeight:'bold'}}>{numeral(item[1]).format('0,0')}</Text>
          <Text>{item[0].toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              COVID-19 Status
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            World COVID-19 Status
          </Text>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._getLatest}
          refreshing={this.state.isLoading}
        />
        <View style={{alignContent:'center',alignItems:'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Indonesia COVID-19 Status
        </Text>
        <FlatList
        horizontal={true}
          data={this.state.localDataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._getLatest}
          refreshing={this.state.isLoading}
        />
        <Text style={{fontSize:10}}>API Source : https://github.com/ExpDev07/coronavirus-tracker-api</Text>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 10,
    minWidth:100,
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
});
