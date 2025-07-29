import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const CourseForm = ({ refreshData }) => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!title || !instructor) return;

    const user = auth.currentUser; 
     if (!user) return alert("Kamu harus login dulu!");

    try {
      await addDoc(collection(db, "courses"), {
        title,
        instructor,
        userId: user.uid,
        progress: 0,
        createdAt: new Date()
      });
      setTitle("");
      setInstructor("");
      alert("Kursus berhasil ditambahkan!");

      if (refreshData) {
        refreshData(); 
      }
    } catch (error) {
      console.error("Error menambahkan kursus:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Tambah Kursus</h2>
      <input
        type="text"
        placeholder="Judul Kursus"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Nama Instruktur"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
    </form>
  );
};

export default CourseForm;
