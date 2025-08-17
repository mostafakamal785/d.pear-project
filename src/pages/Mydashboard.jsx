import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCurrentUser, getPurchasedCourses } from "../lib/auth";
import { FiBookOpen } from "react-icons/fi";

function UserAvatar({ name }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold ring-4 ring-indigo-200">
      {initial}
    </div>
  );
}

export default function Mydashboard() {
  const [user, setUser] = useState(getCurrentUser());
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const updatePageData = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        setPurchasedCourses(getPurchasedCourses(currentUser.email));
      } else {
        setPurchasedCourses([]);
      }
    };
    
    updatePageData();

    window.addEventListener("authChanged", updatePageData);
    window.addEventListener("coursesPurchased", updatePageData);

    return () => {
      window.removeEventListener("authChanged", updatePageData);
      window.removeEventListener("coursesPurchased", updatePageData);
    };
  }, []);

  if (!user) {
    return (
      <section className="container-x py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
        <p className="mb-6">You need to log in to view your dashboard.</p>
        <Link to="/login" className="btn-primary h-11 px-6">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container-x py-12">
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <UserAvatar name={user.name} />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
              <p className="text-slate-500 mt-1">{user.email}</p>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-4">
              <FiBookOpen className="text-indigo-500 text-3xl" />
              <div>
                <div className="text-2xl font-bold text-slate-800">{purchasedCourses.length}</div>
                <div className="text-sm text-slate-500">Courses Purchased</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          {purchasedCourses.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-lg shadow-sm">
              <p className="text-slate-500">You haven't purchased any courses yet.</p>
              <Link to="/courses" className="btn-primary h-11 px-6 mt-4 inline-block">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedCourses.map((course) => (
                <CourseCard key={course.id} course={course} action="watch" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
