import { AuthProvider } from "./context/AuthProvider.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import Router from "./shared/Router.jsx";
import "./App.css";
import { HomeProvider } from "./context/HomeContext.jsx";
import { MyPageProvider } from "./context/MyPageContext.jsx";

function App() {
  return (
    <AuthProvider>
      <HomeProvider>
        <MyPageProvider>
          <PostProvider>
            <Router />
          </PostProvider>
        </MyPageProvider>
      </HomeProvider>
    </AuthProvider>
  );
}

export default App;
