import React from 'react'
import { Text } from 'react-native'; 

const Note = (props) => {
    return (
      <Text>
        {props.name}
      </Text>
    )
  }

export default Note