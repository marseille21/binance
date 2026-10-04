
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface User {
  username: string;
  email: string;
  profileImage: string | null;
}

interface AuthContextType {
  user: User | null;

  login: (
    username: string,
    email: string
  ) => void;

  logout: () => void;

  updateProfileImage: (
    image: string
  ) => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

const PROFILE_KEY = "crypto_user_profile";
const LOGIN_KEY = "crypto_user_logged_in";

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [profile, setProfile] =
    useState<User | null>(() => {
      const savedProfile =
        localStorage.getItem(PROFILE_KEY);

      if (!savedProfile) {
        return null;
      }

      try {
        return JSON.parse(savedProfile);
      } catch {
        localStorage.removeItem(PROFILE_KEY);
        return null;
      }
    });

  
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(() => {
      return (
        localStorage.getItem(LOGIN_KEY) ===
        "true"
      );
    });

   
  const user =
    isLoggedIn && profile
      ? profile
      : null;

  
  useEffect(() => {
    if (profile) {
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
      );
    }
  }, [profile]);

  
  useEffect(() => {
    localStorage.setItem(
      LOGIN_KEY,
      String(isLoggedIn)
    );
  }, [isLoggedIn]);

  
  const login = (
    username: string,
    email: string
  ) => {
    setProfile((currentProfile) => ({
      username,
      email,

      
      profileImage:
        currentProfile?.profileImage ??
        null,
    }));

    setIsLoggedIn(true);
  };

  
  const logout = () => {
    setProfile(null);
    setIsLoggedIn(false);
  };
 
  const updateProfileImage = (
    image: string
  ) => {
    setProfile((currentProfile) => {
      if (!currentProfile) {
        return null;
      }

      return {
        ...currentProfile,
        profileImage: image,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}



 