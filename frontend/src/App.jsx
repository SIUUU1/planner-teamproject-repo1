import './App.css'
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import StudyGroupMain from './studygroup/StudyGroupMain';
import StudyGroupEdit from './studygroup/StudyGroupEdit';
import StudyGroupNew from './studygroup/StudyGroupNew';
import StudyGroupSearch from './studygroup/StudyGroupSearch';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/groupmain' element={<StudyGroupMain/>}/>
          <Route path='/groupnew' element={<StudyGroupNew/>}/>
          <Route path='/groupedit' element={<StudyGroupEdit/>}/>
          <Route path='/groupsearch' element={<StudyGroupSearch/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
