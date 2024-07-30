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
import BoardList from './board/BoardList';
import BoardWrite from './board/BoardWrite';
import BoardDetail from './board/BoardDetail';
import BoardEdit from './board/BoardEdit';
import Messenger from './messenger/Messenger';
import QnaCustomerSupport from './qna/QnaCustomerSupport';
import NoticeBoard from './qna/NoticeBoard';
import ThemeChange from './theme/ThemeChange';
import FriendsList from './member/FriendsList';
import { ThemeProvider } from './contexts/ThemeContext';
import Profile from './member/Profile';
import Auth from './member/Auth';
import Schedule from './schedule/Schedule';
import User from './member/User';

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/user" element={<User/>} />
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/groupmain' element={<StudyGroupMain/>}/>
          <Route path='/groupnew' element={<StudyGroupNew/>}/>
          <Route path='/groupedit' element={<StudyGroupEdit/>}/>
          <Route path='/groupsearch' element={<StudyGroupSearch/>}/>
          <Route path='/attainmentMain' element={<AttainmentMain/>}/>
          <Route path='/attainmentDetail/:type/:id' element={<AttainmentDetail/>}/>
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boardwrite" element={<BoardWrite />} />
          <Route path="/boarddetail/:id" element={<BoardDetail />} />
          <Route path="/boardedit/:id" element={<BoardEdit />} />
          <Route path="/qna" element={<QnaCustomerSupport />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/themechange" element={<ThemeChange />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <Messenger/>
      <BackGround/>
    </>
  )
}
export default App
