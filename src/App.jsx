import React, { useEffect, useState } from "react";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const App = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); 
  const navigate = useNavigate();

  const fetchCourses = async (uid) => {
    const q = query(collection(db, "courses"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCourses(data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCourses(currentUser.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, );

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Tracker</h1>
        <div className="flex items-center space-x-4">
          {/* Toggle View Buttons */}
          <div className="space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 ml-2 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-black border"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 ml-2 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-black border"}`}
            >
              List
            </button>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
            Profile
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form + List */}
      <CourseForm />
      <CourseList
        courses={courses}
        refreshData={() => fetchCourses(user.uid)}
        viewMode={viewMode} 
      />
    </div>
  );
};

export default App;
