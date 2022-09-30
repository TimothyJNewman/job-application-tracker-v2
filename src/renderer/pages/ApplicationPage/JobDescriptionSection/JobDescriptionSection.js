import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { toast } from 'react-hot-toast';
import { updateDatabaseEntry, readDatabaseEntry } from '../../../util/CRUD';
import PdfDisplay from '../../../components/PdfDisplay';
import { Button, FilePicker } from '../../../components/microComponents';

const JobDescriptionSection = ({ id }) => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);
  const [textArea, setTextArea] = useState('');

  useEffect(() => {
    setTextArea(appDetails.job_description);
  }, [appDetails]);

  const saveJobDescPdfHandler = (uploadPdfUrl) => {
    const saveJobDescPdfPromise = window.electron
      .savePdf('save-job-description', {
        applicationID: id,
        uploadPdfUrl,
      })
    saveJobDescPdfPromise.then((savedRelativeUrl) => {
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
    }).catch((error) => {
      console.error(error);
    });
    toast.promise(saveJobDescPdfPromise, {
      loading: 'Saving PDF',
      success: (savePath) => `Successfully uploaded PDF at ${savePath}`,
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
          toast.error('Error: Job description text not saved');
        }
        readDatabaseEntry(
          'SELECT * FROM applications',
          null,
          ({ error, result }) => {
            if (error) {
              console.error(error);
              toast.error('Error: Job description text not saved');
            }
            toast.success('Successfully saved job description text');
            setAppsData(result);
          }
        );
      }
    );
  };

  return (
    <div className='mb-2'>
      <h1 id='job-description' className='my-2 text-xl font-bold'>
        Job Description
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <textarea
            className='px-2Z mb-2 h-48 w-full rounded border-2 border-green-500 p-1 outline-none focus:border-blue-500'
            value={textArea}
            onChange={(event) => setTextArea(event.target.value)}></textarea>
          <div className='flex justify-end'>
            <Button
              onClick={saveJobDescTextHandler}
              value='Save'
              color='blue'
            />
          </div>
        </div>
        <div>
          {appDetails.job_description_url !== null ? (
            <PdfDisplay
              url={`atom://${userPath}${appDetails.job_description_url}`}
            />
          ) : (
            <div
              className='mb-3 rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
              role='alert'>
              No Job Description PDF found. Upload a PDF.
            </div>
          )}
          <FilePicker label="Upload Job Description PDF" accept=".pdf" onChange={(event) =>
            saveJobDescPdfHandler(event.target.files[0].path)
          } id="uploadJobDescPdfPicker" />
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionSection;
