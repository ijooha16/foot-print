import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client.js";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isSignin, setIsSignin] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const getSession = sessionStorage.getItem("id");
  
  useEffect(() => {
    if (getSession) {
      setIsSignin(true)
    } else {
      setIsSignin(false)
    }
  }, [getSession]);

  useEffect(() => {
    const getSession = sessionStorage.getItem("id");
    console.log("getSession", !!getSession);

    setIsSignin(!!getSession);
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setIsSignin(true);
        setUser(session.user);
      } else {
        setIsSignin(false);
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
          .eq("uid", user.id);
        setUserProfile(userProfile[0]);
      };
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isSignin, setIsSignin, user, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
