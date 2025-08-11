// src/lib/auth.js

const AUTH_EVENT = "authChanged";
// تم تغيير اسم الحدث ليعكس عملية الشراء
const PURCHASE_EVENT = "coursesPurchased";

// --- دوال المصادقة الأساسية (تبقى كما هي) ---
export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return user && user.name && user.email ? user : null;
  } catch {
    return null;
  }
}
export function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Please fill in all fields.");
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((u) => u.email === email)) {
    throw new Error("This email is already registered.");
  }
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: newUser }));
}
export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );
  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: foundUser }));
  } else {
    throw new Error("Invalid email or password.");
  }
}
export function logout() {
  localStorage.removeItem("loggedInUser");
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: null }));
}

// --- دوال الشراء الجديدة (تحل محل دوال الحفظ) ---

/**
 * دالة لجلب الدورات المشتراة للمستخدم
 * @param {string} email - البريد الإلكتروني للمستخدم
 * @returns {Array} - قائمة بالدورات المشتراة
 */
export function getPurchasedCourses(email) {
    if (!email) return [];
    const key = `purchased_${email}`;
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

/**
 * دالة لشراء دورة وحفظها في قائمة المشتريات
 * @param {string} email - البريد الإلكتروني للمستخدم
 * @param {object} course - الدورة المراد شراؤها
 */
export function purchaseCourse(email, course) {
  if (!email || !course) return;
  const key = `purchased_${email}`;
  const purchased = getPurchasedCourses(email);
  if (!purchased.some((c) => c.id === course.id)) {
    purchased.push(course);
    localStorage.setItem(key, JSON.stringify(purchased));
    // إرسال حدث لإعلام المكونات بعملية الشراء الجديدة
    window.dispatchEvent(new CustomEvent(PURCHASE_EVENT));
  }
}
