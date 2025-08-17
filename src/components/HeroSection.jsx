import { Link } from "react-router-dom";
import { courses } from "../data/courses";

export default function HeroSection() {
  const featuredCourse = courses[0] || {};

  return (
    <section className="hero-surface text-white min-h-[80vh] flex items-center">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
        
        {/* Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-widest text-white/80 font-semibold">
            Featured Course
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {featuredCourse.title || "Course Title"}
          </h1>
          <p className="text-white/90 max-w-xl mx-auto lg:mx-0">
            {featuredCourse.description || "Master skills with hands-on projects, clear roadmaps, and expert guidance."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
            <Link to="/courses" className="btn-white h-12 text-lg px-6">
              Browse All Courses
            </Link>
            <Link to={`/courses/${featuredCourse.slug || ""}`} className="btn-primary h-12 text-lg px-6">
              View Details
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Link 
            to={`/courses/${featuredCourse.slug || ""}`} 
            className="block group"
          >
            <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-5 max-w-sm w-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={featuredCourse.thumbnail || "https://placehold.co/600x400/cccccc/ffffff?text=Course"}
                alt={featuredCourse.title || "Featured course"}
                className="rounded-xl w-full object-cover aspect-video"
              />
              <div className="mt-4">
                <h3 className="font-bold text-lg">{featuredCourse.title || "Course Name"}</h3>
                <p className="text-sm text-slate-600">{featuredCourse.category || "Category"}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
