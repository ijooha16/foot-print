import { AuthProvider } from "./context/AuthProvider.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import Router from "./shared/Router.jsx";
import "./App.css";
import { HomeProvider } from "./context/HomeContext.jsx";

function App() {
  return (
    <HomeProvider>
      <AuthProvider>
        <PostProvider>
          <Router />
        </PostProvider>
      </AuthProvider>
    </HomeProvider>
  );
}

export default App;
