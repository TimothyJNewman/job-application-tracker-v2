import React from "react"

const Selector = ({ options, selected, onChange }) => (
  <div className="min-w-[9rem] xl:max-w-[96rem]">
    <select onChange={onChange} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
      {options.map(({ k, v }) => <option key={k} selected={k === selected} value={k}>{v}</option>)}
    </select>
  </div>
)

export default Selector