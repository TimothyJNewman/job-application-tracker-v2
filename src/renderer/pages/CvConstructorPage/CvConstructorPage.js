import React, { useContext, useState, useEffect } from 'react'
import {
  createDatabaseEntry,
  readDatabaseEntry,
  updateDatabaseEntry,
  deleteDatabaseEntry,
} from '../../util/CRUD'
import { GlobalContext } from '../../context/GlobalContext'
import CvSectionBuilder from './CvSectionBuilder'
import { PlusCircleFill } from 'react-bootstrap-icons'

const CvConstructorPage = ({ id, setPdfUrl }) => {
  const [elements, setElements] = useState([])
  const { setNotification } = useContext(GlobalContext)
  // Todo find way to rerender after createDatabaseEntry without this entra state
  // perhaps use the usereducer hook
  const [noElementsAdded, setNoElementsAdded] = useState(0)
  const [noElementsClicked, setNoElementsClicked] = useState(0)
  const [showCvBuilder, toggleCvBuilder] = useState(false)

  // Handles clicks to elements in either used or unused components
  const elementClickHandler = (code, selElem) => {
    // When unused element is clicked
    if (code === 0) {
      // If element is not already used
      if (!elements.filter((elem) => elem.id === selElem.id)[0].application_id) {
        createDatabaseEntry(
          'INSERT INTO cv_component_in_application (application_id, component_id) VALUES (?,?)',
          [id, selElem.id],
          () => {
            setNoElementsClicked(noElementsClicked + 1)
          }
        )
        console.log('Added ' + String(selElem.cv_section) + ' with id: ' + selElem.id + ' to used')
      }
      // If element is already used, remove it
      else {
        deleteDatabaseEntry(
          'DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?',
          [id, selElem.id],
          () => {
            setNoElementsClicked(noElementsClicked + 1)
          }
        )
        console.log('Removed ' + String(selElem.cv_section) + ' with id: ' + selElem.id + ' from used')
      }
    }
    // When used element is clicked
    else if (code === 1) {
      deleteDatabaseEntry(
        'DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?',
        [id, selElem.id],
        () => {
          setNoElementsClicked(noElementsClicked + 1)
        }
      )
      console.log(
        'Removed ' + String(selElem.cv_section) + ' with id: ' + selElem.id + ' from used'
      )
    }
  }

  const generatePdfParams = {
    id: id,
    name: 'CompanyA',
    paramsArray: [
      {
        section: 'summary',
        text: 'This is a summary',
      },
      {
        section: 'heading',
        name: 'Timothy Newman',
        phone: 123345,
        address: '123 Street Name, Town, State 12345',
        email: 'email@email.com',
        linkedIn: 'linkedin.com/in/timothy-jabez-newman-1406aa213/',
        gitHub: 'github.com/TimothyJNewman',
      },
      {
        section: 'education',
        institution: 'Imperial College London',
        date: 'May 2020 -- August 2020',
        course: 'Electrical and Electronic Engineering',
        location: 'London',
      },
      {
        section: 'coursework',
        itemArray: [
          'Data Structures',
          'Software Methodology',
          'Algorithms Analysis',
          'Database Management',
          'Artificial Intelligence',
          'Internet Technology',
          'Systems Programming',
          'Computer Architecture',
        ],
      },
      {
        section: 'experience',
        company: 'Company B',
        role: 'Intern',
        date: 'May 2020 -- August 2020',
        location: 'Singapore, Singapore',
        itemArray: ['ItemA', 'ItemB', 'ItemC'],
      },
      {
        section: 'project',
        title: 'Gym Reservation Bot',
        skillArray: ['Python', 'Selenium', 'Google Cloud Console'],
        date: 'January 2021',
        itemArray: [
          'Developed an automatic bot using Python and Google Cloud Console to register myself for a timeslot at my school gym.',
          'Implemented Selenium to create an instance of Chrome in order to interact with the correct elements of the web page.',
          'Created a Linux virtual machine to run on Google Cloud so that the program is able to run everyday from the cloud.',
          'Used Cron to schedule the program to execute automatically at 11 AM every morning so a reservation is made for me.',
        ],
      },
      {
        section: 'technical',
        languages: ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL'],
        tools: ['VS Code', 'Eclipse', 'Google Cloud Platform', 'Android Studio'],
        technologies: ['Linux', 'Jenkins', 'GitHub', 'JUnit', 'WordPress'],
      },
      {
        section: 'involvement',
        organisation: 'Fraternity',
        date: 'Spring 2020 -- Present',
        role: 'President',
        misc: 'University Name',
        itemArray: [
          'Achieved a 4 star fraternity ranking by the Office of Fraternity and Sorority Affairs (highest possible ranking).',
          'Managed executive board of 5 members and ran weekly meetings to oversee progress in essential parts of the chapter.',
          'Led chapter of 30+ members to work towards goals that improve and promote community service, academics, and unity.',
        ],
      },
    ],
  }

  const cvSectionBuilderHandler = (sectionObj) => {
    createDatabaseEntry(
      'INSERT INTO cv_components (cv_section, cv_component_text, date_created) VALUES (?,?,?)',
      [sectionObj.section, JSON.stringify(sectionObj), new Date().toISOString()],
      () => { }
    )
    setNoElementsAdded(noElementsAdded + 1)
    toggleCvBuilder(false)
  }

  // Todo add loading animation when pdf is generating
  const generatePdf = () => {
    if (elements.filter((e) => e.application_id).length === 0) {
      console.log('Select cv elements before generating document!')
      setNotification({
        severity: 'high',
        text: 'Select cv elements before generating document',
      })
      return
    }

    // Generate pdf in the background
    window.electron
      .getPdf('get-pdf', generatePdfParams)
      .then((result) => {
        console.log('CV Pdf url: ', result)
        updateDatabaseEntry(
          'UPDATE applications SET is_cv_ready=true, cv_url=? WHERE id=?',
          [result, id],
          (e) => {
            console.log(result)
            setPdfUrl({ isReady: true, url: result })
          }
        )
        setNotification({
          severity: 'low',
          text: 'Successfuly generated CV Pdf',
        })
      })
      .catch((error) => {
        console.log(`PDF error: ${error}`)
        setNotification({ severity: 'low', text: `CV Pdf Error: ${error}` })
      })
  }

  useEffect(() => {
    readDatabaseEntry(
      `SELECT cv_components.id, cv_components.date_created, cv_components.cv_section, cv_components.cv_component_text, cv_component_in_application.application_id
      FROM cv_components 
      LEFT JOIN cv_component_in_application 
      ON cv_components.id = cv_component_in_application.component_id AND cv_component_in_application.application_id = ?`,
      id,
      setElements
    )
  }, [noElementsAdded, noElementsClicked])

  return (
    <div className='mx-2 break-all'>
      <h1 id='cv-contructor' className='font-bold text-xl'>
        CV constructor{' '}
        <button className='has-tooltip inline px-1' onClick={() => toggleCvBuilder(!showCvBuilder)}>
          <span className='tooltip rounded shadow-md p-1 bg-slate-100 -mt-8 font-normal text-base'>
            Add new CV section
          </span>
          <PlusCircleFill
            style={{ color: `${showCvBuilder ? 'red' : ''}` }}
            className={'w-6 h-6 mx-1 mb-1 inline hover:text-purple-700'}
            alt='Add new CV section'
          />
        </button>
      </h1>
      <h2>Used Components</h2>
      <table className='w-full' style={{ transition: 'height 2s' }}>
        <thead>
          <tr className='border-y border-slate-500 divide-x divide-slate-200'>
            <th className='pr-2 w-3/12'>Section</th>
            <th className='pl-2 w-9/12'>Title</th>
          </tr>
        </thead>
        <tbody>
          {elements
            .filter((e) => e.application_id)
            .map((elem) => (
              <tr
                key={elem.id}
                onClick={() => elementClickHandler(1, elem)}
                className='w-full border-y border-slate-200 hover:bg-slate-100 cursor-pointer'>
                <td className='pr-2 w-3/12'>{elem.cv_section}</td>
                <td className='pl-2 w-9/12'>{elem?.cv_component_text}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <h2>Unused Components</h2>
      <table className='w-full'>
        <thead>
          <tr className='border-y border-slate-500 divide-x divide-slate-200'>
            <th className='pr-2 w-3/12'>Section</th>
            <th className='pl-2 w-9/12'>Title</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((e) => (
            <tr
              key={e.id}
              onClick={() => elementClickHandler(0, e)}
              className={`w-full cursor-pointer border-y border-slate-200 hover:bg-slate-100 ${e.application_id ? 'bg-purple-700 hover:bg-purple-600 text-slate-100' : null
                }`}>
              <td className='pr-2 w-3/12'>{e.cv_section}</td>
              <td className='pl-2 w-9/12'>{e?.cv_component_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePdf} className='block my-2 ml-auto std-button'>
        Generate CV PDF
      </button>
      {showCvBuilder ? (
        <CvSectionBuilder
          addElementCallback={cvSectionBuilderHandler}
          onClickOutside={() => toggleCvBuilder(!showCvBuilder)}
        />
      ) : null}
    </div>
  )
}

export default CvConstructorPage
