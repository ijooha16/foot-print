import { createContext, useState, useEffect } from "react";
import supabase from "../supabase/client.js";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authUser, setAuthUser] = useState([]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsLogin(true);
        setUser(session.user);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const { data: userProfile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id);
        setUserProfile(userProfile);
      };
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLogin, user, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
