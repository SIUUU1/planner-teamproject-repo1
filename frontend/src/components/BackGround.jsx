import "./BackGround.css";
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext'; 
import { useTheme } from '../contexts/ThemeContext'; 

const BackGround = () => {
  const { user, isLoggedIn } = useUser(); 
  const { basicThemeData, theme } = useTheme(); 

  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    if (isLoggedIn && theme) {
      setSelectedTheme(theme);
      console.log("theme:", theme);
    } else {
      setSelectedTheme(basicThemeData);
      console.log("basicThemeData:", basicThemeData);
    }
  }, [isLoggedIn, theme, basicThemeData]);

  const backgroundColor = selectedTheme ? selectedTheme.theme_main : '#ffffff';
  return (
    <div
      className="background"
      style={{ background:backgroundColor }}
    />
  );
}

export default BackGround;