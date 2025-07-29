import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function CourseList({ courses, refreshData, viewMode }) {
  const [editingId, setEditingId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    title: "",
    instructor: "",
    progress: 0,
  });

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    refreshData();
  };

  const startEditing = (course) => {
    setEditingId(course.id);
    setEditedCourse({
      title: course.title,
      instructor: course.instructor,
      progress: course.progress || 0,
    });
  };

  const handleEdit = async (id) => {
    await updateDoc(doc(db, "courses", id), editedCourse);
    setEditingId(null);
    refreshData();
  };

  return (
    <div
      className={`${
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-2"
      }`}
    >
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-4 rounded shadow flex flex-col justify-between"
        >
          {editingId === course.id ? (
            <div className="flex flex-col gap-2">
              <input
                value={editedCourse.title}
                onChange={(e) =>
                  setEditedCourse({ ...editedCourse, title: e.target.value })
                }
                className="border p-1 rounded"
                placeholder="Judul"
              />
              <input
                value={editedCourse.instructor}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    instructor: e.target.value,
                  })
                }
                className="border p-1 rounded"
                placeholder="Instruktur"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={editedCourse.progress}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    progress: Number(e.target.value),
                  })
                }
                className="border p-1 rounded"
                placeholder="Progress"
              />
              <button
                onClick={() => handleEdit(course.id)}
                className="text-green-600"
              >
                Simpan
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{course.title}</h2>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEditing(course)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {course.progress || 0}% selesai
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseList;
