import React, { useState } from 'react';
import './ThemeChange.css';
import Footer from '../components/Footer';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';

const themes = [
  { name: 'Theme 1', theme_main: 'linear-gradient(135deg, #f79d00, #64f38c)' },
  { name: 'Theme 2', theme_main: 'linear-gradient(135deg, #BE93C5, #7BC6CC)' },
  { name: 'Theme 3', theme_main: 'linear-gradient(135deg, #A1FFCE, #FAFFD1)' },
  { name: 'Theme 4', theme_main: 'linear-gradient(135deg, #ef32d9, #89fffd)' },
  { name: 'Theme 5', theme_main: 'linear-gradient(135deg, #a80077, #66ff00)' },
  { name: 'Theme 6', theme_main: 'linear-gradient(135deg, #2980B9, #2980B9,#FFFFFF )' },
  { name: 'Theme 7', theme_main: 'linear-gradient(135deg, #12c2e9,#c471ed,#F64F59 )' },
  { name: 'Theme 8', theme_main: 'linear-gradient(135deg, #FEAC5E,#C779D0,#4bc0c8 )' },
  { name: 'Theme 9', theme_main: 'linear-gradient(135deg, #5433FF,#20BDFF,#a6Fecb )' },
  { name: 'Theme 10', theme_main: 'linear-gradient(135deg, #C6FFDD,#FBD786,#f7797d )' },  
  { name: 'Theme 10', theme_main: 'linear-gradient(135deg, #C6FFDD,#FBD786,#f7797d )' },  
];

const ThemeChange = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const selectTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="theme-change" style={{ background: currentTheme.theme_main }}>
      <div className="theme-selector">
        {themes.map((theme, index) => (
          <button
            key={index}
            style={{ background: theme.theme_main }}
            onClick={() => selectTheme(theme)}
            aria-label={`Change theme to ${theme.name}`}
          />
        ))}
      </div>
      <div className="user">
        <div className="homeMiddle">
          <div className="homeFirstMiddle">
            <div className="plant" style={{ backgroundColor: 'white' }}>

            </div>
            <div className="firstMiddleText">
              <div className="calendar" style={{ backgroundColor: 'white' }}>

              </div>
              <div className="saying" style={{ backgroundColor: 'white' }}>
  
              </div>
            </div>
          </div>
          <div className="homeSecondMiddle">
            <div className="toDoList" style={{ backgroundColor: 'white' }}>

            </div>
            <div className="circleSchedule" style={{ backgroundColor: 'white' }}>

            </div>
          </div>
          <div className="homeThirdMiddle">
            <div className="progress" style={{ backgroundColor: 'white' }}>
              <div className="progress1" style={{ height: '50px' }}>
                
              </div>
              <div className="progress2" style={{ height: '50px' }}>
                
              </div>
            </div>
            <div className="board" style={{ backgroundColor: 'white' }}>
              <div className="userBoardList">
                
              </div>
            </div>
          </div>
          <div className="homeForthMiddle">
            <div className="studyGroup" style={{ backgroundColor: 'white' }}>
              
            </div>
            <div className="openChat" style={{ backgroundColor: 'white' }}>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeChange;
