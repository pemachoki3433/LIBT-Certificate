import React, {
  useEffect,
  useContext,
  useState,
  createContext,
  useReducer,
} from "react";

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // console.log(props);
  }, []);
  return (
    <StudentContext.Provider value={{ studentName, setStudentName }}>
      {props.children}
    </StudentContext.Provider>
  );
};

//custom hook
const useGlobalContext = () => {
  return useContext(StudentContext);
};

export default StudentContextProvider;
export { useGlobalContext };
