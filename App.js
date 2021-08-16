/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import SearchInput from './src/components/SearchInput';
import getImageForWeather from './src/utils/index';
import {fetchLocationId, fetchWeather} from './src/utils/api';

const App = () => {
  const [data, setData] = useState({
    location: '',
    weather: '',
    temperature: 0,
    error: false,
    loading: false,
  });

  const changeWeatherStatus = async city => {
    try {
      setData({...data, loading: true});
      const locationId = await fetchLocationId(city);
      const {weather, location, temperature} = await fetchWeather(locationId);
      setData({
        ...data,
        weather,
        location,
        temperature,
        loading: false,
        error: false,
      });
    } catch (err) {
      setData({...data, error: true, loading: false});
    }
  };

  useEffect(() => {
    changeWeatherStatus('San Francisco');
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(data.weather || 'Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator
            animating={data.loading}
            size="small"
            color="white"
          />
          {!data.loading && (
            <View>
              {data.error && (
                <View>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                </View>
              )}
              {!data.error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {data.location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {data.weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(data.temperature)}°`}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={changeWeatherStatus}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
