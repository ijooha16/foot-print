import { AuthProvider } from "./context/AuthProvider.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import Router from "./shared/Router.jsx";
import "./App.css";
import { MyPageProvider } from "./context/MyPageContext.jsx";

function App() {
  return (
    <AuthProvider>
      <MyPageProvider>
        <PostProvider>
          <Router />
        </PostProvider>
      </MyPageProvider>
    </AuthProvider>
  );
}

export default App;
