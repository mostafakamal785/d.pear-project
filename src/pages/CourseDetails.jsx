import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "../data/courses"; // Make sure this path is correct
import { useState, useEffect } from "react";
import { getCurrentUser, addSavedCourse, removeSavedCourse, getSavedCourses } from "../lib/auth";

export default function CourseDetails() {
  // Use 'slug' from the URL parameters, which matches the link in CourseCard
  const { slug } = useParams(); 
  const navigate = useNavigate();
  
  // Find the course by its 'slug' instead of 'id'
  const course = courses.find((c) => c.slug === slug) || null;

  const [isSaved, setIsSaved] = useState(() => {
    const user = getCurrentUser();
    if (user && course) {
      return getSavedCourses(user.email).some(c => c.id === course.id);
    }
    return false;
  });

  // This effect listens for global auth or save changes to update the UI
  useEffect(() => {
    const handleStateChange = () => {
      const user = getCurrentUser();
      if (user && course) {
        const savedCourses = getSavedCourses(user.email);
        setIsSaved(savedCourses.some((c) => c.id === course.id));
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
  }, [slug, course]); // Re-run if the slug changes

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

  if (!course) {
    return <div className="container-x py-10 text-center">Course not found.</div>;
  }
  
  const user = getCurrentUser();

  return (
    <section className="container-x py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full rounded-xl shadow-lg object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-slate-700 mb-4">{course.description}</p>
          <p className="mb-4">
            <strong>Category:</strong> {course.category}
          </p>
          <p className="mb-6">
            <strong>Price:</strong>{" "}
            {course.price === 0 ? "Free" : `$${course.price}`}
          </p>

          {user ? (
            <button
              onClick={handleSaveToggle}
              className={`h-11 px-6 rounded-md text-white font-semibold transition-colors ${
                isSaved
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSaved ? "Remove from Saved" : "Save Course"}
            </button>
          ) : (
            <Link to="/login" className="inline-block h-11 px-6 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 items-center">
              Login to Save Course
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
