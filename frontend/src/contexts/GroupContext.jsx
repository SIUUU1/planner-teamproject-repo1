// GroupContext.jsx
import React, { createContext, useState } from 'react';


// Create a context for the groups
export const GroupContext = createContext();

// Create a provider component
export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([
    // Initial groups data
    { name: "KH정보교육원", image: "/images/wakeup.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" },
    { name: "KH정보교육원", image: "/images/dog1.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" },
    { name: "KH정보교육원", image: "/images/dog3.jpg", tags: ["HTML", "CSS", "Spring"], capacity: "2/20", attendance: "100%", privacy: "비공개" }
  ]);

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

