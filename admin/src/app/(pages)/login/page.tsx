"use client";
import React, { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "@/services/hooks/auth";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>();

  const [loginError, setLoginError] = useState("");
  const { loginUser } = useAuth();

  if (!loginUser) {
    throw new Error(
      "AuthContext is undefined. Please ensure you are using UserProvider."
    );
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { email, password } = data;
      await loginUser(email, password);
    } catch (error) {
      setLoginError("Failed to login. Please check your credentials.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-12 md:w-1/2 lg:w-1/4">
        <div className="flex justify-center mb-8">
          <div>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src={"/assets/logo.png"}
                width={500}
                height={500}
                alt="icon"
                className="ml-2"
              />
            </Link>
            {/* <h2 className="text-2xl text-center  font-bold text-gray-800 ms-2 mt-5 uppercase">
              The The Premium Homes Ltd.
            </h2> */}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-purple-800 text-center mb-5">
          Hi, Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {loginError && <p className="text-red-500">{loginError}</p>}
          <Button
            className="bg-purple-800 text-white p-4 w-full mt-12 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out"
            type="submit"
          >
            Sign In
          </Button>
          {/* <div>
            <p className="font-bold text-gray-800 ms-2 mt-2">
              Email: mama@gmail.com
            </p>
            <p className="font-bold text-gray-800 ms-2 mt-2">
              Password: 123456789
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
