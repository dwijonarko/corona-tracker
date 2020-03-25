import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {getCountry} from '../function/FetchApi';
import {styles} from '../styles/CountryStyles';
import numeral from 'numeral';
import Moment from 'moment';
export default class KawalCoronaNegara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    this._getLatest();
  }

  _getLatest = async () => {
    this.setState({isLoading: true});
    try {
      let response = await getCountry();
      await this.setState({
        isLoading: false,
        dataSource: response,
      });
    } catch (error) {
      console.error(error);
    }
  };

  _itemComponent = ({item}) => {
    var d = item.attributes.Last_Update;
    var timeStamp = new Date(d);
    var date = Moment(timeStamp).format('DD-MM-YYYY HH:mm');
    return (
      <View style={[styles.box]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
            {item.attributes.Country_Region}
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.boxInfo, styles.boxWarning]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {numeral(item.attributes.Confirmed).format('0,0')}
              </Text>
            </View>
            <View style={[styles.boxInfo, styles.boxDanger]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {numeral(item.attributes.Deaths).format('0,0')}
              </Text>
            </View>
            <View style={[styles.boxInfo, styles.boxSuccess]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {numeral(item.attributes.Recovered).format('0,0')}
              </Text>
            </View>
          </View>
          <Text style={{marginTop: 5}}>Last Update : {date}</Text>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, padding: 10}}>
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
