import React from "react"

const Switch = ({ isChecked, setIsChecked, id, name, label }) => {
  if (id == undefined) name = id
  return (
    <div className="form-check form-switch">
      <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" id={id} name={name} checked={isChecked} onChange={() => setIsChecked(!isChecked)} type="checkbox" role="switch" />
      {(label != null) && <label className="form-check-label inline-block text-gray-800" htmlFor={id}>{label}</label>}
    </div>
  )
}

export default Switch