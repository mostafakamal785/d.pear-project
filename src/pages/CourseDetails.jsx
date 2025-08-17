import { useParams, Link, useNavigate } from "react-router-dom";
import { courses } from "../data/courses"; 
import { useState, useEffect } from "react";
import { 
  getCurrentUser, 
  purchaseCourse,
  getPurchasedCourses 
} from "../lib/auth";
import toast from "react-hot-toast";

// --- مكون نافذة الدفع المنبثقة ---
function PaymentModal({ course, onClose, onConfirm }) {
  const [paymentDetails, setPaymentDetails] = useState({ cardName: "", cardNumber: "", expiryDate: "", cvc: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!paymentDetails.cardName.trim()) newErrors.cardName = "Name is required.";
    if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Enter a valid 16-digit card number.";
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentDetails.expiryDate)) newErrors.expiryDate = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(paymentDetails.cvc)) newErrors.cvc = "Enter a valid CVC.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

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
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
        <p className="mb-4">You are buying: <strong>{course.title}</strong> for <strong>${course.price}</strong></p>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input id="cardName" name="cardName" type="text" value={paymentDetails.cardName} onChange={handleChange} className={`input w-full ${errors.cardName ? 'border-red-500' : ''}`} placeholder="John M. Doe" />
            {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input id="cardNumber" name="cardNumber" type="text" value={paymentDetails.cardNumber} onChange={handleChange} className={`input w-full ${errors.cardNumber ? 'border-red-500' : ''}`} placeholder="xxxx xxxx xxxx xxxx" />
            {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input id="expiryDate" name="expiryDate" type="text" value={paymentDetails.expiryDate} onChange={handleChange} className={`input w-full ${errors.expiryDate ? 'border-red-500' : ''}`} placeholder="MM/YY" />
              {errors.expiryDate && <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input id="cvc" name="cvc" type="text" value={paymentDetails.cvc} onChange={handleChange} className={`input w-full ${errors.cvc ? 'border-red-500' : ''}`} placeholder="123" />
              {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="btn-outline w-full h-11" disabled={isLoading}>Cancel</button>
            <button type="submit" className="btn-primary w-full h-11" disabled={isLoading}>{isLoading ? "Processing..." : `Pay $${course.price}`}</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- المكون الرئيسي لصفحة تفاصيل الدورة ---
export default function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const course = courses.find((c) => c.slug === slug) || null;

  const [user, setUser] = useState(getCurrentUser());
  const [isPurchased, setIsPurchased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStateChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser && course) {
        setIsPurchased(getPurchasedCourses(currentUser.email).some((c) => c.id === course.id));
      } else {
        setIsPurchased(false);
      }
    };
    
    handleStateChange();

    window.addEventListener("authChanged", handleStateChange);
    window.addEventListener("coursesPurchased", handleStateChange);

    return () => {
      window.removeEventListener("authChanged", handleStateChange);
      window.removeEventListener("coursesPurchased", handleStateChange);
    };
  }, [slug, course]);

  const handlePurchaseClick = () => {
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
    if (user) {
      purchaseCourse(user.email, course);
      toast.success("Purchase successful! The course is now in 'My Courses'.");
    }
  };

  if (!course) {
    return <div className="container-x py-10 text-center">Course not found.</div>;
  }

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
            
            {user ? (
              isPurchased ? (
                <Link to={`/course/${course.slug}/watch`} className="btn-primary h-12 px-8 text-lg inline-flex items-center justify-center">
                  Start Learning
                </Link>
              ) : (
                <button onClick={handlePurchaseClick} className="btn-primary h-12 px-8 text-lg">
                  {course.price === 0 ? "Enroll for Free" : `Buy for $${course.price}`}
                </button>
              )
            ) : (
              <Link to="/login" className="btn-primary h-12 px-8 text-lg inline-flex items-center">
                Login to Purchase
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
