let MultiSelect;
if (typeof window !== `undefined`) {
  const { Multiselect } = require('multiselect-react-dropdown');
  MultiSelectDropdown = Multiselect;
}
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import Client from '../../../../util/client'
import { Colors } from "../../../../util/colors"

let Container = styled.div`
  margin-bottom: 24px;
`
 
const css = {
  "searchBox": {
    "border": "none",
    "backgroundColor": Colors.SLATE_LIGHT,
    "fontSize": "14px",
    "margiBottom": "24px 0",
    "padding": "0",
    "paddingLeft": "8px",
  },
  "inputField": {
    "paddingLeft": "8px",
  },
  "chips": {
    "backgroundColor": Colors.ORANGE,
    "color": "white",
    "padding": "8px 10px",
    "bordeRadius": "5px",
    "marginLeft": "8px"
  },
  "optionContainer": {
    "maxHeight": "180px"
  }
}

const DishTagForm = ({ tags, setTags }) => {
    const [allTags, setAllTags] = useState([])
  
    useEffect(() => {
      Client.getTags().then(response => {
        setAllTags(response.data)
      })
    }, [])

    const onSelect = (selectedList, selectedItem) => {
      setTags(selectedList)
    }
  
    const onRemove = (selectedList, removedItem) => {
      setTags(selectedList)
    }
  
    return (
      <Container>
        <Multiselect
          options={ allTags }
          selectedValues={ tags }
          displayValue="name"
          placeholder="Start typing to begin..."
          onSelect={ onSelect }
          onRemove={ onRemove }
          style={ css }
          closeIcon="cancel"
        />
      </Container>
    )
  }

export { DishTagForm }