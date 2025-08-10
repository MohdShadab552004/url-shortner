import React from 'react'

const CustomButton = ({onClick, children}) => {
  return (
    <button
      type="submit"
      className="px-4 py-3 bg-gradient-to-r from-slate-900 to-blue-500 text-white font-bold rounded-md hover:from-slate-800 hover:to-blue-600 transition"
    >
      {children}
    </button>
  )
}

export default CustomButton;