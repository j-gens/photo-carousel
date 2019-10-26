import React from 'react';
import styled, { keyframes, css } from 'styled-components';


export const PlayNiceWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  min-height: 265px;
  max-height: 265px;
`;

export const CarouselBodyWrapper = styled.div`
  background: white;
  min-width: 800px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const CarouselHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CarouselHeaderRed = styled.div`
  background: white;
  font-weight: bold;
  font-size: 24px;
  font-family: Helvetica, sans-serif;
  padding-left: 25px;
  position: relative;
  overflow: hidden;
  line-height: 24px;

  ::before {
    background-color: #FA320A;
    content: ' ';
    width: 20px;
    height: 20px;
    margin-right: 10px;
    position: absolute;
    left: 0;
  }
  ::after {
    content: ' ';
    background-color: #FA320A;
    height: 20px;
    width: 100%;
    position: absolute;
    margin-left: 10px;
    display: inline-block;
  }
`;

export const CarouselNavbarBin = styled.div`
  margin-right: 10px;
  margin-top: 10px;
`;

export const CarouselBinWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(25px);
  grid-template-rows: fr fr fr fr;
  z-index: 0;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: #fff;
  color: gray;
  box-shadow: 0 1px 6px rgba(0,0,0,.3);
`;

export const CarouselButtonLeft = styled(Button)`
  z-index: 100;
  grid-column-start: 1;
  grid-row-start: 2;
`;

export const CarouselButtonRight = styled(Button)`
  z-index: 100;
  grid-column-start: 28;
  grid-row-start: 2;
`;

export const CarouselViewAllWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Satisfy|Roboto&display=swap');

  margin-right: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
`;

export const CarouselViewAllLink = styled.a`
  color: rgb(34, 105, 172);
  text-decoration: none;
  float: right;
`;

export const CarouselLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: unsafe center;
  overflow: hidden;
  z-index: 1;
  grid-column-start: 1;
  grid-column-end: 29;
  grid-row-start: 1;
  grid-row-end: 4;
`;

export const CarouselNavDot = styled.div`
  border: none;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 3px;
  background-color: lightgray;
`;

export const CarouselNavDotRed = styled(CarouselNavDot)`
  background-color: red;
`;

export const CarouselNavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CarouselEntryWrapper = styled.div`
  z-index: 2;
  min-height: 180px;
  min-width: 180px;
  max-height: 180px;
  max-width: 180px;
  margin-right: 10px;
  margin-left: 10px;
  overflow: hidden;
`;

export const CarouselEntryImg = styled.img`
  max-width: 100%;
  ${CarouselEntryWrapper}: hover & {
    transform: scale(1.1);
    transition: transform .15s ease-in-out;
  }
`;

export const Modal = styled.div`
  z-index: 1070;
  background-color: black;
  left: 0%;
  top: 0%;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const ModalCount = styled.div`
  color: white;
  font-size: 10px;
`;

export const ModalXButton = styled(Button)`
  color: white;
  background-color: black;
`;

export const ModalBin = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  justify-content: space-evenly;
`;

export const ModalImage = styled.img`
  max-width: 80%;
  max-height: 300px;
`;

export const ModalButtonLeft = styled(Button)`
  color: white;
  background-color: black;
`;

export const ModalButtonRight = styled(Button)`
  color: white;
  background-color: black;
`;

const MovementoRight = keyframes`
  from { transform: translateX(0px); }
  to { transform: translateX(-500px); }
`;

export const CarouselMoveRight = styled.div`
  z-index: 2;
  min-height: 180px;
  min-width: 180px;
  max-height: 180px;
  max-width: 180px;
  margin-right: 15px;
  overflow: hidden;
  animation: ${MovementoRight} 0.2s ease-in-out;
`;

const MovementoLeft = keyframes`
  from { transform: translateX(0px); }
  to { transform: translateX(500px); }
`;

export const CarouselMoveLeft = styled.div`
  z-index: 2;
  min-height: 180px;
  min-width: 180px;
  max-height: 180px;
  max-width: 180px;
  margin-right: 15px;
  overflow: hidden;
  animation: ${MovementoLeft} 0.2s ease-in-out;
`;

export const NoMovies = styled.div`
  background: white;
  min-width: 800px;
  max-width: 800px;
  text-align: center;

  @import url('https://fonts.googleapis.com/css?family=Satisfy|Roboto&display=swap');

  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: red;

`;

