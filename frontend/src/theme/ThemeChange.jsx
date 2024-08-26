import React, { useEffect } from 'react';
import './ThemeChange.css';
import Button from '../components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import useSendPost from '../util/useSendPost';

const ThemeChange = () => {
  const { user } = useUser();
  const { theme, userThemeSettingData, updateTheme, allThemeData, refetchUserTheme } = useTheme(); 
  
  // Update theme when component mounts or when the user changes
  useEffect(() => {
    updateTheme('user');
  }, [user, updateTheme]);

  const { postRequest } = useSendPost(`http://localhost:8080/api/user/setting-themes/update`, {}, 'json');

  const updateSettingTheme = async (selectTheme) => {
    try {
      await postRequest({
        user_id: user.user_id,
        theme_name: selectTheme.theme_name,
        theme_no: selectTheme.theme_no,
      });
      refetchUserTheme();
    } catch (error) {
      console.error("테마 업데이트 중 오류 발생:", error);
      alert("테마 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="theme-change">
      <div className="theme-selector">
        {allThemeData && allThemeData.map((theme, index) => (
          <button
            key={index}
            style={{ background: theme.theme_main }}
            onClick={() => updateSettingTheme(theme)} // Pass the function as a callback
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
                // textColor={theme.theme_btn_dark}
                // textHoverColor={theme.theme_btn_right}
              />
            </div>
            <div className="circleSchedule backWhite">
            </div>
          </div>
          <div className="homeThirdMiddle">
            <div className="progress backWhite">
              <Button
                text={<FontAwesomeIcon icon={faPlus} />}
                // themeColor={theme.theme_btn}
                // textColor={theme.theme_btn_text}
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
