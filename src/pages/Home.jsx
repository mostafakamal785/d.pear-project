import HeroSection from "../components/HeroSection"
import CourseCard from "../components/CourseCard"
import { courses } from "../data/courses"
import { Link } from "react-router-dom"
// استيراد الدورات من ملف JSON

export default function Home() {
  // تعديل: اختيار أول 4 دورات كدورات مميزة
  const featured = courses.slice(0, 4)
  console.log('Featured courses:', featured);

  return (
    <>
    
      <HeroSection />

      {/* قسم الدورات المميزة */}
      <section className="bg-slate-50">
        <div className="container-x py-12 sm:py-16">
          <div className="mb-8 sm:mb-10 flex items-center justify-between">
            <div>
              <p className="text-brand-700 font-semibold mb-2">Active Courses</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Featured Courses</h2>
            </div>
            <Link to="/courses" className="text-brand-700 font-medium hover:underline">
              View All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* قسم الحث على اتخاذ إجراء */}
      <section className="hero-surface text-white" id="cta">
        <div className="container-x grid lg:grid-cols-2 items-center gap-10 py-16">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Learn by building real projects with mentor guidance.
            </h2>
            <Link to="/courses" className="btn-white h-11 px-6 shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Group of students working on a coding project"
            className="w-[420px] justify-self-center lg:justify-self-end rounded-xl shadow-soft"
          />
        </div>
      </section>
    </>
  )
}
