import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  getCurrentUser, 
  purchaseCourse,
  getPurchasedCourses 
} from "../lib/auth";
import toast from "react-hot-toast";

// --- مكون النافذة المنبثقة للدفع ---
function PaymentModal({ course, onClose, onConfirm }) {
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    // تحقق بسيط من أن الحقل ليس فارغًا
    if (cardNumber.trim().length < 10) {
      toast.error("Please enter a valid card number.");
      return;
    }
    setIsLoading(true);
    // محاكاة طلب الشبكة لإتمام الدفع
    setTimeout(() => {
      onConfirm();
      setIsLoading(false);
      onClose(); // إغلاق النافذة بعد النجاح
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      {/* النقر على الخلفية يغلق النافذة */}
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
        <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
        <p className="mb-2">You are buying: <strong>{course.title}</strong></p>
        <p className="font-bold text-lg mb-4">Price: ${course.price}</p>
        <form onSubmit={handleConfirm}>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="input w-full"
            placeholder="xxxx xxxx xxxx xxxx"
            required
          />
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onClose} className="btn-outline w-full h-11" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary w-full h-11" disabled={isLoading}>
              {isLoading ? "Processing..." : `Pay $${course.price}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- مكون بطاقة الدورة الرئيسي ---
export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStateChange = () => {
      const user = getCurrentUser();
      if (user) {
        setIsPurchased(getPurchasedCourses(user.email).some((c) => c.id === course.id));
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
  }, [course.id]);

  const handlePurchaseClick = () => {
    const user = getCurrentUser();
    if (!user) {
      toast.error("You must be logged in to purchase.");
      navigate("/login");
      return;
    }
    if (course.price === 0) {
        confirmPurchase();
    } else {
        setIsModalOpen(true); // وإلا، افتح نافذة الدفع
    }
  };

  const confirmPurchase = () => {
    const user = getCurrentUser();
    purchaseCourse(user.email, course);
    toast.success("Purchase successful! The course is now in 'My Courses'.");
  };

  return (
    <>
      {isModalOpen && (
        <PaymentModal 
          course={course} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={confirmPurchase} 
        />
      )}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
        <Link to={`/courses/${course.slug}`}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-indigo-600 font-semibold">{course.category}</p>
          <h3 className="font-bold text-lg mt-1">{course.title}</h3>
          <div className="mt-auto pt-4 flex justify-between items-center gap-2">
            <Link to={`/courses/${course.slug}`} className="btn-outline h-10 text-sm flex-1 text-center">
              Details
            </Link>
            {isPurchased ? (
              <span className="btn-primary-disabled h-10 text-sm flex-1 text-center">Purchased</span>
            ) : (
              <button onClick={handlePurchaseClick} className="btn-primary h-10 text-sm flex-1">
                {course.price === 0 ? "Enroll for Free" : `Buy for $${course.price}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
