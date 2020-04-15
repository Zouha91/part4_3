import React from 'react';  
import { Alert, View, ActivityIndicator, Button, ScrollView, Text, AsyncStorage } from 'react-native'; 

import styles from './Styles';
import Note from './Note'

export default class NoteListScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      error: false,
      notes: [],
      newNote: ''
    }
  }
  
  //Fetch notes from database
  componentDidMount() {
    fetch('https://zouha91.github.io/part4db/notes.json')
    .then(res => res.json())
    .then(notes => this.setState({ 
      loading: false, 
      notes: notes 
    }))
    .catch(e => this.setState({ 
      error: true, 
      loading: false
    }))
  }
  
  //Display saved notes
  loadData = async() => {
      try{
        let AsyncArray = await AsyncStorage.getItem('saved_notes');
        let parsed = JSON.parse(AsyncArray)
        console.log({parsed})
        this.setState({
        notes: parsed})
      }
      catch{
        Alert.alert('Error loading the data')
      }
    }
    
    //Clear Async memory
    clearData = async() => {
      AsyncStorage.clear();
    }
    
    render() {
      if (this.state.loading) {
        return (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        )
      }
      
      if (this.state.error) {
        return (
          <View>
            <Text>Failed to load notes!</Text>
          </View>
        )
      }
      
      //Save fetched notes to Async memory
      AsyncStorage.setItem('saved_notes', JSON.stringify(this.state.notes));
      
      return (
        <ScrollView style={styles.noteview}>
        <Button 
          style={styles.addnotebutton} 
          title="Show Data" 
          onPress= {this.loadData} 
          />
        <Button 
          style={styles.addnotebutton} 
          title="Clear Data" 
          onPress= {this.clearData} 
          />
            {this.state.notes.map(note =>
              <Note
              key={note.id}
              name={note.name}
              id={note.id}
              />)}
              <Button 
                style={styles.addnotebutton} 
                title="Add note" 
                onPress= { () => {this.props.navigation.navigate('Add Note')}}
                />
          </ScrollView>
      );
    }
  }
