import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Client from "../../../util/client";
import { MenuCreator } from "../menu-creator/menu-creator";
import Navigation from "../../../util/navigation";
import { URLParamsContext } from "../../URL-params-context";

let StyledMenuSelector = styled.div`
  width: 100%;
`;

const Menus = styled.div`
  .menu-creator {
    display: inline-block;
    width: auto;
  }
`;

let ActiveIndicator = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 4px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: #628deb;
  width: 100%;
`;

const MenuTab = styled.div`
  position: relative;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 12px;
  font-family: HK Grotesk Regular;
  font-style: normal;
  font-weight: bold;
  font-feature-settings: "cpsp" on;
  letter-spacing: 0.1em;
  display: inline-block;
  padding-bottom: 15px;
  margin-right: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "#628DEB" : "#8A9DB7")};
  text-align: center;
`;

const MenuSelector = ({ menuId }) => {
  const { restoId } = useContext(URLParamsContext);
  return (
    <StyledMenuSelector>
      <Menus>
        <MenuTab
          onClick={() => Navigation.menu(restoId, menuId)}
          selected={true}
          //key={item.id}
        >
          Dishes
          <ActiveIndicator />
          {/*item.id === restaurantId ? <ActiveIndicator /> : ""*/}
        </MenuTab>
        <MenuTab
        //onClick={() => Navigation.restaurant(item.id)}
        //selected={item.id === restaurantId}
        //key={item.id}
        >
          Settings
          {/*item.id === restaurantId ? <ActiveIndicator /> : ""*/}
        </MenuTab>
      </Menus>
    </StyledMenuSelector>
  );
};

export { MenuSelector };
