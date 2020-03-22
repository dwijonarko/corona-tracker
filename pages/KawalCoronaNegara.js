import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';
export default class KawalCoronaNegara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      localDataSource:[]
    };
  }

  componentDidMount() {
    this._getLatest('https://api.kawalcorona.com');
  }

  _getLatest = async (url) => {
    this.setState({isLoading: true});
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      await this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
    } catch (error) {
      console.error(error);
    }
  };

  _itemComponent = ({item}) => {
    var numeral = require('numeral');
    var d = item.attributes.Last_Update;
    var timeStamp = new Date(d);
    var date = Moment(timeStamp).format('DD-MM-YYYY HH:mm');
    return (
      <View
        style={[styles.box]}>
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{padding: 3, fontSize: 20,fontWeight:'bold'}}>{item.attributes.Country_Region}</Text>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={[styles.boxInfo,styles.boxWarning]}>
                    <Text style={{padding: 3, fontSize: 20,fontWeight:'bold'}}>{numeral(item.attributes.Confirmed).format('0,0')}</Text>
                </View>
                <View style={[styles.boxInfo,styles.boxDanger]}>
                    <Text style={{padding: 3, fontSize: 20,fontWeight:'bold'}}>{numeral(item.attributes.Deaths).format('0,0')}</Text>
                </View>
                <View style={[styles.boxInfo,styles.boxSuccess]}>
                    <Text style={{padding: 3, fontSize: 20,fontWeight:'bold'}}>{numeral(item.attributes.Recovered).format('0,0')}</Text>
                </View>
            </View>
            <Text style={{marginTop:5}}>Last Update : {date}</Text>
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
                World COVID-19 Status - By Country
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            World COVID-19 Status - By Country
          </Text>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._getLatest}
          refreshing={this.state.isLoading}
        />
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
    minHeight: 100,
    margin: 10,
    minWidth:100,
    padding:10,
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
  boxInfo:{
    minWidth:100,
    minHeight:40,
    marginHorizontal:5,
    justifyContent:'center',
    paddingLeft:10
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
