import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
// 1. استيراد الدوال الجديدة
import { getCurrentUser, getPurchasedCourses } from "../lib/auth";

export default function SavedCourses() {
  const [user, setUser] = useState(getCurrentUser());
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const updateCourses = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        // 2. استخدام دالة جلب الدورات المشتراة
        setPurchasedCourses(getPurchasedCourses(currentUser.email));
      } else {
        setPurchasedCourses([]);
      }
    };
    
    updateCourses();

    // 3. الاستماع لحدث الشراء بدلاً من الحفظ
    window.addEventListener("authChanged", updateCourses);
    window.addEventListener("coursesPurchased", updateCourses);

    return () => {
      window.removeEventListener("authChanged", updateCourses);
      window.removeEventListener("coursesPurchased", updateCourses);
    };
  }, []);

  if (!user) {
    return (
      <section className="container-x py-12 text-center">
        {/* 4. تغيير النصوص لتعكس المحتوى الجديد */}
        <h1 className="text-3xl font-bold mb-4">My Purchased Courses</h1>
        <p className="mb-6">You need to log in to view your courses.</p>
        <Link to="/login" className="btn-primary h-11 px-6">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-bold mb-8">My Purchased Courses</h1>
      {purchasedCourses.length === 0 ? (
        <p className="text-center text-slate-500">You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
