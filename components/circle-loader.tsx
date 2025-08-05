"use client"

export const CircleLoader = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  }

  return (
    <div
      className={`rounded-full border-t-transparent border-primary animate-spin ${sizeClasses[size]} ${className}`}
    ></div>
  )
}

export default CircleLoader
