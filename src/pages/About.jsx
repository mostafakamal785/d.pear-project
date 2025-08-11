import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-surface text-white">
        <div className="container-x py-20 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold">About Us</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Practical, modern education for everyone — learn real-world skills with guidance from experts.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container-x py-20 space-y-10">
        <h2 className="text-3xl font-bold text-center">Our Mission</h2>
        <p className="max-w-4xl mx-auto text-center text-slate-700 leading-8">
          We bring skill-first, project-based education to learners around the world.
          Our courses focus on real results with clear structure, step-by-step guides,
          and resources you can reuse in your own projects.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            { title: "High-quality courses", desc: "Up-to-date lessons, real projects, and templates help you learn faster." },
            { title: "Top-notch mentors", desc: "Learn from experienced professionals with a passion for teaching." },
            { title: "Community support", desc: "Join our community and grow together through shared knowledge." }
          ].map((item, idx) => (
            <div key={idx} className="card p-6 text-center shadow-md hover:shadow-lg transition">
              <div className="text-brand-600 text-2xl font-bold mb-3">{item.title}</div>
              <p className="text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-20">
        <div className="container-x text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="card p-4">
                <img
                  src={`https://i.pravatar.cc/300?img=${idx + 5}`}
                  alt="Team member"
                  className="w-32 h-32 mx-auto rounded-full object-cover"
                />
                <h3 className="mt-4 font-bold text-lg">John Doe</h3>
                <p className="text-sm text-slate-600">Instructor</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}

    <section className="container-x py-20 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-3">
        <div className="text-2xl font-bold">SkillGrow</div>
        <ul className="text-slate-700 space-y-2">
          <li>123 Learning St, Knowledge City</li>
          <li>mostafakamal78578@gmail.com</li>
          <li>Business: e-learning</li>
        </ul>
        <div className="mt-3 flex gap-3">
          <a
            href="#"
            className="h-9 w-9 rounded-full bg-brand-600 flex items-center justify-center hover:bg-brand-700 transition-colors text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors text-white"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="h-9 w-9 rounded-full bg-pink-500 flex items-center justify-center hover:bg-pink-600 transition-colors text-white"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img
          src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop"
          alt="Office map"
          className="w-full h-[300px] object-cover"
        />
      </div>
    </section>

      {/* CTA Section */}
      <section className="hero-surface text-white py-16">
        <div className="container-x text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Start Your Learning Journey</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Join thousands of learners improving their skills with SkillGrow.
          </p>
          <a href="/courses" className="btn-primary h-12 px-6">
            Browse Courses
          </a>
        </div>
      </section>
    </div>
  )
}
