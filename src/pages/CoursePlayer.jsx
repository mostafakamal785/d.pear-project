import { useState, useMemo,} from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { FiPlayCircle, FiCheckCircle, FiChevronDown, FiChevronUp, FiDownload, FiMenu } from 'react-icons/fi';

// --- بيانات وهمية للدروس ---
const courseLessonsData = {
  "web-development-basics": [
    { module: "Introduction", lessons: ["Welcome to the Course", "Setting Up Your Development Environment"] },
    { module: "HTML Basics", lessons: ["Your First Web Page", "Understanding HTML Tags", "Working with Lists and Tables", "Forms and Inputs"] },
    { module: "CSS Fundamentals", lessons: ["Styling Your First Page", "The CSS Box Model Explained", "Mastering Flexbox", "Introduction to CSS Grid"] },
  ],
  "advanced-react": [
    { module: "Advanced Hooks", lessons: ["Deep Dive into useState", "Mastering useEffect", "Creating Custom Hooks"] },
    { module: "State Management", lessons: ["The Context API", "Introduction to Zustand", "Comparing State Management Libraries"] },
    { module: "Performance Optimization", lessons: ["Memoization with useMemo and useCallback", "Code Splitting with React.lazy"] },
  ],
  // Add other courses data here
};

// --- المكون الرئيسي للصفحة ---
export default function CoursePlayer() {
  const { slug } = useParams();
  const course = useMemo(() => courses.find(c => c.slug === slug), [slug]);
  const lessonsData = courseLessonsData[slug] || [];

  const [currentLesson, setCurrentLesson] = useState({ module: 0, lesson: 0 });
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [openModules, setOpenModules] = useState(new Set([0]));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar

  const totalLessons = useMemo(() => lessonsData.reduce((acc, mod) => acc + mod.lessons.length, 0), [lessonsData]);
  const progress = useMemo(() => totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0, [completedLessons, totalLessons]);

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setCurrentLesson({ module: moduleIndex, lesson: lessonIndex });
    setIsSidebarOpen(false); // Close mobile sidebar on lesson selection
  };

  const toggleLessonComplete = () => {
    const lessonId = `${currentLesson.module}-${currentLesson.lesson}`;
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const toggleModule = (moduleIndex) => {
    const newOpenModules = new Set(openModules);
    if (newOpenModules.has(moduleIndex)) {
      newOpenModules.delete(moduleIndex);
    } else {
      newOpenModules.add(moduleIndex);
    }
    setOpenModules(newOpenModules);
  };
  
  // Corrected the link to point to /dashboard
  const backLink = "/dashboard";

  if (!course) {
    return <div className="container-x py-10 text-center">Course not found.</div>;
  }

  const currentLessonTitle = lessonsData[currentLesson.module]?.lessons[currentLesson.lesson] || "Select a lesson";

  const SidebarContent = () => (
    <aside className="w-full lg:w-96 bg-white border-l border-slate-200 flex-shrink-0">
      <div className="p-6 sticky top-0 h-screen overflow-y-auto">
        <h2 className="font-bold text-xl mb-2">{course.title}</h2>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-slate-500 mb-6">{Math.round(progress)}% Complete ({completedLessons.size} of {totalLessons})</p>

        <div className="space-y-2">
          {lessonsData.map((module, moduleIndex) => (
            <div key={moduleIndex} className="bg-slate-50 rounded-lg">
              <button onClick={() => toggleModule(moduleIndex)} className="w-full flex justify-between items-center p-3 font-semibold text-left">
                <span>{module.module}</span>
                {openModules.has(moduleIndex) ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openModules.has(moduleIndex) && (
                <ul className="p-2 pt-0">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const lessonId = `${moduleIndex}-${lessonIndex}`;
                    const isCurrent = currentLesson.module === moduleIndex && currentLesson.lesson === lessonIndex;
                    const isCompleted = completedLessons.has(lessonId);
                    return (
                      <li key={lessonIndex}>
                        <button onClick={() => handleLessonClick(moduleIndex, lessonIndex)} className={`w-full text-left p-3 rounded-md flex items-center gap-3 text-sm transition-colors ${isCurrent ? 'bg-indigo-100 text-indigo-700 font-bold' : 'hover:bg-slate-200'}`}>
                          {isCompleted ? <FiCheckCircle className="text-green-500 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0"></div>}
                          <span>{lesson}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Main Content */}
      <main className="flex-1">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <Link to={backLink} className="text-indigo-600 hover:underline text-sm">&larr; Back to Dashboard</Link>
              <button className="lg:hidden btn-outline h-10" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FiMenu className="mr-2"/> Course Menu
              </button>
            </div>
            
            <div className="bg-black aspect-video rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
              <FiPlayCircle className="text-7xl text-white/50" />
              <p className="absolute bottom-4 text-sm bg-black/50 px-2 py-1 rounded">Video for: <strong>{currentLessonTitle}</strong></p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">{currentLessonTitle}</h1>
                <button onClick={toggleLessonComplete} className={`btn-outline h-10 text-sm w-full sm:w-auto ${completedLessons.has(`${currentLesson.module}-${currentLesson.lesson}`) ? 'border-green-500 text-green-600 bg-green-50' : ''}`}>
                  <FiCheckCircle className="mr-2" />
                  {completedLessons.has(`${currentLesson.module}-${currentLesson.lesson}`) ? 'Completed' : 'Mark as Complete'}
                </button>
              </div>
              <hr className="my-5" />
              <div className="prose max-w-none">
                <h3 className="font-semibold">Lesson Resources</h3>
                <p>Here you can find notes, links, or downloadable files for this lesson. This area can contain rich text, images, and code snippets.</p>
                <a href="#" className="text-indigo-600 flex items-center gap-2 no-underline hover:underline"><FiDownload /> Download Project Files.zip</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-80 max-w-[calc(100%-2rem)] h-full bg-white ml-auto">
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}
