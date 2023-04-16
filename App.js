import { useEffect, useState, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './src/styles';

export default function App() {
  const [ jokes, setJokes] = useState();
  const [ index, setIndex ] = useState(0);

  const getJokes = async () => { // Here we fetch the jokes
    const resp = await fetch('https://api.sampleapis.com/jokes/goodJokes');
    const json = await resp.json();
    setJokes(json); // Shuffle the jokes before setting
  }

  useEffect(() => { getJokes(); }, []); // Run getJokes once at start


  const getNextJoke = () => {
    if(index < jokes.length -1) setIndex(index+1)
    else setIndex(0)
  }
  return (
    <View style={styles.container}>
      {(!jokes)
        ? <Text style = {styles.text}> These are the jokes</Text>
        : <>
          <Text style = {styles.text}> {jokes[index].setup}</Text>
          <Text style = {styles.punchline}> {jokes[index].punchline}</Text>
          </>
      }
      <TouchableOpacity style = { styles.bigButton}  onPress={getNextJoke}>
        <Text style = {styles.buttonText}>Tell me another</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}


