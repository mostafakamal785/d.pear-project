import { Link } from "react-router-dom"
import { images } from "../images"
export default function HeroSection({ featuredCourse }) {
  return (
    <section className="hero-surface text-white">
      <div className="container-x grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-20">
        
        {/* Image first in mobile */}
        <div className="order-1 lg:order-none justify-self-center">
          <div className="bg-white text-slate-900 rounded-card p-3 sm:p-4 max-w-sm w-full shadow-soft">
            <img
              src={
                featuredCourse?.thumbnail ||
                images.hero || "https://images.unsplash.com/photo-1584697964154-bf6f49b7f2f9?auto=format&fit=crop&w=1200&q=80"
              }
              alt={featuredCourse?.title || "Featured course"}
              className="rounded-xl w-full object-cover aspect-video"
            />
            <div className="font-semibold mt-3 text-lg">
              {featuredCourse?.title || "Course Name"}
            </div>
            <div className="text-sm text-slate-700">
              {featuredCourse?.category || "Category"}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-widest text-white/80 font-semibold">
            {featuredCourse?.badge || "Our latest course"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {featuredCourse?.title || "Course Title"}
          </h1>
          <p className="text-white/90">
            {featuredCourse?.description ||
              "Master skills with hands-on projects, clear roadmaps, and expert guidance."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link to="/courses" className="btn-outline h-11 text-white border-white">
              Browse Courses
            </Link>
            <Link to={`/courses/${featuredCourse?.slug || ""}`} className="btn-primary h-11">
              {featuredCourse?.cta || "Enroll Now"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
