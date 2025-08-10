export default function About() {
  return (
    <div>
      <section className="hero-surface text-white">
        <div className="container-x py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">About Us</h1>
          <p className="text-white/80 mt-2">Practical, modern education for everyone</p>
        </div>
      </section>

      <section className="container-x py-14 space-y-8 text-center md:text-left">
        <p className="max-w-3xl mx-auto leading-8 text-slate-700">
          We bring skill-first, project-based education to learners around the world. Our courses focus on real results
          with clear structure, step-by-step guides, and resources you can reuse in your own projects.
        </p>
        <p className="max-w-3xl mx-auto leading-8 text-slate-700">
          Join our community, follow the roadmaps, and start building a portfolio that gets noticed.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="font-bold text-xl mb-2">High-quality courses</h3>
            <p className="text-slate-700">
              Up-to-date lessons, real projects, and templates help you learn faster and retain more.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Top-notch mentors</h3>
            <p className="text-slate-700">Learn from experienced professionals with a passion for teaching.</p>
          </div>
        </div>
      </section>

      <section className="container-x py-10 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          <div className="text-2xl font-bold">SkillGrow</div>
          <ul className="text-slate-700 space-y-2">
            <li>123 Learning St, Knowledge City</li>
            <li>support@skillgrow.example</li>
            <li>Business: e-learning</li>
          </ul>
          <div className="flex gap-3 pt-2">
            <a className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">f</a>
            <a className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">▶</a>
            <a className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 transition-colors">◎</a>
          </div>
        </div>
        <div className="card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop"
            alt="Office map"
            className="w-full h-[260px] object-cover"
          />
        </div>
      </section>
    </div>
  )
}
