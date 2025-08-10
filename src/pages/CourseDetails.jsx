"use client"

import { useParams, Link } from "react-router-dom"
import { courses } from "../data/courses"

export default function CourseDetails() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug) || courses[0]

  return (
    <section className="container-x py-10 lg:py-14 grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        {/* Course Image */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-soft bg-black">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Meta */}
        <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold">{course.title}</h1>
        <div className="text-slate-700 mt-2">
          Category: <span className="font-medium">{course.category}</span>
        </div>

        {/* Details */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* About */}
          <div>
            <h2 className="font-bold text-xl mb-3">About this course</h2>
            <p className="leading-7 text-slate-700">
              {course.description || "No description available for this course yet."}
            </p>

            <h3 className="font-bold mt-6 mb-2">What you’ll learn</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Plan and structure real projects</li>
              <li>Best practices, tips, and workflows</li>
              <li>Security, optimization, and deployment</li>
              <li>Monetization strategies and portfolio prep</li>
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h2 className="font-bold text-xl mb-3">Curriculum</h2>
            <div className="border rounded-lg divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between">
                  <span>Module {i + 1}: Lesson overview</span>
                  <span className="text-slate-700">12:3{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="card p-5 h-fit sticky top-24">
        <div className="text-3xl font-extrabold">
          {course.price === 0 ? "Free" : `$${course.price}`}
        </div>
        <div className="text-sm text-slate-700 mt-1">
          Lifetime access
        </div>
        <button className="btn-primary h-11 w-full mt-4">Enroll Now</button>
        <div className="mt-5 space-y-2 text-sm text-slate-700">
          <div>Projects & resources</div>
          <div>Community & support</div>
          <div>Certificate of completion</div>
        </div>
        <Link to="/courses" className="btn-outline h-10 w-full mt-4 text-center">
          Browse more courses
        </Link>
      </aside>
    </section>
  )
}
