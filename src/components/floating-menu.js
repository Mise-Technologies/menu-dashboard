import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu';

import { QRCodeForm } from "../components/dashboard/menu-table/popup-forms";
import Client from "../util/client"

const FloatingMenuButton = styled.div`
    position: absolute;
    width: 72px;
    height: 72px;
    right: 0;
    bottom: 0;
    border-radius: 36px;
    background: #F3A35C;
    box-shadow: 0px 10px 20px rgba(243, 163, 92, 0.2);
    cursor: pointer;
`;

const StyledHamburger = styled(HamburgerMenu)`
    margin: auto;
    position: absolute !important; /* overrides the in-line css of hamburger menu */
    top: 0; left: 0; bottom: 0; right: 0;
`;

const Menu = styled.div`
    position: absolute;
    width: 250px;
    bottom: 36px;
    right: 100px;
    border-radius: 8px;
    box-shadow: 4px 4px 15px #D9D9D9;
    display: ${({ isOpen }) => isOpen ? 'block' : 'none' };
`;

const MenuItem = styled.div`
    height: 60px;
    width: 100%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 60px;
    transition: 0.3s ease-in-out;
    &:hover {
        background: rgba(242, 153, 74, 0.1);
    }
`;

const OrangeTextMenuItem = styled(MenuItem)`
    color: #F5B57A;
`;

const RedTextMenuItem = styled(MenuItem)`
    color: #FB6565;
`;

const HorizontalSeparator = styled.div`
    height: 0;
    width: 195px;
    border: 1px solid #E1E7EC;
    margin: 0 auto;
`;

const FloatingMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showQRCodeForm, setShowQRCodeForm] = useState(false);
    const [uniqueName, setUniqueName] = useState(null);
    const [restaurantName, setRestaurantName] = useState(null);

    useEffect(() => {
        // TODO(Tony): use global context for restaurant info
        // Currently put here to avoid multiple requests
        Client.getRestaurantInfo().then(res => {
            setUniqueName(res.data.uniqueName);
            setRestaurantName(res.data.name);
        });

        console.log(props.menuId)
    }, [props.menuId]);

    function onClickMenu() {
        setIsOpen(!isOpen);
    }

    function deleteMenu(id) {
        Client.deleteMenu(id).then((res) => {
            console.log("menu deleted")
        })
        onClickMenu();
    }
    
    return (
        <>
            <div {...props}>
                <Menu isOpen={isOpen}>
                    <OrangeTextMenuItem>Download as .csv</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem>Upload Spreadsheet</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem>Duplicate Menu</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <OrangeTextMenuItem
                        onClick={() => setShowQRCodeForm(true)}
                    >Create QR Code</OrangeTextMenuItem>
                    <HorizontalSeparator/>
                    <RedTextMenuItem onClick={()=>deleteMenu(props.menuId)}> Delete Menu</RedTextMenuItem>
                </Menu>
                <FloatingMenuButton onClick={onClickMenu}>
                    <StyledHamburger
                        isOpen={isOpen}
                        menuClicked={() => {}}
                        width={26}
                        height={24}
                        borderRadius={2}
                        color='white'
                        strokeWidth={4}
                        />
                </FloatingMenuButton>
            </div>
            {
                showQRCodeForm ? (
                    <QRCodeForm 
                        uniqueName={uniqueName}
                        name={restaurantName}
                        closeForm={() => setShowQRCodeForm(false)}
                    />
                ) : <></>
            }
        </>
    )
}

export default FloatingMenu;