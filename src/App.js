/*REACT*/
import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
/*STYLES*/
import GlobalStyle from './styles/global';
/*COMPONENTS*/
import Board from './components/board';
import Header from './components/header';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Board/>
      
      <GlobalStyle />
    </DndProvider>
  );
}

export default App;
