import React from 'react';
import { View, StyleSheet } from 'react-native';
import GuessTheNumber from '../components/GuessTheNumber';

const App = () => {
  return (
    <View style={styles.container}>
      <GuessTheNumber />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default App;
