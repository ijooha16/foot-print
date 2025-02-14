import { createContext, useReducer } from "react";

//액션 정의

//초기값
const initialState = {};

//reducer 함수
const reducer = (state, action) => {};

//context
const PostContext = createContext();

//provider
const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
