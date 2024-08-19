import React, { useState } from 'react';
import './ThemeChange.css';
import Footer from '../components/Footer';
import Attainment from '../attainment/Attainment';
import ToFullList from '../components/ToFullList';
import Button from '../components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const themes = [
  {
    theme_name: 'Theme 0',
    theme_main: '#FAEAFF',
    theme_dark: '#D3B3E5',
    theme_right: '#E5CCF2',
    theme_btn_dark: '#6A0DAD',
    theme_btn_right: '#A36BCF',
    theme_btn: '#9D00FF',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 1',
    theme_main: 'linear-gradient(135deg, #f79d00, #64f38c)',
    theme_dark: '#C76D00',
    theme_right: '#52CC70',
    theme_btn_dark: '#f79d00',
    theme_btn_right: '#64f38c',
    theme_btn: '#FFA500',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 2',
    theme_main: 'linear-gradient(135deg, #BE93C5, #7BC6CC)',
    theme_dark: '#9B729B',
    theme_right: '#5FA2A9',
    theme_btn_dark: '#BE93C5',
    theme_btn_right: '#7BC6CC',
    theme_btn: '#9D7AB7',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 3',
    theme_main: 'linear-gradient(135deg, #A1FFCE, #FAFFD1)',
    theme_dark: '#80E0A6',
    theme_right: '#E5F2A8',
    theme_btn_dark: '#A1FFCE',
    theme_btn_right: '#FAFFD1',
    theme_btn: '#8FFFB3',
    theme_btn_text: '#000000',
  },
  {
    theme_name: 'Theme 4',
    theme_main: 'linear-gradient(135deg, #ef32d9, #89fffd)',
    theme_dark: '#D11DC1',
    theme_right: '#78D4E6',
    theme_btn_dark: '#ef32d9',
    theme_btn_right: '#89fffd',
    theme_btn: '#CC2EAF',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 5',
    theme_main: 'linear-gradient(135deg, #a80077, #66ff00)',
    theme_dark: '#8B005E',
    theme_right: '#4DC300',
    theme_btn_dark: '#a80077',
    theme_btn_right: '#66ff00',
    theme_btn: '#86005B',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 6',
    theme_main: 'linear-gradient(135deg, #2980B9, #2980B9,#FFFFFF)',
    theme_dark: '#206499',
    theme_right: '#1A507A',
    theme_btn_dark: '#2980B9',
    theme_btn_right: '#89CFF0',
    theme_btn: '#2B8ED6',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 7',
    theme_main: 'linear-gradient(135deg, #12c2e9,#c471ed,#F64F59)',
    theme_dark: '#10A2C7',
    theme_right: '#A258DB',
    theme_btn_dark: '#12c2e9',
    theme_btn_right: '#F64F59',
    theme_btn: '#1385C4',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 8',
    theme_main: 'linear-gradient(135deg, #FEAC5E,#C779D0,#4bc0c8)',
    theme_dark: '#DA8A48',
    theme_right: '#A567C0',
    theme_btn_dark: '#FEAC5E',
    theme_btn_right: '#4bc0c8',
    theme_btn: '#F57C00',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 9',
    theme_main: 'linear-gradient(135deg, #5433FF,#20BDFF,#a6Fecb)',
    theme_dark: '#4326CB',
    theme_right: '#1B9AD4',
    theme_btn_dark: '#5433FF',
    theme_btn_right: '#20BDFF',
    theme_btn: '#331E74',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 10',
    theme_main: 'linear-gradient(135deg, #C6FFDD,#FBD786,#f7797d)',
    theme_dark: '#A3DDBB',
    theme_right: '#D6A75E',
    theme_btn_dark: '#C6FFDD',
    theme_btn_right: '#f7797d',
    theme_btn: '#91D4A5',
    theme_btn_text: '#000000',
  },
];


const ThemeChange = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const selectTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="theme-change" style={{
      background: currentTheme.theme_main,
      '--theme-btn-color': currentTheme.theme_btn,
      '--theme-btn-text-color': currentTheme.theme_btn_text,
    }}>
      <div className="theme-selector">
        {themes.map((theme, index) => (
          <button
            key={index}
            style={{ background: theme.theme_main }}
            onClick={() => selectTheme(theme)}
            aria-label={`Change theme to ${theme.theme_name}`}
          />
        ))}
      </div>
      <div className="user">
        <div className="homeMiddle">
          <div className="homeFirstMiddle">
            <div className="plant backWhite">
            </div>
            <div className="firstMiddleText">
              <div className="calendar backWhite">
              </div>
              <div className="saying backWhite">
              </div>
            </div>
          </div>
          <div className="homeSecondMiddle">
            <div className="toDoList backWhite">
              <Button
                text={<FontAwesomeIcon icon={faPlus} />}
                textColor={currentTheme.theme_btn_dark}
                textHoverColor={currentTheme.theme_btn_right}
              />
            </div>
            <div className="circleSchedule backWhite">
              {/* Content for circle schedule */}
            </div>
          </div>
          <div className="homeThirdMiddle">
            <div className="progress backWhite">
              <Button
                text={<FontAwesomeIcon icon={faPlus} />}
                themeColor={currentTheme.theme_btn}
                textColor={currentTheme.theme_btn_text}
              />
              <div className="progress1" style={{ height: '50px' }}>
                {/* Content for progress1 */}
              </div>
              <div className="progress2" style={{ height: '50px' }}>
                {/* Content for progress2 */}
              </div>
            </div>
            <div className="board backWhite">
              <div className="userBoardList">
                {/* Content for user board list */}
              </div>
            </div>
          </div>
          <div className="homeForthMiddle">
            <div className="studyGroup backWhite">
              {/* Content for study group */}
            </div>
            <div className="openChat backWhite">
              {/* Content for open chat */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeChange;
