import React from 'react'

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="text-white text-4xl">Loading...</div>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mt-4"></div>
    </div>
  )
}

export default LoadingScreen
