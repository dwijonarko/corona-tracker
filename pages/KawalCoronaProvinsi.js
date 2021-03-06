import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {getProvince} from '../function/FetchApi';
import {styles} from '../styles/CountryStyles';
import numeral from 'numeral';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
const danger = <Icon name="sad-cry" size={30} color="#cc" />;
const warning = <Icon name="sad-tear" size={30} color="#cc" />;
const success = <Icon name="smile" size={30} color="#cc" />;
export default class KawalCoronaProvinsi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      filteredDataSource: [],
      text: '',
    };
  }

  componentDidMount() {
    this._getLatest();
  }

  _getLatest = async () => {
    this.setState({isLoading: true});
    try {
      let response = await getProvince();
      await this.setState({
        isLoading: false,
        dataSource: response,
        filteredDataSource: response,
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
            {item.attributes.Provinsi} 
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.boxInfo, styles.boxWarning]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {warning} {numeral(item.attributes.Kasus_Posi).format('0,0')}
              </Text>
            </View>
            <View style={[styles.boxInfo, styles.boxDanger]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {danger} {numeral(item.attributes.Kasus_Meni).format('0,0')}
              </Text>
            </View>
            <View style={[styles.boxInfo, styles.boxSuccess]}>
              <Text style={{padding: 3, fontSize: 20, fontWeight: 'bold'}}>
                {success} {numeral(item.attributes.Kasus_Semb).format('0,0')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        value={this.state.text}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  searchFilterFunction = e => {
    let text = e.toLowerCase();
    let provinces = this.state.dataSource;
    let filteredList = provinces.filter(item => {
      if (item.attributes.Provinsi.toLowerCase().match(text)) {
        return item;
      }
    });
    this.setState({text});
    if (!text || text === '') {
      this.setState({
        filteredDataSource: provinces,
      });

    } else if (!filteredList.length) {
        this.setState({text});
    } else if (Array.isArray(filteredList)) {
      this.setState({
        filteredDataSource: filteredList,
      });
    }
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
          data={this.state.filteredDataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._getLatest}
          refreshing={this.state.isLoading}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}
