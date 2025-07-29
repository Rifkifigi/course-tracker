import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: name,
      });

      alert("Registrasi berhasil!"); 
      navigate("/");
    } catch (error) {
      alert("Gagal daftar: " + error.message);
      console.error("Register error:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Daftar Akun</h2>
      <input
        type="text"
        placeholder="Nama lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Daftar
      </button>

      <p className="text-sm text-center mt-4">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-600 underline"
        >
          Masuk di sini
        </button>
      </p>
    </form>
  );
};

export default Register;
