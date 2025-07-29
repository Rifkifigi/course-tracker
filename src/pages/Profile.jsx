import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden mb-4">
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.displayName || "User"
              )}&background=random`
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold mb-1">
          {user?.displayName || "Nama tidak tersedia"}
        </h2>
        <p className="text-gray-600 text-sm">{user?.email}</p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
