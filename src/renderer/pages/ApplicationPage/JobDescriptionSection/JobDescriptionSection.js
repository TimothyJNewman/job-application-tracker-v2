import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { toast } from 'react-hot-toast';
import { updateDatabaseEntry, readDatabaseEntry } from '../../../util/CRUD';
import PdfDisplay from '../../../components/PdfDisplay';

const JobDescriptionSection = ({ id }) => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);
  const [textArea, setTextArea] = useState('');

  useEffect(() => {
    setTextArea(appDetails.job_description)
  }, [appDetails.job_description])

  const saveJobDescPdfHandler = (uploadPdfUrl) => {
    const saveJobDescPdfPromise = window.electron
      .saveJobDescPdf('save-job-description', {
        applicationID: id,
        uploadPdfUrl,
      })
      .then((savedRelativeUrl) => {
        updateDatabaseEntry(
          'UPDATE applications SET job_description_url=? WHERE id=?',
          [savedRelativeUrl, id],
          ({ error }) => {
            if (error) console.error(error);
            readDatabaseEntry(
              'SELECT * FROM applications',
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
        console.error(error);
      });
    toast.promise(saveJobDescPdfPromise, {
      loading: 'Loading',
      success: 'Successfully uploaded PDF',
      error: 'Error uploading job description PDF',
    });
  };

  const saveJobDescTextHandler = () => {
    updateDatabaseEntry(
      'UPDATE applications SET job_description=? WHERE id=?',
      [textArea, id],
      ({ error }) => {
        if (error) {
          console.error(error);
          toast.error("Error: Job description text not saved")
        }
        readDatabaseEntry(
          'SELECT * FROM applications',
          null,
          ({ error, result }) => {
            if (error) {
              console.error(error);
              toast.error("Error: Job description text not saved")
            }
            toast.success("Successfully saved job description text")
            setAppsData(result);
          }
        );
      }
    );
  };

  return (
    <div className='px-4'>
      <h1 id='job-description' className='my-2 text-xl font-bold'>
        Job Description
      </h1>
      <div className='flex flex-col gap-x-4 overflow-x-auto md:flex-row'>
        <div className='grow'>
          <textarea
            className='mb-2 h-48 w-full rounded border-2 border-transparent outline-none focus:border-blue-500'
            value={textArea}
            onChange={(event) => setTextArea(event.target.value)}></textarea>
          <div className='flex justify-end'><button
            type='button'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
            onClick={saveJobDescTextHandler}
            className='inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
            Save
          </button></div>
        </div>
        <div>
          {appDetails.job_description_url !== null ? (
            <PdfDisplay
              url={`atom://${userPath}${appDetails.job_description_url}`}
            />
          ) : (
            <p className='pt-4'>No Job Description PDF found. Upload a PDF.</p>
          )}
          <div className='my-2 w-96 px-4'>
            <label
              htmlFor='uploadPdfPicker'
              className='form-label mb-2 inline-block text-gray-700'>
              Upload Job Description File
            </label>
            <input
              accept='.pdf'
              onChange={(event) =>
                saveJobDescPdfHandler(event.target.files[0].path)
              }
              className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
              type='file'
              id='uploadPdfPicker'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionSection;
