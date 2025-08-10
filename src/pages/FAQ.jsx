"use client"

import { useState } from "react"

const data = [
  {
    q: "Do I get lifetime access to the course?",
    a: "Yes. Enroll once and enjoy lifetime access, including updates and new lessons as they are added.",
  },
  {
    q: "Can beginners follow along?",
    a: "Absolutely. We start from the basics and move step-by-step with practical projects.",
  },
  {
    q: "Do you provide certificates?",
    a: "Yes, certificates of completion are awarded after finishing all modules of a course.",
  },
  {
    q: "What is the refund policy?",
    a: "If the course does not meet expectations, apply for a refund within 7 days of purchase.",
  },
]

function Item({ q, a, isOpen, onClick, index }) {
  const contentId = `faq-content-${index}`
  return (
    <div className="border-b">
      <button
        className="w-full flex items-center justify-between py-4 text-left font-medium focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <h3 className="text-base">{q}</h3>
        <span className="text-xl select-none">{isOpen ? "–" : "+"}</span>
      </button>
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-4 text-ink-700">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <section className="hero-surface text-white">
        <div className="container-x py-16 text-center">
          <h1 className="text-4xl font-extrabold">Frequently Asked Questions</h1>
          <p className="text-white/80 mt-2">Common questions new learners often ask us</p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="max-w-3xl mx-auto card p-6">
          {data.map((d, i) => (
            <Item
              key={i}
              index={i}
              q={d.q}
              a={d.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
