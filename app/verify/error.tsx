"use client"
import React from 'react'

const error = (
  {error}:{error:Error}
) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  )
}

export default error