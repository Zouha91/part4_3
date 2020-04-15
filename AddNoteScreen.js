import React from 'react';  
import { Alert, View, Text, Button, TextInput, AsyncStorage } from 'react-native'; 

import styles from './Styles';
import Note from './Note'

export default class AddNoteScreen extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
      notes: [],
      newNote: ''
    }
  }

  loadData = async() => {
    try{
      let AsyncArray = await AsyncStorage.getItem('saved_notes');
      let parsed = JSON.parse(AsyncArray)
      console.log({parsed})
      let notes = this.state.notes.concat(parsed)
      this.setState({
        notes: notes
      })
    }
    catch{
      console.log('Error loading data')
    }
  }
  
  //Add new note
  addNote = () => {
    const noteObject = {
      name: this.state.newNote,
      id: this.state.notes.length + 1
    }
    if (this.state.notes.map(noteObject => noteObject.name.toUpperCase()).includes(noteObject.name.toUpperCase())) {
      Alert.alert(`Note ${noteObject.name} already exists! Please choose a different note.`)
      return
    }

    const notes = this.state.notes.concat(noteObject)
    this.setState({
      notes: notes,
      newNote: ''
    })

    console.log(JSON.stringify(notes));
    AsyncStorage.setItem('saved_notes', JSON.stringify(notes));

    this.props.navigation.navigate("Notes");
  }
  
  handleNoteChange = (text) => {
    this.setState({ newNote: text})
  }
  
  render(){
    
    return(
      <View style={styles.addnoteview}>
              <Button 
                title="Save note" 
                onPress={
                  this.loadData,
                  this.addNote}
                />
              <TextInput 
                style={styles.inputtext} 
                placeholder="Write a note here" 
                placeholderTextColor='black' 
                onChangeText={this.handleNoteChange} 
                />
                <Button 
                style={styles.addnotebutton} 
                title="Show Data" 
                onPress= {this.loadData} 
                />
              {this.state.notes.map(note =>
              <Note
              key={note.id}
              name={note.name}
              id={note.id}
              />)}
            </View>
        );
       }
    }