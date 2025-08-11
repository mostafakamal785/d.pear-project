import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCurrentUser, getSavedCourses } from "../lib/auth";

export default function SavedCourses() {
  const [user, setUser] = useState(getCurrentUser());
  const [savedCourses, setSavedCourses] = useState([]);

  useEffect(() => {
    const updateCourses = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        setSavedCourses(getSavedCourses(currentUser.email));
      } else {
        setSavedCourses([]);
      }
    };
    
    updateCourses();

    window.addEventListener("authChanged", updateCourses);
    window.addEventListener("coursesChanged", updateCourses);

    return () => {
      window.removeEventListener("authChanged", updateCourses);
      window.removeEventListener("coursesChanged", updateCourses);
    };
  }, []);

  if (!user) {
    return (
      <section className="container-x py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Saved Courses</h1>
        <p className="mb-6">You need to log in to view your saved courses.</p>
        <Link to="/login" className="inline-block h-11 px-6 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-bold mb-8">My Saved Courses</h1>
      {savedCourses.length === 0 ? (
        <p className="text-center text-slate-500">You have no saved courses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
