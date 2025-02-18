import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Keyboard, ScrollView, Alert } from 'react-native';

const GuessTheNumber = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('white');
  const [range, setRange] = useState<{ min: number, max: number } | null>(null);
  const [coins, setCoins] = useState(100); // Initial coins
  const [bet, setBet] = useState('');
  const [chances, setChances] = useState(3); // Initial chances

  const startGame = () => {
    const minValue = Math.floor(Math.random() * 90) + 1; // Random min between 1 and 90
    const maxValue = minValue + Math.floor(Math.random() * 10) + 10; // Random max between min+10 and min+20
    setRange({ min: minValue, max: maxValue });
    setNumber(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    setMessage('');
    setMessageColor('white');
    setGuess('');
    setChances(3); // Reset chances
    setBet(''); // Reset bet
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    const userBet = parseInt(bet);
    const userMultiplier = 2; // Default multiplier

    if (number !== null && userBet > 0 && userBet <= coins) {
      if (userGuess > number) {
        setMessage('Wrong but nice try');
        setMessageColor('red');
      } else if (userGuess < number) {
        setMessage('Wrong but nice try');
        setMessageColor('red');
      } else {
        setMessage('CORRECT');
        setMessageColor('green');
        setCoins(coins + userBet * userMultiplier); // Add bet * multiplier to coins if correct
        return;
      }

      setChances(chances - 1); // Decrease chances
      setCoins(coins - userBet * userMultiplier); // Deduct bet * multiplier from coins if wrong

      if (chances - 1 === 0) {
        setMessage(`Game over! The number was ${number}.`);
        setMessageColor('red');
        setNumber(null); // End the game
      }

      if (coins - userBet * userMultiplier <= 0) {
        setCoins(0);
        Alert.alert(
          'Out of Coins',
          'You have run out of coins. Watch an ad to get more coins.',
          [
            { text: 'Watch Ad', onPress: () => setCoins(100) }, // Reset coins after watching ad
          ],
          { cancelable: false }
        );
      }
    } else {
      setMessage('Invalid bet or number is not set. Please start the game.');
      setMessageColor('red');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {message ? <Text style={[styles.message, { color: messageColor }]}>{message}</Text> : null}
        <Text style={styles.title}>Guess the Number</Text>
        <Text style={styles.coins}>Coins: {coins}</Text>
        <Button title="Start Game" onPress={startGame} color="#841584" />
        {range && (
          <Text style={styles.range}>Range: {range.min} - {range.max}</Text>
        )}
        {number !== null && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your bet"
              keyboardType="number-pad"
              value={bet}
              onChangeText={setBet}
              placeholderTextColor="white"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your guess"
              keyboardType="number-pad"
              value={guess}
              onChangeText={setGuess}
              placeholderTextColor="white"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />
            <Button title="Guess" onPress={handleGuess} color="#841584" />
            <Text style={styles.chances}>Chances left: {chances}</Text>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 0,
    width: '110%',
    height: '105%',
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    color: 'white',
    fontFamily: 'Cursive', // Use a custom font
  },
  coins: {
    fontSize: 24,
    position: 'absolute',
    top: 50,
    right: 20,
    color: 'white',
    fontFamily: 'Cursive', // Use a custom font
  },
  range: {
    fontSize: 20,
    marginBottom: 16,
    color: 'white',
    fontFamily: '', // Use a custom font
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderRadius: 10, // Rounded corners
  },
  chances: {
    fontSize: 20,
    marginTop: 16,
    color: 'white',
    fontFamily: 'Cursive', // Use a custom font
  },
  message: {
    fontSize: 30,
    fontFamily: 'Cursive', // Use a custom font
    position: 'absolute',
    top: 150,
    textAlign: 'center',
    width: '100%',
  },
});

export default GuessTheNumber;
