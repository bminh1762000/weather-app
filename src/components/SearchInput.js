import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const SearchInput = ({onSubmit, placeholder}) => {
  const [city, setCity] = useState('');

  const handleChangeText = text => {
    setCity(text);
  };

  const handleSubmit = () => {
    if (city === '') {
      return;
    }
    onSubmit(city);
    setCity('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor="white"
        clearButtonMode="always"
        value={city}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
