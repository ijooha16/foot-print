import { createContext, useState, useEffect } from "react";
import supabase from "../supabase/client.js";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isSignin, setISignin] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setISignin(true);
        setUser(session.user);
      } else {
        setISignin(false);
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
    <AuthContext.Provider value={{ isSignin, setIsSignin, user, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };