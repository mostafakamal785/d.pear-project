// src/lib/auth.js

const AUTH_EVENT = "authChanged";
const SAVE_EVENT = "coursesChanged";

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

export function getSavedCourses(email) {
    if (!email) return [];
    const key = `saved_${email}`;
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

export function addSavedCourse(email, course) {
  if (!email || !course) return;
  const key = `saved_${email}`;
  const saved = getSavedCourses(email);
  if (!saved.some((c) => c.id === course.id)) {
    saved.push(course);
    localStorage.setItem(key, JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent(SAVE_EVENT));
  }
}

export function removeSavedCourse(email, courseId) {
  if (!email || !courseId) return;
  const key = `saved_${email}`;
  let saved = getSavedCourses(email);
  const updated = saved.filter((c) => c.id !== courseId);
  localStorage.setItem(key, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(SAVE_EVENT));
}
