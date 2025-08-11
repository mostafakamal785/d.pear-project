import { images } from "../images";

export const courses = [
  {
    id: 1,
    title: "Web Development Basics",
    slug: "web-development-basics", // الرابط الفريد
    category: "Development",
    price: 0,
    description: "Learn HTML, CSS, and JavaScript from scratch.",
    thumbnail: images.courses[0],
  },
  {
    id: 2,
    title: "Advanced React",
    slug: "advanced-react",
    category: "Development",
    price: 50,
    description: "Master React with hands-on real-world projects.",
    thumbnail: images.courses[1],
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    category: "Design",
    price: 30,
    description: "Learn how to design beautiful and user-friendly interfaces.",
    thumbnail: images.courses[2],
  },
  {
    id: 4,
    title: "Data Science with Python",
    slug: "data-science-with-python",
    category: "Data Science",
    price: 70,
    description: "Analyze data and build predictive models using Python.",
    thumbnail: images.courses[3],
  },
  {
    id: 5,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    category: "Development",
    price: 45,
    description: "Build cross-platform apps using React Native.",
    thumbnail: images.courses[4],
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    category: "Security",
    price: 60,
    description: "Learn how to secure applications and protect against threats.",
    thumbnail: images.courses[5],
  },
];
