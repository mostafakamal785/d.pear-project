export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form logic here
  };

  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-lg card p-8">
        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          
          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm mb-1">First Name</label>
              <input id="firstName" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm mb-1">Last Name</label>
              <input id="lastName" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm mb-1">User Name</label>
            <input id="username" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">E-mail</label>
            <input id="email" type="email" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
          </div>

          {/* Password Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm mb-1">Password</label>
              <input id="password" type="password" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1">Password confirmation</label>
              <input id="confirmPassword" type="password" required className="w-full h-11 rounded-lg border border-ink-300 px-3 focus:border-brand-500 focus:ring focus:ring-brand-200 outline-none" />
            </div>
          </div>

          {/* Terms */}
          <label className="inline-flex items-start gap-2 text-sm mt-2">
            <input type="checkbox" required className="h-4 w-4 relative top-0.5" />
            By signing up, I agree to the
            <span className="font-semibold text-brand-700"> Terms and Conditions</span>.
          </label>

          {/* Submit */}
          <button type="submit" className="btn-primary h-11 mt-2">Register</button>
        </form>
      </div>
    </section>
  );
}
