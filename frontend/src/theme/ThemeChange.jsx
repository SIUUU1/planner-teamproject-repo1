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
    theme_name: 'Theme 0', theme_main: '#FAEAFF',
    theme_btn: '#6A0DAD',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 1', theme_main: 'linear-gradient(135deg, #f79d00, #64f38c)',
    theme_btn: '#f79d00',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 2', theme_main: 'linear-gradient(135deg, #BE93C5, #7BC6CC)',
    theme_btn: '#BE93C5',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 3', theme_main: 'linear-gradient(135deg, #A1FFCE, #FAFFD1)',
    theme_btn: '#A1FFCE',
    theme_btn_text: '#000000',
  },
  {
    theme_name: 'Theme 4', theme_main: 'linear-gradient(135deg, #ef32d9, #89fffd)',
    theme_btn: '#ef32d9',
    theme_btn_text: '#000000',
  },
  {
    theme_name: 'Theme 5', theme_main: 'linear-gradient(135deg, #a80077, #66ff00)',
    theme_btn: '#a80077',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 6', theme_main: 'linear-gradient(135deg, #2980B9, #2980B9,#FFFFFF)',
    theme_btn: '#2980B9',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 7', theme_main: 'linear-gradient(135deg, #12c2e9,#c471ed,#F64F59)',
    theme_btn: '#12c2e9',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 8', theme_main: 'linear-gradient(135deg, #FEAC5E,#C779D0,#4bc0c8)',
    theme_btn: '#FEAC5E',
    theme_btn_text: '#000000',
  },
  {
    theme_name: 'Theme 9', theme_main: 'linear-gradient(135deg, #5433FF,#20BDFF,#a6Fecb)',
    theme_btn: '#5433FF',
    theme_btn_text: '#FFFFFF',
  },
  {
    theme_name: 'Theme 10', theme_main: 'linear-gradient(135deg, #C6FFDD,#FBD786,#f7797d)',
    theme_btn: '#C6FFDD',
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
                themeColor={currentTheme.theme_btn}
                textColor={currentTheme.theme_btn_text} // Added textColor prop for button text color
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
