import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { Button } from '../../../components/microComponents';
import { toast } from 'react-hot-toast';
import {
  createDatabaseEntry,
  readDatabaseEntry,
  updateDatabaseEntry,
} from '../../../util/CRUD';
import { Folder2Open } from 'react-bootstrap-icons';

const LetterConstructorSection = ({ id }) => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
  const defaultLetterForm = {
    content: '',
    salutation: '',
    date: '',
    closing: '',
    receiverName: '',
    senderName: '',
    receiverAddress1: '',
    receiverAddress2: '',
    senderAddress1: '',
    senderAddress2: '',
    attached: '',
    telephone: '',
    email: '',
  }
  const coverLetterJson = JSON.parse(appsData.find((elem) => elem.id === id).letter_json) ?? {};
  const [letterFormValues, setLetterFormValues] = useState({ ...defaultLetterForm, ...coverLetterJson });

  const handleInputChange = (event) => {
    setLetterFormValues({
      ...letterFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const openFileExplorer = (path) => {
    window.electron.openFolder(path);
  };

  const generatePdf = () => {
    // TODO add check for valid input
    /**
     * Generate pdf in the background
     */
    const getPdfPromise = window.electron.getPdf('generate-pdf', 'letter', {
      name: String(id),
      detailsObject: letterFormValues,
      dateString: new Date().toISOString().split(/[:.-]/).join('_')
    });
    // getPdfPromise
    //   .then((relativeLetterUrl) => {
    //     updateDatabaseEntry(
    //       'UPDATE applications SET cover_letter_url=?, cover_letter_json=? WHERE id=?',
    //       [relativeLetterUrl, JSON.stringify(letterFormValues), id],
    //       ({ error }) => {
    //         if (error) console.error(error);
    //         readDatabaseEntry(
    //           'SELECT applications.*, seasons.season, cv_list.cv_url, letter_list.letter_url, letter_list.letter_json FROM applications LEFT JOIN seasons ON applications.season_id = seasons.id LEFT JOIN cv_list ON applications.cv_id = cv_list.id LEFT JOIN letter_list ON applications.letter_id = letter_list.id',
    //           null,
    //           ({ error, result }) => {
    //             if (error) console.error(error);
    //             setAppsData(result);
    //           }
    //         );
    //       }
    //     );
    //     console.log('New Letter PDF url: ', relativeLetterUrl);
    //   })
    //   .catch((error) => {
    //     console.error(`PDF error: ${error}`);
    //   });
    getPdfPromise
      .then((savedRelativeUrl) => {
        const applicationID = `Application ${id}`
        createDatabaseEntry(
          `
          INSERT INTO letter_list (name, letter_url, is_uploaded)
          VALUES(?,?,?) 
          ON CONFLICT(name) 
          DO UPDATE SET letter_url=excluded.letter_url, is_uploaded=excluded.is_uploaded;
          `,
          [applicationID, savedRelativeUrl, 0],
          ({ error }) => {
            if (error) console.error(error);
            else {
              readDatabaseEntry(
                "SELECT id FROM letter_list WHERE name=? AND letter_url=?",
                [applicationID, savedRelativeUrl],
                ({ error, result }) => {
                  if (error) console.error(error);
                  else {
                    updateDatabaseEntry(
                      'UPDATE applications SET letter_id=? where id=?', [result[0].id, id], ({ error }) => {
                        if (error) console.error(error);
                        else {
                          readDatabaseEntry(
                            `SELECT applications.*, seasons.season, cv_list.cv_url, letter_list.letter_url, letter_list.letter_json 
                          FROM applications 
                          LEFT JOIN seasons 
                          ON applications.season_id = seasons.id 
                          LEFT JOIN cv_list 
                          ON applications.cv_id = cv_list.id 
                          LEFT JOIN letter_list 
                          ON applications.letter_id = letter_list.id`,
                            null,
                            ({ error, result }) => {
                              if (error) console.error(error);
                              else {
                                console.log(result)
                                setAppsData(result);
                              }
                            }
                          );
                        }
                      })
                  }
                }
              )
            }
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    toast.promise(
      getPdfPromise,
      {
        loading: 'Loading',
        success: (savePath) => {
          return (
            <div className='flex'>
              <span className='grow'>
                Successfully generated Letter PDF{' '}
                <Button
                  Icon={Folder2Open}
                  value='Open'
                  onClick={() => openFileExplorer(`${userPath}${savePath}`)}
                />
              </span>
            </div>
          );
        },
        error: (error) => {
          console.error(error);
          return 'Error generating Letter PDF';
        },
      },
      {
        success: {
          duration: 10000,
        },
      }
    );
  };

  return (
    <div className='mb-2 pl-0.5'>
      <div className='my-2 flex justify-between'>
        <h1 id='cv-contructor' className='text-lg font-bold'>
          Letter constructor
        </h1>
        <Button onClick={generatePdf} value='Generate Letter Pdf' />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='senderName'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Name
        </label>
        <input
          type='text'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Sender Name'
          name='senderName'
          id='senderName'
          value={letterFormValues.senderName}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='senderAddress1'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Address Line 1
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='123 Pleasant Lane'
          name='senderAddress1'
          id='senderAddress1'
          value={letterFormValues.senderAddress1}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='senderAddress2'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Sender Address Line 2
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='City, State 12345'
          name='senderAddress2'
          id='senderAddress2'
          value={letterFormValues.senderAddress2}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='receiverName'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Name
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Recepiant Name'
          name='receiverName'
          id='receiverName'
          value={letterFormValues.receiverName}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='receiverAddress1'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Address Line 1
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='123 Broadway'
          name='receiverAddress1'
          id='receiverAddress1'
          value={letterFormValues.receiverAddress1}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='receiverAddress2'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Receipient Address Line 2
        </label>
        <input
          type='text'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='City, State 12345'
          name='receiverAddress2'
          id='receiverAddress2'
          value={letterFormValues.receiverAddress2}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Email
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='john.doe@yahoo.com'
          name='email'
          id='email'
          value={letterFormValues.email}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='telephone'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Telephone
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='(000) 000-0000'
          name='telephone'
          id='telephone'
          value={letterFormValues.telephone}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='date'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Date
        </label>
        <input
          type='date'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Date'
          name='date'
          id='date'
          value={letterFormValues.date}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='salutation'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Salutation
        </label>
        <input
          type='text'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Salutation'
          name='salutation'
          id='salutation'
          value={letterFormValues.salutation}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='content'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Content
        </label>
        <textarea
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          name='content'
          id='content'
          value={letterFormValues.content}
          onChange={(event) => handleInputChange(event)}
          rows='3'
          placeholder='Content'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='closing'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Closing
        </label>
        <input
          type='text'
          className=' form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='Closing'
          name='closing'
          id='closing'
          value={letterFormValues.closing}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='attached'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          Attached
        </label>
        <textarea
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          name='attached'
          id='attached'
          value={letterFormValues.attached}
          onChange={(event) => handleInputChange(event)}
          rows='3'
          placeholder='Curriculum Vitae and grades transcript'
        />
      </div>
    </div>
  );
};

export default LetterConstructorSection;
