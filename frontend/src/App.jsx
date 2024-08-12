import './App.css'
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
import Chat from './openChat/Chat';
//import Messenger from './messenger/Messenger';
import QnaCustomerSupport from './qna/QnaCustomerSupport';
import NoticeBoard from './qna/NoticeBoard';
import Support from './qna/Support';
import ThemeChange from './theme/ThemeChange';
import FriendsList from './member/FriendsList';
import { ThemeProvider } from './contexts/ThemeContext';
import Profile from './member/Profile';
import Schedule from './schedule/Schedule';
import User from './member/User';
import Login from './member/Login';
import Signup from './member/SignUp';
import TodoMain from './todoList/TodoMain';
import TodoDetail from './todoList/TodoDetail';
import NotAuthorized from './pages/NotAuthorized';
import Welcome from './pages/Welcome';
import PaymentForm from './pay/PaymentForm';

function App() {
  
  return (
    <div className='app'>
    <BrowserRouter>
      <BackGround/>
      <Header />
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/joinForm" element={<Signup />} /> 
          <Route path='/loginForm' element={<Login/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path="/user" element={<User/>} />
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/as' element={<NotAuthorized/>}/>
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
          <Route path="/qna/:mode/:qna_id" element={<QnaCustomerSupport />} />
          <Route path='/support' element={<Support />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/themechange" element={<ThemeChange />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path='/todomain/:type/:date' element={<TodoMain/>}/>
          <Route path='/todoDetail/:no/:type/:date' element={<TodoDetail/>}/>
          <Route path='/payForm' element={<PaymentForm/>}/>
        </Routes>
        </ThemeProvider>
        <Footer/>
        <Chat/>
      </BrowserRouter>
    </div>
  )
}
export default App;
