import React, { useState, useEffect, useLayoutEffect } from 'react';

import { Link } from "gatsby"

import Layout from "../../components/layout"
import styled from "styled-components"
import SEO from "../../components/seo"

import { FormButton, ButtonRow } from "../../components/buttons" 
import { Container, Column, ImageColumn } from "../../components/grid"
import FloatingMenu from "../../components/floating-menu"

import { MenuSelector } from "../../components/dashboard/menu-selector/menu-selector"
import { MenuTable } from "../../components/dashboard/menu-table/menu-table"
import { MenuCreator } from "../../components/dashboard/menu-creator/menu-creator"

import Client from "../../util/client"

let SideBar = styled(Column)`
    background-color: #F3A35C;
`

let MenuContainer = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
`

let StyledFloatingMenu = styled(FloatingMenu)`
    position: fixed;
    right: 64px;
    bottom: 56px;
`;


const MenuPage = () => {
    const [menuId, setMenuId] = useState(null)
    const [menuData, setMenuData] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    let fileReader

    function parseFile() {
      const content = fileReader.result;
      var allTextLines = content.split(/\r\n|\n/);
      var headers = allTextLines[0].split(',');
      var lines = [];

      for (var i=1; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (data.length == headers.length) {
              var tarr = []
              for (var j=0; j<headers.length; j++) {
                  tarr.push(data[j].replace(/['"]+/g, ''))
              }
              lines.push(tarr);
          }
      }
      Client.uploadMenu(lines)
    }

    function onFileChange(event) {
        if(event.target.files){
          setSelectedFile(event.target.files[0]);
          fileReader = new FileReader();
          fileReader.onloadend = parseFile;
          fileReader.readAsText(event.target.files[0]);
        }
    }

    const updateMenuSelection = (menu) => {
        console.log("new menu selected")
        console.log(menu)
        setMenuId(menu.id)
    }

    return (
        <Layout>
            <Container>
                <SideBar width='280px'>
                </SideBar>
                <Column>
<<<<<<< HEAD
                    <MenuContainer>
                        <MenuSelector updateMenuSelection={updateMenuSelection} menuId={menuId} />
                        {/* <input type="file" accept=".csv" onChange={ onFileChange }/ > */}
                        <MenuTable menuId={menuId} menuData={menuData}/>
                        <MenuCreator />
                        <StyledFloatingMenu/>
                    </MenuContainer>
=======
                    <Content>
                        <MenuTitle>{ MenuTitleText }</MenuTitle>
                        <MenuTable menuId={menuId}/>
                    </Content>
>>>>>>> d5ebf7b... wip csv upload
                </Column>
            </Container>
        </Layout>
    )
}
export default MenuPage
