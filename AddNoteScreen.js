import React from 'react';  
import { Alert, AsyncStorage, Button, TextInput, View } from 'react-native'; 

import styles from './Styles';

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
      //console.log({parsed})
      this.setState({
        notes: parsed
      })
      this.addNote()
    }
    catch{
      Alert.alert('Error loading data')
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

    //console.log(JSON.stringify(notes));
    AsyncStorage.setItem('saved_notes', JSON.stringify(notes));

    this.props.navigation.navigate("Notes");
  }
  
  handleNoteChange = (text) => {
    this.setState({ newNote: text})
  }
  
  render(){
    return(
      <View style={styles.addnoteview}>
        <TextInput 
          style={styles.inputtext} 
          placeholder="Write a note here" 
          placeholderTextColor='black' 
          onChangeText={
            this.handleNoteChange
            } 
          />
        <Button 
          style={styles.addnotebutton} 
          title="Save note" 
          onPress= {this.loadData} 
          />
      </View>
    );
  }
}