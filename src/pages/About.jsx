import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import Logo from "../components/Logo"; 
import { images } from "../images"; 
import SectionTitle from "../components/SectionTitle";

export default function About() {
  const teamLeader = { 
    name: "مصطفي كمال محمود", 
    role: "Team Leader", 
    id: "mostafa", 
    img: images.mika, 
    linkedinUrl: "https://www.linkedin.com/in/mostafa-kamal-mahmoud-a4921123a/" 
  };

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
      <section className="container-x py-20">
        <SectionTitle title="Our Mission" align="center" />
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

      {/* Team Section - Updated Layout */}
      <section className="bg-slate-50 py-20">
        <div className="container-x text-center">
          <SectionTitle title="Meet Our Team Leader" align="center" />
          <div className="flex justify-center mt-8">
            <a href={teamLeader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block transform hover:scale-105 transition-transform">
              <div className="card p-6 w-72 border-2 border-indigo-600 shadow-lg">
                <img 
                  src={teamLeader.img} 
                  alt={teamLeader.name} 
                  className="w-40 h-40 mx-auto rounded-full object-cover ring-4 ring-indigo-300" 
                />
                <h3 className="mt-5 font-bold text-xl text-indigo-700">
                  {teamLeader.name}
                </h3>
                <p className="text-slate-600 font-semibold">
                  {teamLeader.role}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container-x py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-3">
          <Logo />
          <ul className="text-slate-700 space-y-2">
            <li>123 Learning St, Knowledge City</li>
            <li>mostafakamal78578@gmail.com</li>
            <li>Business: e-learning</li>
          </ul>
          <div className="mt-3 flex gap-3">
            <a href="#" className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors text-white"><FaFacebookF /></a>
            <a href="#" className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors text-white"><FaYoutube /></a>
            <a href="#" className="h-9 w-9 rounded-full bg-pink-500 flex items-center justify-center hover:bg-pink-600 transition-colors text-white"><FaInstagram /></a>
          </div>
        </div>
        <div className="card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1200&auto=format&fit=crop"
            alt="Man working in an office"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </section>
    </div>
  )
}
