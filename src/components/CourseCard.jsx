import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, addSavedCourse, removeSavedCourse, getSavedCourses } from "../lib/auth";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const saved = getSavedCourses(user.email);
      setIsSaved(saved.some((c) => c.id === course.id));
    } else {
      setIsSaved(false);
    }
  }, [course.id]);

  useEffect(() => {
    const handleStateChange = () => {
      const user = getCurrentUser();
      if (user) {
        const saved = getSavedCourses(user.email);
        setIsSaved(saved.some((c) => c.id === course.id));
      } else {
        setIsSaved(false);
      }
    };

    window.addEventListener("authChanged", handleStateChange);
    window.addEventListener("coursesChanged", handleStateChange);

    return () => {
      window.removeEventListener("authChanged", handleStateChange);
      window.removeEventListener("coursesChanged", handleStateChange);
    };
  }, [course.id]);


  const handleSaveToggle = () => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    if (isSaved) {
      removeSavedCourse(user.email, course.id);
    } else {
      addSavedCourse(user.email, course);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
      {/* FIX: The link now uses course.slug to match the router */}
      <Link to={`/courses/${course.slug}`}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-indigo-600 font-semibold">{course.category}</p>
        <h3 className="font-bold text-lg mt-1">{course.title}</h3>
        <div className="mt-auto pt-4 flex justify-between items-center">
          {/* FIX: This link also now uses course.slug */}
          <Link to={`/courses/${course.slug}`} className="px-4 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-100">
            Details
          </Link>
          <button
            onClick={handleSaveToggle}
            className={`px-4 py-2 text-sm rounded-md text-white transition-colors ${
              isSaved
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSaved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
