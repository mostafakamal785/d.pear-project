import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="container-x py-20 text-center">
      <h1 className="text-6xl font-extrabold text-brand-700">404</h1>
      <p className="mt-4 text-lg text-slate-600">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block btn-primary h-11 px-6 shadow-md hover:shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  )
}
