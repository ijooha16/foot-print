import { AuthProvider } from "./context/AuthProvider.jsx";
import { PostProvider } from "./context/PostContext.jsx";
import Router from "./shared/Router.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
