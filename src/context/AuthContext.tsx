
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
  loginDate: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, email: string) => void;
  logout: () => void;
  updateProfileImage: (image: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const PROFILE_KEY = "crypto_user_profile";
const LOGIN_KEY = "crypto_user_logged_in";
const SESSION_KEY = "crypto_session_expires_at";


const SESSION_DURATION = 10 * 60 * 1000;

function clearStoredSession() {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(LOGIN_KEY);
  localStorage.removeItem(SESSION_KEY);
}

function getInitialSession(): {
  profile: User | null;
  isLoggedIn: boolean;
} {
  try {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    const savedLoginStatus = localStorage.getItem(LOGIN_KEY);
    const expiresAt = Number(localStorage.getItem(SESSION_KEY));

    
    if (
      savedLoginStatus !== "true" ||
      !savedProfile ||
      !expiresAt ||
      Date.now() >= expiresAt
    ) {
      clearStoredSession();

      return {
        profile: null,
        isLoggedIn: false,
      };
    }

    const parsedProfile = JSON.parse(savedProfile);

    const profile: User = {
      username: parsedProfile.username ?? "",
      email: parsedProfile.email ?? "",
      profileImage: parsedProfile.profileImage ?? null,
      loginDate: parsedProfile.loginDate ?? null,
    };

    return {
      profile,
      isLoggedIn: true,
    };
  } catch {
    clearStoredSession();

    return {
      profile: null,
      isLoggedIn: false,
    };
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [initialSession] = useState(getInitialSession);

  const [profile, setProfile] = useState<User | null>(
    initialSession.profile
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    initialSession.isLoggedIn
  );

  const user = isLoggedIn && profile ? profile : null;
  const login = (username: string, email: string) => {
    const currentLoginDate = new Date().toISOString();

    const newProfile: User = {
      username,
      email,
      profileImage: profile?.profileImage ?? null,
      loginDate: currentLoginDate,
    };

    
    const expiresAt = Date.now() + SESSION_DURATION;

    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    localStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem(SESSION_KEY, String(expiresAt));

    setProfile(newProfile);
    setIsLoggedIn(true);
  };


  const logout = () => {
    clearStoredSession();

    setProfile(null);
    setIsLoggedIn(false);
  };

  
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      const expiresAt = Number(localStorage.getItem(SESSION_KEY));

      if (
        !expiresAt ||
        Date.now() >= expiresAt ||
        localStorage.getItem(LOGIN_KEY) !== "true"
      ) {
        logout();
      }
    };

    
    checkSession();

    // Check every second.
    const intervalId = window.setInterval(checkSession, 1000);

    // Check again when the user returns to the browser tab.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === SESSION_KEY ||
        event.key === LOGIN_KEY
      ) {
        checkSession();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.clearInterval(intervalId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, [user]);


  const updateProfileImage = (image: string) => {
    setProfile((currentProfile) => {
      if (!currentProfile) return null;

      return {
        ...currentProfile,
        profileImage: image,
      };
    });
  };

  
  useEffect(() => {
    if (profile && isLoggedIn) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
  }, [profile, isLoggedIn]);

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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}


 