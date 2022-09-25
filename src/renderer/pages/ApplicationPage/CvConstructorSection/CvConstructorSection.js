import React, { useState, useEffect, Fragment } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import {
  createDatabaseEntry,
  readDatabaseEntry,
  updateDatabaseEntry,
  deleteDatabaseEntry,
} from '../../../util/CRUD';
import CvSectionBuilder from './CvSectionBuilder';
import CvSectionBuilderEdit from './CvSectionBuilderEdit';
import { PlusCircleFill, XCircleFill, TrashFill } from 'react-bootstrap-icons';
import schema from '../../../constants/template2_schema';
import 'tw-elements/dist/src/js/index';
import { toast } from 'react-hot-toast';

const CvConstructorSection = ({ id, setPdfUrl }) => {
  const [elements, setElements] = useState([]);
  // Todo find way to rerender after createDatabaseEntry without this entra state
  // perhaps use the usereducer hook
  const [noElementsAdded, setNoElementsAdded] = useState(0);
  const [noElementsClicked, setNoElementsClicked] = useState(0);
  const [showCvBuilder, toggleCvBuilder] = useState(false);
  const [currentSection, setCurrentSection] = useState('basics');
  const [openJsonViewerArr, setOpenJsonViewerArr] = useState([]);

  // Handles clicks to elements in either used or unused components
  const elementToggleClickHandler = (action, deleteComponentID) => {
    // When unused element is clicked
    if (action === 'unused') {
      // If element is not already used
      if (
        !elements.filter((elem) => elem.id === deleteComponentID)[0]
          .application_id
      ) {
        createDatabaseEntry(
          'INSERT INTO cv_component_in_application (application_id, component_id) VALUES (?,?)',
          [id, deleteComponentID],
          () => {
            setNoElementsClicked(noElementsClicked + 1);
          }
        );
      }
      // If element is already used, remove it
      else {
        deleteDatabaseEntry(
          'DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?',
          [id, deleteComponentID],
          () => {
            setNoElementsClicked(noElementsClicked + 1);
          }
        );
      }
    }
    // When used element is clicked
    else if (action === 'used') {
      deleteDatabaseEntry(
        'DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?',
        [id, deleteComponentID],
        () => {
          setNoElementsClicked(noElementsClicked + 1);
        }
      );
    }
  };

  /**
   * delete component from cv_components table and cv_component_in_application if existis
   * @param {number} componentId
   */
  const elementDeleteClickHandler = (componentId) => {
    deleteDatabaseEntry(
      'DELETE FROM cv_component_in_application WHERE application_id = ? AND component_id = ?',
      [id, componentId],
      () => {}
    );
    // TODO add a check to make sure that component deleted is not referenced by another application component
    deleteDatabaseEntry(
      'DELETE FROM cv_components WHERE id = ?',
      [componentId],
      () => {
        setNoElementsClicked(noElementsClicked + 1);
      }
    );
  };

  const elementClickHandler = (componentId) => {
    if (openJsonViewerArr.includes(componentId)) {
      setOpenJsonViewerArr(
        openJsonViewerArr.filter((elem) => elem !== componentId)
      );
    } else {
      setOpenJsonViewerArr([openJsonViewerArr, componentId]);
    }
  };

  /* const generatePdfParams = {
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
   };*/

  const generatePdfParams = (schemaLocal, elementsLocal) => {
    const resumeObject = {};

    elementsLocal
      .filter((elem) => elem.application_id)
      .forEach(({ cv_component_section, cv_component_text }) => {
        if (schemaLocal[cv_component_section].constructor === Array) {
          if (resumeObject[cv_component_section]) {
            resumeObject[cv_component_section].push(
              JSON.parse(cv_component_text)
            );
          } else {
            resumeObject[cv_component_section] = [
              JSON.parse(cv_component_text),
            ];
          }
        } else if (schemaLocal[cv_component_section].constructor === Object) {
          resumeObject[cv_component_section] = JSON.parse(cv_component_text);
        }
      });

    return {
      id: id,
      name: String(id),
      resumeObject,
    };
  };

  const addCVSectionBuilderHandler = (sectionObj, sectionDesc) => {
    createDatabaseEntry(
      'INSERT INTO cv_components (cv_component_section, cv_component_text, cv_component_description, date_created) VALUES (?,?,?,?)',
      [
        sectionObj.section,
        JSON.stringify(sectionObj[sectionObj.section], null, 2),
        sectionDesc,
        new Date().toISOString(),
      ]
    );
    setNoElementsAdded(noElementsAdded + 1);
    toggleCvBuilder(false);
  };

  const editCVSectionBuilderHandler = (sectionObj, sectionDesc, id) => {
    updateDatabaseEntry(
      'UPDATE cv_components SET cv_component_text=?, cv_component_description=?, date_modified=? WHERE id=?',
      [
        JSON.stringify(sectionObj[sectionObj.section], null, 2),
        sectionDesc,
        new Date().toISOString(),
        id,
      ]
    );
    setNoElementsAdded(noElementsAdded + 1);
    toggleCvBuilder(false);
  };

  // TODO add loading animation when pdf is generating
  const generatePdf = () => {
    if (elements.filter((elem) => elem.application_id).length === 0) {
      console.error('Select cv elements before generating document!');
      toast.error('Select cv elements before generating document');
      return;
    }

    /**
     * Generate pdf in the background
     */
    window.electron
      .getPdf('get-pdf', generatePdfParams(schema, elements))
      .then((cvUrl) => {
        setPdfUrl(cvUrl);
        console.log('New CV PDF url: ', cvUrl);
        toast.success('Successfuly generated CV PDF');
      })
      .catch((error) => {
        console.error(`PDF error: ${error}`);
        toast.error(`CV Pdf Error: ${error.message}`);
      });
  };

  useEffect(() => {
    readDatabaseEntry(
      `SELECT cv_components.id, cv_components.date_created, cv_components.cv_component_section, cv_components.cv_component_text, cv_components.cv_component_description, cv_component_in_application.application_id
      FROM cv_components 
      LEFT JOIN cv_component_in_application 
      ON cv_components.id = cv_component_in_application.component_id AND cv_component_in_application.application_id = ?`,
      id,
      setElements
    );
  }, [noElementsAdded, noElementsClicked]);

  const getDescription = (elem) => {
    const { cv_component_description } = elem;
    const { name, text, institution, organization, title, language } =
      JSON.parse(elem.cv_component_text);
    return cv_component_description !== ''
      ? cv_component_description
      : name ?? text ?? institution ?? organization ?? title ?? language;
  };

  return (
    <div className='px-4'>
      <h1 id='cv-contructor' className='my-2 text-xl font-bold'>
        CV constructor{' '}
        <button
          className='has-tooltip inline px-1'
          onClick={() => toggleCvBuilder(!showCvBuilder)}
          type='button'>
          <span className='tooltip -mt-8 rounded bg-slate-100 p-1 text-base font-normal shadow-md'>
            Add new CV section
          </span>
          <PlusCircleFill
            style={{ color: `${showCvBuilder ? 'red' : ''}` }}
            className={'mx-1 mb-1 inline h-5 w-5 hover:text-purple-700'}
            alt='Add new CV section'
          />
        </button>
      </h1>
      <div className='flex flex-wrap gap-2'>
        <ul
          className='nav nav-tabs flex list-none flex-row flex-wrap border-b-0 pl-0'
          id='tabs-tab'
          role='tablist'>
          {Object.entries(schema)
            .filter(([key, value]) => value !== 'unavailable')
            .map(([key, value]) => (
              <li
                key={key}
                onClick={() => setCurrentSection(key)}
                className='nav-item'
                role='presentation'>
                <a
                  href={`#tabs-${key}`}
                  className={`${
                    key === currentSection && 'active bg-blue-50 shadow'
                  } nav-link block rounded-t border-transparent px-6 py-3 text-xs font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent`}
                  id={`tabs-${key}-tab`}
                  data-bs-toggle='pill'
                  data-bs-target={`#tabs-${key}`}
                  role='tab'
                  aria-controls={`tabs-${key}`}
                  aria-selected='false'>
                  {key}
                </a>
              </li>
              // <li
              //   key={key}
              //   onClick={() => setCurrentSection(key)}
              //   className='underline hover:cursor-pointer hover:underline-offset-4'>
              //   {key}
              // </li>
            ))}
        </ul>
        {/* <div className="tab-content" id="tabs-tabContent">
          <div className="tab-pane fade show active" id={`tabs-${currentSection}`} role="tabpanel" aria-labelledby={`tabs-${currentSection}-tab`}>
            {currentSection}
          </div>
        </div> */}
      </div>
      <div className='relative z-10 rounded-b bg-blue-50 p-2 shadow'>
        <h2 className='font-medium tracking-tight'>Used Components</h2>
        <div className='accordion' id='accordionBuilder'>
          {elements
            .filter(
              (elem) =>
                elem.application_id &&
                elem.cv_component_section === currentSection
            )
            .map((elem) => (
              <div
                key={elem.id}
                className='accordion-item border border-gray-200 bg-white'>
                <h2
                  className='accordion-header mb-0'
                  id={`accordion_builder_header_${elem.id}`}>
                  <button
                    className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-5 text-left text-base text-gray-800 transition focus:outline-none'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#accordion_builder_collapse_${elem.id}`}
                    aria-expanded='false'
                    aria-controls={`#accordion_builder_collapse_${elem.id}`}>
                    {elem?.cv_component_description}
                  </button>
                </h2>
                <div
                  id={`accordion_builder_collapse_${elem.id}`}
                  className='collapse accordion-collapse'
                  aria-labelledby={`accordion_builder_header_${elem.id}`}
                  data-bs-parent='#accordionBuilder'>
                  <div className='accordion-body w-full'>
                    <CvSectionBuilderEdit
                      elementToggleClickHandler={elementToggleClickHandler}
                      editSectionCallback={editCVSectionBuilderHandler}
                      id={elem.id}
                      currentSection={currentSection}
                      currentDescriptionDatabase={elem.cv_component_description}
                      currentFieldValuesDatabase={JSON.parse(
                        elem.cv_component_text
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <br />
        <h2 className='font-medium tracking-tight'>Unused Components</h2>
        <div className='flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block min-w-full py-2 '>
              <div className='overflow-hidden'>
                <table className='min-w-full'>
                  <thead className='border-b bg-white '>
                    <tr className='text-left text-gray-700 '>
                      <th
                        scope='col'
                        className='w-10/12  px-6 py-2 font-normal'>
                        Description
                      </th>
                      <th scope='col' className='w-1/12  px-6 py-2 font-normal'>
                        Toggle
                      </th>
                      <th scope='col' className='w-1/12  px-6 py-2 font-normal'>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {elements
                      .filter(
                        (elem) => elem.cv_component_section === currentSection
                      )
                      .map((elem) => (
                        <Fragment key={elem.id}>
                          <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
                            <td
                              onClick={() => elementClickHandler(elem.id)}
                              className='w-7/12  whitespace-nowrap px-6 py-2 font-light text-gray-900'>
                              {getDescription(elem)}
                            </td>
                            <td className='w-1/12  whitespace-nowrap px-6 py-2 font-light text-gray-900'>
                              <button
                                onClick={() =>
                                  elementToggleClickHandler('unused', elem.id)
                                }
                                className='flex w-full items-center justify-center'>
                                {elem.application_id ? (
                                  <XCircleFill className='h-5 w-5 text-red-600' />
                                ) : (
                                  <PlusCircleFill className='h-5 w-5 text-green-600' />
                                )}
                              </button>
                            </td>
                            <td className='w-1/12  whitespace-nowrap px-6 py-2 font-light text-gray-900'>
                              <button
                                onClick={() =>
                                  elementDeleteClickHandler(elem.id)
                                }
                                className='flex w-full items-center justify-center'>
                                <TrashFill className='h-5 w-5 text-red-600' />
                              </button>
                            </td>
                          </tr>
                          {openJsonViewerArr.includes(elem.id) && (
                            <tr>
                              <td colSpan={'100%'}>
                                <AceEditor
                                  mode='json'
                                  width='100%'
                                  maxLines={15}
                                  value={elem.cv_component_text}
                                  readOnly={true}
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button
          type='button'
          onClick={generatePdf}
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='my-2 ml-auto block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
          Generate CV PDF
        </button>
      </div>
      {showCvBuilder ? (
        <CvSectionBuilder
          addSectionCallback={addCVSectionBuilderHandler}
          onClickOutside={() => toggleCvBuilder(!showCvBuilder)}
        />
      ) : null}
    </div>
  );
};

export default CvConstructorSection;
