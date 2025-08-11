import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "../data/courses"; 
import { useState, useEffect } from "react";
import { 
  getCurrentUser, 
  purchaseCourse,
  getPurchasedCourses 
} from "../lib/auth";
import toast from "react-hot-toast";

// --- Payment Modal Component (Remains the same) ---
function PaymentModal({ course, onClose, onConfirm }) {
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (cardNumber.trim().length < 10) {
      toast.error("Please enter a valid card number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onConfirm();
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
        <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
        <p className="mb-2">You are buying: <strong>{course.title}</strong></p>
        <p className="font-bold text-lg mb-4">Price: ${course.price}</p>
        <form onSubmit={handleConfirm}>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input id="cardNumber" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="input w-full" placeholder="xxxx xxxx xxxx xxxx" required />
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="btn-outline w-full h-11" disabled={isLoading}>Cancel</button>
            <button type="submit" className="btn-primary w-full h-11" disabled={isLoading}>{isLoading ? "Processing..." : `Pay $${course.price}`}</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- Main CourseDetails Component ---
export default function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const course = courses.find((c) => c.slug === slug) || null;

  // FIX: Use state to manage the user and purchased status reactively
  const [user, setUser] = useState(getCurrentUser());
  const [isPurchased, setIsPurchased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStateChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser); // Update user state on auth change
      if (currentUser && course) {
        setIsPurchased(getPurchasedCourses(currentUser.email).some((c) => c.id === course.id));
      } else {
        setIsPurchased(false);
      }
    };
    
    handleStateChange(); // Initial check

    window.addEventListener("authChanged", handleStateChange);
    window.addEventListener("coursesPurchased", handleStateChange);

    return () => {
      window.removeEventListener("authChanged", handleStateChange);
      window.removeEventListener("coursesPurchased", handleStateChange);
    };
  }, [slug, course]);

  const handlePurchaseClick = () => {
    // We can rely on the 'user' state here
    if (!user) {
      toast.error("You must be logged in to purchase.");
      navigate("/login");
      return;
    }
    if (course.price === 0) {
        confirmPurchase();
    } else {
        setIsModalOpen(true);
    }
  };

  const confirmPurchase = () => {
    // Ensure we use the latest user state
    if (user) {
      purchaseCourse(user.email, course);
      toast.success("Purchase successful! The course is now in 'My Courses'.");
    }
  };

  if (!course) {
    return <div className="container-x py-10 text-center">Course not found.</div>;
  }
  
  // The redundant `const user = getCurrentUser()` line has been removed.

  return (
    <>
      {isModalOpen && (
        <PaymentModal 
          course={course} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={confirmPurchase} 
        />
      )}
      <section className="container-x py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl shadow-lg object-cover" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-slate-700 mb-4">{course.description}</p>
            <p className="mb-4"><strong>Category:</strong> {course.category}</p>
            <p className="mb-6"><strong>Price:</strong> {course.price === 0 ? "Free" : `$${course.price}`}</p>
            
            {/* FIX: Re-introduced the logic to check if the user is logged in */}
            {user ? (
              isPurchased ? (
                <span className="btn-primary-disabled h-11 px-6 text-center">Already Purchased</span>
              ) : (
                <button onClick={handlePurchaseClick} className="btn-primary h-11 px-6">
                  {course.price === 0 ? "Enroll for Free" : `Buy for $${course.price}`}
                </button>
              )
            ) : (
              <Link to="/login" className="btn-primary h-11 px-6 inline-flex items-center">
                Login to Purchase
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
