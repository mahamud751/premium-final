// @ts-nocheck
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Permission {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  user_type?: string;
  status?: string;
  phone?: string | null;
  role_id?: number;
  created_at?: string;
  updated_at?: string;
  image?: string[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    phone?: string,
    refferCode?: string,
    photos?: string,
    role?: string
  ) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, [user, token]);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURLHOME}/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { data } = response;

        const userData: User = {
          id: data.data.user.id.toString(),
          name: data.data.user.name,
          email: data.data.user.email,
          user_type: data.data.user.user_type,
          status: data.data.user.status,
          phone: data.data.user.phone,
          role_id: data.data.user.role_id,
          created_at: data.data.user.created_at,
          updated_at: data.data.user.updated_at,
          image: data.data.user.image,
        };

        setUser(userData);
        setToken(data.data.token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token);

        MySwal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        }).then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Login Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    refferCode?: string,
    photos?: string,
    role?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURLHOME}/register`, // Updated to match your endpoint
        {
          name,
          email,
          password,
          phone,
          refferCode,
          photos,
          role,
        }
      );

      // Handle both 200 and 201 status codes for success
      if (response.status === 200 || response.status === 201) {
        const { data } = response;

        const userData: User = {
          id: data.data.user.id.toString(),
          name: data.data.user.name,
          email: data.data.user.email,
          created_at: data.data.user.created_at,
          updated_at: data.data.user.updated_at,
          // user_type and status might not be returned by register API, so make them optional
          user_type: data.data.user.user_type || undefined,
          status: data.data.user.status || undefined,
        };

        setUser(userData);
        setToken(data.data.token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.data.token);

        MySwal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created!",
        }).then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
