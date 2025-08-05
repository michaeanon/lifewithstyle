"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[9980]">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-gradient-to-b from-[#E3CBFF] to-[#FCEBFC] 
            border-none font-semibold flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(180,160,255,0.25)] 
            cursor-pointer transition-all duration-300 overflow-hidden relative hover:w-36 hover:rounded-full 
            group focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#7a18e5] transition-transform duration-300 group-hover:translate-y-[-200%]" />
            <span
              className="absolute bottom-[-20px] text-[#7a18e5] text-[0px] group-hover:text-sm group-hover:opacity-100 
            group-hover:bottom-auto transition-all duration-300"
            >
              Back to Top
            </span>
          </button>
        </div>
      )}
    </>
  )
}

export { BackToTop }
export default BackToTop
