import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login berhasil!");
      navigate("/home");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">

      {/* Form Login */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80 space-y-4 z-10"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 underline"
          >
            Daftar sekarang
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
