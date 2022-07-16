import React, { useEffect, useState, useReducer, useRef } from 'react'
import useClickOutside from '../../util/useClickOutside'
import { PlusCircleFill, XCircleFill } from 'react-bootstrap-icons'

const reducer = (state, action) => {
  let newState
  if (action.status === 'initialLoad') {
    newState = { section: action.section, ...action.defaultState }
  } else if (action.status === 'inputChange') {
    newState = { ...state }
    const [name, index] = action.name.split('.')
    // for array inputs
    if (index) {
      let newInputArray = [...state[name]]
      newInputArray[index] = action.value
      newState[name] = newInputArray
    }
    // for non-array inputs
    else {
      newState[action.name] = action.value
    }
  } else if (action.status === 'addArrayInput') {
    newState = { ...state }
    newState[action.name] = [...newState[action.name], '']
  } else if (action.status === 'removeArrayInput') {
    newState = { ...state }
    newState[action.name] = newState[action.name].splice(action.index, 1)
  }
  return newState
}

const paramsStructure = {
  summary: {
    text: 'longText',
  },
  heading: {
    name: 'shortText',
    phone: 'number',
    address: 'longText',
    email: 'shortText',
    linkedIn: 'shortText',
    gitHub: 'shortText',
  },
  education: {
    institution: 'shortText',
    date: 'shortText',
    course: 'shortText',
    location: 'shortText',
  },
  coursework: {
    itemArray: 'shortTextArray',
  },
  experience: {
    company: 'shortText',
    role: 'shortText',
    date: 'shortText',
    location: 'shortText',
    itemArray: 'shortTextArray',
  },
  project: {
    title: 'shortText',
    skillArray: 'shortTextArray',
    date: 'shortText',
    itemArray: 'shortTextArray',
  },
  technical: {
    languages: 'shortTextArray',
    tools: 'shortTextArray',
    technologies: 'shortTextArray',
    title: 'shortText',
  },
  involvement: {
    organisation: 'shortText',
    date: 'shortText',
    role: 'shortText',
    misc: 'shortText',
    itemArray: 'shortTextArray',
  },
}

const CvSectionBuilder = ({ addElementCallback, onClickOutside }) => {
  const [currentSection, setCurrentSection] = useState('summary')
  const [currentInputs, dispatch] = useReducer(reducer, {})
  const [currentSectionJsx, setCurrentSectionJsx] = useState([<React.Fragment key={0} />])
  const clickRef = useRef()
  useClickOutside(clickRef, 'overlay-blur', onClickOutside)

  useEffect(() => {
    const inputTypes = {
      shortText: '',
      longText: '',
      shortTextArray: [''],
      number: 0,
    }
    const defaultState = {}
    for (let input in paramsStructure[currentSection]) {
      defaultState[input] = inputTypes[paramsStructure[currentSection][input]]
    }
    dispatch({ status: 'initialLoad', defaultState, section: currentSection })
  }, [currentSection])

  useEffect(() => {
    const getSectionForm = () => {
      const inputTypesObject = {
        shortText: (name, state, key, autofocus) => (
          <React.Fragment key={key}>
            <label value={name} htmlFor={name} className='italic my-2 py-1'>
              {name}
            </label>
            <input
              autoFocus={autofocus}
              type='text'
              className='border-4 focus:border-purple-700 my-1 p-1 px-2 outline-none'
              name={name}
              id={name}
              value={state}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ),
        longText: (name, state, key, autofocus) => (
          <React.Fragment key={key}>
            <label htmlFor={name} className='italic my-2 py-1'>
              {name}
            </label>
            <textarea
              autoFocus={autofocus}
              className='border-4 focus:border-purple-700 my-1 p-1 px-2 outline-none'
              name={name}
              id={name}
              value={state}
              onChange={handleInputChange}></textarea>
          </React.Fragment>
        ),
        shortTextArray: (name, state, key, autofocus, multiplicity) => {
          return (
            <React.Fragment key={key}>
              <label value={name} htmlFor={name} className='italic my-1 py-1'>
                {name}
                <PlusCircleFill
                  alt='Add new'
                  className='cursor-pointer inline w-4 h-4 mx-1 mb-1 hover:text-purple-700'
                  onClick={() => addArrayInput(name)}
                />
              </label>
              <span className='flex flex-col'>
                {Array(multiplicity)
                  .fill(0)
                  .map((e, i) => (
                    <div className='flex items-center'>
                      <input
                        autoFocus={autofocus}
                        key={i}
                        className='grow border-4 focus:border-purple-700 my-1 p-1 px-2 outline-none'
                        type='text'
                        name={name + '.' + i}
                        id={name + '.' + i}
                        value={state[i]}
                        onChange={handleInputChange}
                      />
                      <XCircleFill
                        alt='Remove Input'
                        className='cursor-pointer inline w-4 h-4 mx-1 hover:text-red-500'
                        onClick={() => removeArrayInput(name, i)}
                      />
                    </div>
                  ))}
              </span>
            </React.Fragment>
          )
        },
        number: (name, state, key, autofocus) => (
          <React.Fragment key={key}>
            <label value={name} htmlFor={name} className='italic my-2 py-1'>
              {name}
            </label>
            <input
              autoFocus={autofocus}
              className='border-4 focus:border-purple-700 my-2 p-1 px-2 outline-none'
              type='number'
              name={name}
              id={name}
              value={state}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ),
        date: (name, state, key, autofocus) => (
          <React.Fragment key={key}>
            <label value={name} htmlFor={name} className='italic my-2 py-1'>
              {name}
            </label>
            <input
              autoFocus={autofocus}
              className='border-4 focus:border-purple-700 my-2 p-1 px-2 outline-none'
              type='number'
              name={name}
              id={name}
              value={state}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ),
      }
      const inputs = paramsStructure[currentInputs.section]
      const inputsJsxArray = []
      let isFirstInput = true
      for (let inputName in inputs) {
        inputsJsxArray.push(
          inputTypesObject[inputs[inputName]](
            inputName,
            currentInputs[inputName],
            inputName,
            isFirstInput,
            currentInputs[inputName].length
          )
        )
        isFirstInput = false
      }
      return inputsJsxArray
    }
    setCurrentSectionJsx(getSectionForm())
  }, [currentInputs])

  const addArrayInput = (name) => {
    dispatch({ status: 'addArrayInput', name })
  }

  const removeArrayInput = (name, index) => {
    dispatch({ status: 'removeArrayInput', name, index })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addElementCallback(currentInputs)
  }

  const handleInputChange = (e) => {
    dispatch({ status: 'inputChange', name: e.target.name, value: e.target.value })
  }

  return (
    <div className='flex fixed h-screen w-screen items-center justify-center top-0 left-0 backdrop-blur-md backdrop-brightness-75'>
      <div id='overlay-blur' className='fixed h-screen w-screen'></div>
      <div ref={clickRef} className='z-10 m-8 w-full flex items-center justify-center'>
        <div className='bg-white p-4 grow max-w-3xl'>
          <h1 id='cv-section-builder' className='font-bold text-xl'>
            {currentSection} section builder
          </h1>
          <ul className='flex flex-wrap gap-2 mb-2'>
            {Object.entries(paramsStructure).map(([k], i) => (
              <li
                key={i}
                onClick={() => setCurrentSection(k)}
                className='underline hover:underline-offset-4 hover:cursor-pointer'>
                {k}
              </li>
            ))}
          </ul>
          <form className='grid grid-cols-2 gap-4'>
            {currentSectionJsx}
            <br />
            <input type='submit' onClick={handleSubmit} className='block my-2 ml-auto std-button' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default CvSectionBuilder
