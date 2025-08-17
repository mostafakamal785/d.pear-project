import HeroSection from "../components/HeroSection"
import CourseCard from "../components/CourseCard"
import { courses } from "../data/courses"
import { Link } from "react-router-dom"
// استيراد الدورات من ملف JSON

export default function Home() {
  const featured = courses.slice(0, 4)
  console.log('Featured courses:', featured);

  return (
    <>
    
      <HeroSection />
      {/* Why Choose Us */}
<section className="bg-slate-50 py-24">
  <div className="container-x text-center max-w-5xl">
    <h2 className="text-4xl font-bold mb-10">Why Choose SkillGrow?</h2>
    <p className="text-slate-600 mb-16 text-lg">
      We provide the best environment for learners to master new skills with structured learning paths, practical projects, and top-notch instructors.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { title: "Expert Instructors", text: "Learn from industry professionals with years of proven experience in the field." },
        { title: "Hands-on Projects", text: "Practice through real-world projects that help you build an impressive portfolio." },
        { title: "Flexible Learning", text: "Study at your own pace, on your own schedule, from anywhere in the world." },
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-lg p-8 shadow-sm h-full flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
          <p className="text-slate-600">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="bg-brand-700 text-white py-24">
  <div className="container-x text-center max-w-5xl">
    <h2 className="text-4xl font-bold mb-10">What Our Students Say</h2>
    <p className="text-white/80 mb-16 text-lg">
      Hear from our students who have successfully transformed their careers through our platform.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { name: "Ali", text: "This platform changed my career completely! I landed my dream job within 3 months." },
        { name: "Sara", text: "The courses are practical, easy to follow, and helped me build real skills." },
        { name: "Omar", text: "The project-based approach made me feel confident applying what I learned." },
      ].map((item, i) => (
        <div key={i} className="bg-white/10 rounded-lg p-8 h-full flex flex-col justify-center">
          <p className="italic mb-6 text-lg">"{item.text}"</p>
          <div className="font-semibold">{item.name}</div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Final Call to Action */}
<section className="py-24 text-center bg-slate-50">
  <div className="container-x max-w-4xl">
    <h2 className="text-4xl font-bold mb-6">Start Your Learning Journey Today!</h2>
    <p className="text-slate-600 mb-10 text-lg">
      Join thousands of learners building new skills, exploring new opportunities, and growing their careers with SkillGrow.
    </p>
<button className="btn-primary h-14 px-10 text-lg">
  <Link to="/courses">Get Started</Link>
</button>  </div>
</section>


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
