import './App.css'
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackGround from './components/BackGround';
import NotFound from './pages/NotFound';
import StudyGroupMain from './studygroup/StudyGroupMain';
import StudyGroupSearch from './studygroup/StudyGroupSearch';
import Home from './pages/Home';
import AttainmentMain from './attainment/AttainmentMain';
import AttainmentDetail from './attainment/AttainmentDetail';
import BoardList from './board/BoardList';
import BoardWrite from './board/BoardWrite';
import BoardDetail from './board/BoardDetail';
import Chat from './openChat/Chat';
import QnaCustomerSupport from './qna/QnaCustomerSupport';
import NoticeBoard from './qna/NoticeBoard';
// import Support from './qna/Support';
import ThemeChange from './theme/ThemeChange';
import FriendsList from './member/FriendsList';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import Profile from './member/Profile';
import Schedule from './schedule/Schedule';
import User from './pages/User';
import Login from './member/Login';
import Signup from './member/SignUp';
import TodoMain from './todoList/TodoMain';
import TodoDetail from './todoList/TodoDetail';
import NotAuthorized from './pages/NotAuthorized';
import Welcome from './pages/Welcome';
import PaymentForm from './pay/PaymentForm';
import StudyGroupEditor from './studygroup/StudyGroupEditor';
import GroupOne from './studygroup/GroupOne';
import PasswordReset from './member/PasswordReset';
import MessageList from './message/MessageList';
import ManagerRoute from './router/ManagerRoute';
// import UserRoute from './router/UserRoute';
import ManagerHome from './manager/ManagerHome';
import ManagerCustomerService from './manager/ManagerCustomerService';
import ManagerUser from './manager/ManagerUser';
import ManagerGroup from './manager/ManagerGroup';
import ManagerChart from './manager/ManagerChart';
import ManagerChat from './manager/ManagerChat';
import ManagerSignUp from './manager/ManagerSignUp';
import MessageItem from './message/MessageItem';
import NotificationList from './notification/NotificationList';


function App() {
  return (
    <div className='app'>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <BackGround/>
          <Header />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/joinForm" element={<Signup />} /> 
            <Route path='/loginForm' element={<Login/>}/>
            <Route path='/welcome' element={<Welcome/>} />
            <Route path="/user/:user_id" element={<User/>} />
            <Route path='/*' element={<NotFound/>}/>
            <Route path='/as' element={<NotAuthorized/>}/>
            <Route path='/groupmain' element={<StudyGroupMain/>}/>
            <Route path='/groupedit/:id' element={<StudyGroupEditor/>}/>
            <Route path='/groupsearch' element={<StudyGroupSearch/>}/>
            <Route path='/attainmentMain' element={<AttainmentMain/>}/>
            <Route path='/attainmentMain/:user_id' element={<AttainmentMain/>}/>
            <Route path='/attainmentDetail/:no' element={<AttainmentDetail/>}/>
            <Route path="/boardlist" element={<BoardList />} />
            <Route path="/boardwrite/:no" element={<BoardWrite />} />
            <Route path="/boarddetail/:no" element={<BoardDetail />} />
            <Route path="/boardlist/:user_id" element={<BoardList />} />
            <Route path="/boarddetail/:no/:user_id" element={<BoardDetail />} />
            <Route path="/qna/:mode/:qna_id" element={<QnaCustomerSupport />} />
            {/* <Route path='/support' element={<Support />} /> */}
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/themechange" element={<ThemeChange />} />
            <Route path="/friends" element={<FriendsList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/:user_id" element={<Schedule />} />
            <Route path='/todomain/:user_no/:type/:date' element={<TodoMain/>}/>
            <Route path='/todomain/:type/:date' element={<TodoMain/>}/>
            <Route path='/todoDetail/:no/:type/:date' element={<TodoDetail/>}/>
            <Route path='/payForm' element={<PaymentForm/>}/>
            <Route path='/groupone/:id' element={<GroupOne/>}/>
            <Route path='/passReset/:type' element={<PasswordReset/>}/>
            <Route path='/msglist' element={<MessageList/>}/>
            <Route path='/managerJoin' element={<ManagerSignUp/>}/>
            <Route path='/manager' element={<ManagerRoute element={<ManagerHome />} />} />
            <Route path='/manager/customer-service' element={<ManagerRoute element={<ManagerCustomerService />} />} />
            <Route path='/manager/chart' element={<ManagerRoute element={<ManagerChart />} />} />
            <Route path='/manager/User' element={<ManagerRoute element={<ManagerUser />} />} />
            <Route path='/manager/Group' element={<ManagerRoute element={<ManagerGroup />} />} />
            <Route path='/manager/Chat' element={<ManagerRoute element={<ManagerChat />} />} />
            <Route path='/msgitem/:no' element={<MessageItem/>}/>
            <Route path='/notificationlist' element={<NotificationList/>}/>
          </Routes>
          </ThemeProvider>
          <Footer/>
          <Chat/>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}
export default App;
