import React, { useState, useEffect, Fragment, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import {
  createDatabaseEntry,
  readDatabaseEntry,
  updateDatabaseEntry,
  deleteDatabaseEntry,
} from '../../../util/CRUD';
import CVSectionBuilder from './NewCVSectionForm';
import CVSectionBuilderEdit from './EditCVSectionForm';
import {
  PlusCircleFill,
  XCircleFill,
  TrashFill,
  PlusLg,
  Folder2Open,
} from 'react-bootstrap-icons';
import schema from '../../../constants/template2_schema';
import 'tw-elements/dist/src/js/index';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/microComponents';
import { genericErrorNotification } from '../../../components/Notifications';

const CVConstructorSection = ({ cvID }) => {
  cvID = Number(cvID)
  const { setAppsData, userPath } = useContext(GlobalContext);
  const [components, setComponents] = useState([]);
  // Todo find way to rerender after createDatabaseEntry without this entra state
  // perhaps use the usereducer hook
  const [noComponentsAdded, setNoElementsAdded] = useState(0);
  const [noComponentsClicked, setNoElementsClicked] = useState(0);
  const [currentSection, setCurrentSection] = useState('basics');
  const [openJsonViewerArr, setOpenJsonViewerArr] = useState([]);

  // Handles clicks to components in either used or unused components
  const elementToggleClickHandler = (action, deleteComponentID) => {
    // When unused element is clicked
    if (action === 'unused') {
      // If element is not already used
      if (
        components.find((elem) => elem.id === deleteComponentID).cv_id === null
      ) {
        console.log(components, deleteComponentID,cvID, components.find((elem) => elem.id === deleteComponentID))
        createDatabaseEntry(
          'INSERT INTO cv_component_link (component_id, cv_id) VALUES (?,?)',
          [deleteComponentID, cvID],
          ({ error }) => {
            if (error) console.error(error);
            else setNoElementsClicked(noComponentsClicked + 1);
          }
        );
      }
      // If element is already used, remove it
      else {
        deleteDatabaseEntry(
          'DELETE FROM cv_component_link WHERE component_id = ? AND cv_id = ?',
          [deleteComponentID, cvID],
          ({ error }) => {
            if (error) console.error(error);
            else setNoElementsClicked(noComponentsClicked + 1);
          }
        );
      }
    }
    // When used element is clicked
    else if (action === 'used') {
      console.log("trig")
      deleteDatabaseEntry(
        'DELETE FROM cv_component_link WHERE component_id = ? AND cv_id = ?',
        [deleteComponentID, cvID],
        ({ error }) => {
          if (error) console.error(error);
          setNoElementsClicked(noComponentsClicked + 1);
        }
      );
    }
  };

  /**
   * delete component from cv_components table and cv_component_links if exists
   * @param {number} componentId
   */
  const elementDeleteClickHandler = (componentID) => {
    deleteDatabaseEntry(
      'DELETE FROM cv_component_link WHERE component_id = ?',
      [componentID],
      ({ error }) => {
        if (error) console.error(error);
        // TODO add a check to make sure that component deleted is not referenced by another cv
        else {
          deleteDatabaseEntry(
            'DELETE FROM cv_components WHERE id = ?',
            [componentID],
            ({ error }) => {
              if (error) console.error(error);
              else setNoElementsClicked(noComponentsClicked + 1);
            }
          );
        }
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

  const generatePdfParams = (schemaLocal, elementsLocal) => {
    const resumeObject = {};
    elementsLocal
      .filter((elem) => elem.cv_id !== null)
      .forEach(({ section, json }) => {
        if (schemaLocal[section].constructor === Array) {
          if (resumeObject[section]) {
            resumeObject[section].push(
              JSON.parse(json)
            );
          } else {
            resumeObject[section] = [
              JSON.parse(json),
            ];
          }
        } else if (schemaLocal[section].constructor === Object) {
          resumeObject[section] = JSON.parse(json);
        }
      });

    return {
      id: cvID,
      name: String(cvID),
      detailsObject: resumeObject,
    };
  };

  const addCVSectionBuilderHandler = (sectionObj, sectionDesc) => {
    createDatabaseEntry(
      'INSERT INTO cv_components (section, json, description) VALUES (?,?,?)',
      [
        sectionObj.section,
        JSON.stringify(sectionObj[sectionObj.section], null, 2),
        sectionDesc
      ],
      ({ error }) => {
        if (error) console.error(error);
      }
    );
    setNoElementsAdded(noComponentsAdded + 1);
  };

  const editCVSectionBuilderHandler = (sectionObj, sectionDesc, id) => {
    updateDatabaseEntry(
      'UPDATE cv_components SET json=?, description=? WHERE id=?',
      [
        JSON.stringify(sectionObj[sectionObj.section], null, 2),
        sectionDesc,
        id,
      ],
      ({ error }) => {
        if (error) console.error(error);
      }
    );
    setNoElementsAdded(noComponentsAdded + 1);
  };

  const generatePdf = () => {
    if (components.find((elem) => elem.cv_id !== null) !== undefined) {
      console.error('Select CV components before generating document!');
      genericErrorNotification(
        'Error: Select CV components before generating document'
      );
      return;
    }
    /**
     * Generate pdf in the background
     */
    const getPdfPromise = window.electron.getPdf(
      'generate-pdf',
      'cv',
      generatePdfParams(schema, components)
    );
    getPdfPromise
      .then((relativeCVUrl) => {
        updateDatabaseEntry(
          'UPDATE cv_list SET cv_url=? WHERE id=?',
          [relativeCVUrl, cvID],
          ({ error }) => {
            if (error) console.error(error);
            readDatabaseEntry(
              'SELECT applications.*, seasons.season, cv_list.cv_url, letter_list.letter_url, letter_list.letter_json FROM applications LEFT JOIN seasons ON applications.season_id = seasons.id LEFT JOIN cv_list ON applications.cv_id = cv_list.id LEFT JOIN letter_list ON applications.letter_id = letter_list.id',
              null,
              ({ error, result }) => {
                if (error) console.error(error);
                setAppsData(result);
              }
            );
          }
        );
      })
      .catch((error) => {
        console.error(`PDF error: ${error}`);
      });
    toast.promise(
      getPdfPromise,
      {
        loading: 'Loading',
        success: (savePath) => {
          return (
            <div className='flex'>
              <span className='grow'>
                Successfully generated CV PDF{' '}
                <Button
                  Icon={Folder2Open}
                  value='Open'
                  onClick={() => openFileExplorer(`${userPath}${savePath}`)}
                />
              </span>
            </div>
          );
        },
        error: 'Error generating CV PDF',
      },
      {
        success: {
          duration: 10000,
        },
      }
    );
  };

  useEffect(() => {
    readDatabaseEntry(
      `SELECT cv_components.*, cv_list.id as cv_id, cv_list.cv_url
      FROM cv_components 
      LEFT JOIN cv_component_link
      ON cv_component_link.component_id = cv_components.id
      LEFT JOIN cv_list
      ON cv_component_link.cv_id = cv_list.id`,
      null,
      ({ error, result }) => {
        if (error) console.error(error);
        setComponents(result);
      }
    );
  }, [noComponentsAdded, noComponentsClicked, cvID]);

  const getDescription = (elem) => {
    const { description } = elem;
    const { name, text, institution, organization, title, language } =
      JSON.parse(elem.json);
    return description !== ''
      ? description
      : name ?? text ?? institution ?? organization ?? title ?? language;
  };

  const openFileExplorer = (path) => {
    window.electron.openFolder(path);
  };

  return (
    <div className='mb-2'>
      <div className='my-2 flex justify-between'>
        <h1 id='cv-contructor' className='text-lg font-bold'>
          CV constructor
        </h1>
        <Button onClick={generatePdf} value='Generate CV Pdf' />
      </div>
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
                  className={`${key === currentSection && 'active bg-blue-50 shadow'
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
      </div>
      <div className='relative z-10 rounded-b bg-blue-50 p-2 shadow'>
        <div className='mb-2'>
          <h2 className='font-medium tracking-tight'>Used Components</h2>
          <div className='accordion' id='accordionBuilder'>
            {components
              .filter(
                (elem) =>
                  elem.cv_id !== null &&
                  elem.section === currentSection
              )
              .map((elem) => (
                <div
                  key={elem.id}
                  className='accordion-item border border-gray-200 bg-white'>
                  <h2
                    className='accordion-header mb-0'
                    id={`accordion_builder_header_${elem.id}`}>
                    <button
                      className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-4 text-left text-base text-gray-800 transition focus:outline-none'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#accordion_builder_collapse_${elem.id}`}
                      aria-expanded='false'
                      aria-controls={`#accordion_builder_collapse_${elem.id}`}>
                      {elem?.description}
                    </button>
                  </h2>
                  <div
                    id={`accordion_builder_collapse_${elem.id}`}
                    className='collapse accordion-collapse'
                    aria-labelledby={`accordion_builder_header_${elem.id}`}
                    data-bs-parent='#accordionBuilder'>
                    <div className='accordion-body w-full'>
                      <CVSectionBuilderEdit
                        elementToggleClickHandler={elementToggleClickHandler}
                        editSectionCallback={editCVSectionBuilderHandler}
                        id={elem.id}
                        currentSection={currentSection}
                        currentDescriptionDatabase={
                          elem.description
                        }
                        currentFieldValuesDatabase={JSON.parse(
                          elem.json
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className='font-medium tracking-tight'>Unused Components</h2>
          {components.filter(
            (elem) => elem.section === currentSection
          ).length === 0 ? (
            <div
              className='mb-3 rounded-lg bg-yellow-100 py-5 px-4 text-base text-yellow-700'
              role='alert'>
              No entries available
            </div>
          ) : (
            <div className='flex flex-col'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2 '>
                  <div className='overflow-hidden'>
                    <table className='min-w-full'>
                      <thead className='border-b bg-white '>
                        <tr className='text-left text-gray-700 '>
                          <th
                            scope='col'
                            className='w-10/12 px-4 py-2 font-normal'>
                            Description
                          </th>
                          <th
                            scope='col'
                            className='w-1/12 px-4 py-2 font-normal'>
                            Toggle
                          </th>
                          <th
                            scope='col'
                            className='w-1/12 px-4 py-2 font-normal'>
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {components
                          .filter(
                            (elem) =>
                              elem.section === currentSection
                          )
                          .map((elem) => (
                            <Fragment key={elem.id}>
                              <tr className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
                                <td
                                  onClick={() => elementClickHandler(elem.id)}
                                  className='w-7/12 whitespace-nowrap px-4 py-2 font-light text-gray-900'>
                                  {getDescription(elem)}
                                </td>
                                <td className='w-1/12 whitespace-nowrap px-4 py-2 font-light text-gray-900'>
                                  <button
                                    onClick={() =>
                                      elementToggleClickHandler(
                                        'unused',
                                        elem.id
                                      )
                                    }
                                    className='flex w-full items-center justify-center'>
                                      {console.log(elem)}
                                    {elem.cv_id === null ? (
                                      <PlusCircleFill className='h-5 w-5 text-green-600' />
                                    ) : (
                                      <XCircleFill className='h-5 w-5 text-red-600' />
                                    )}
                                  </button>
                                </td>
                                <td className='w-1/12  whitespace-nowrap px-4 py-2 font-light text-gray-900'>
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
                                      value={elem.json}
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
          )}
        </div>
        <button
          type='button'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          data-bs-toggle='modal'
          data-bs-target='#newCVSectionModal'
          className='my-2 ml-auto flex items-center rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg'>
          <PlusLg className='mr-2 h-4 w-4' />
          Add section
        </button>
      </div>
      <CVSectionBuilder
        addSectionCallback={addCVSectionBuilderHandler}
        currentSection={currentSection}
      />
    </div>
  );
};

export default CVConstructorSection;
