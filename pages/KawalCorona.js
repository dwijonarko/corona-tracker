import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Image,
} from 'react-native';
import {getWorld} from '../function/FetchApi';
import {styles} from '../styles/HomeStyle';
import numeral from 'numeral';

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
      let response = await getWorld(url);
      await this.setState({
        isLoading: false,
        results: [...this.state.results, response],
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
          <View style={styles.center}>
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

          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Country', {
                title: 'Covid-19 Status By Country',
              })
            }
            underlayColor="white">
            <View style={[styles.button, styles.footer]}>
              <Text style={styles.buttonText}>Data Per Negara</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Province', {
                title: 'Data Covid-19 Indonesia',
              })
            }
            underlayColor="white">
            <View style={[styles.button, styles.footer]}>
              <Text style={styles.buttonText}>Data Per Provinsi di Indonesia</Text>
            </View>
          </TouchableHighlight>
          <Text style={[styles.center]}>
            Sumber Data : https://kawalcorona.com/api/
          </Text>
        </View>
      </View>
    );
  }
}
