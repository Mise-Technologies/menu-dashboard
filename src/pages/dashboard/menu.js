import React, { useState, useEffect, useLayoutEffect } from 'react';

import { Link } from "gatsby"

import Layout from "../../components/layout"
import styled from "styled-components"
import SEO from "../../components/seo"

import { Container, Column, ImageColumn } from "../../components/grid"

import { MenuTable } from "../../components/dashboard/menu-table"

import Client from "../../util/client"



let SideBar = styled(Column)`
    background-color: #F3A35C;
`

let MenuTitleText = 'Spring 2020 Menu'

let MenuTitle = styled.h1`
    text-transform: uppercase;
    font-size: 32px;
    line-height: 38px;
    padding-top: 104px;
`

let Content = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;


`

const MenuPage = () => {
    const [menuData, setMenuData] = useState()
    const [menuId, setMenuId] = useState(1)
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
      Client.setMenu(lines)
    }

    function onFileChange(event) {
        if(event.target.files){
          setSelectedFile(event.target.files[0]);
          fileReader = new FileReader();
          fileReader.onloadend = parseFile;
          fileReader.readAsText(event.target.files[0]);
        }
    }

    return (
        <Layout>
            <Container>
                <SideBar width='280px'>
                </SideBar>
                <Column>
                    <Content>
                        <MenuTitle >{ MenuTitleText }</MenuTitle>
                        {/* <input type="file" accept=".csv" onChange={ onFileChange }/ > */}
                        <MenuTable menuId={menuId}/>
                    </Content>
                </Column>
            </Container>
        </Layout>
    )
}
export default MenuPage
