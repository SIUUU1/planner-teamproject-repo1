import './App.css'
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import BackGround from './components/BackGround';
import NotFound from './pages/NotFound';
import StudyGroupMain from './studygroup/StudyGroupMain';
import StudyGroupEdit from './studygroup/StudyGroupEdit';
import StudyGroupNew from './studygroup/StudyGroupNew';
import StudyGroupSearch from './studygroup/StudyGroupSearch';
import Home from './pages/Home';
import AttainmentMain from './attainment/AttainmentMain';
import AttainmentDetail from './attainment/AttainmentDetail';

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
          <Route path='/attainmentMain' element={<AttainmentMain/>}/>
          <Route path='/attainmentDetail/:type/:id' element={<AttainmentDetail/>}/>
        </Routes>
      </BrowserRouter>
      <BackGround></BackGround>
    </>
  )
}
export default App
