export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-surface text-white">
        <div className="container-x py-14 text-center">
          <h1 className="text-4xl font-extrabold">Contact</h1>
          <p className="text-white/80 mt-2">We'd love to hear from you</p>
        </div>
      </section>

      {/* Content */}
      <section className="container-x py-14 grid lg:grid-cols-2 gap-10">
        
        {/* Contact Form */}
        <form className="card p-6 grid gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full h-11 rounded-lg border border-slate-300 px-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full h-11 rounded-lg border border-slate-300 px-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[120px] focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              placeholder="Write your message..."
            />
          </div>
          <button className="btn-primary h-12 shadow-md hover:shadow-lg transition">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-2">Office</h3>
            <p className="text-slate-700">123 Learning St, Knowledge City</p>
            <p className="text-slate-700">support@skillgrow.example</p>
          </div>
          <div className="card overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
              alt="Map"
              className="w-full h-[260px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
