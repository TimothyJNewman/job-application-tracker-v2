import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { toast } from 'react-hot-toast';
import { updateDatabaseEntry, readDatabaseEntry } from '../../../util/CRUD';
import PdfDisplay from '../../../components/PdfDisplay';
import { Button, FilePicker } from '../../../components/microComponents';
import { Folder2Open } from 'react-bootstrap-icons';
import {
  genericErrorNotification,
  genericSuccessNotification,
} from '../../../components/Notifications';

const JobDescriptionSection = ({ id }) => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
  const appDetails = appsData.find((elem) => elem.id === id);
  const [textArea, setTextArea] = useState('');

  useEffect(() => {
    setTextArea(appDetails.job_description);
  }, [appDetails]);

  const saveJobDescPdfHandler = (uploadPdfUrl) => {
    const saveJobDescPdfPromise = window.electron.savePdf('save-pdf', {
      applicationID: id,
      uploadPdfUrl,
      type: 'job_desc',
    });
    saveJobDescPdfPromise
      .then((savedRelativeUrl) => {
        updateDatabaseEntry(
          'UPDATE applications SET job_description_url=? WHERE id=?',
          [savedRelativeUrl, id],
          ({ error }) => {
            if (error) {
              console.error(error);
              return;
            }
            readDatabaseEntry(
              'SELECT applications.*, seasons.season, cv_list.cv_url, letter_list.letter_url, letter_list.letter_json FROM applications LEFT JOIN seasons ON applications.season_id = seasons.id LEFT JOIN cv_list ON applications.cv_id = cv_list.id LEFT JOIN letter_list ON applications.letter_id = letter_list.id',
              null,
              ({ error, result }) => {
                if (error) {
                  console.error(error);
                  return;
                }
                setAppsData(result);
              }
            );
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    toast.promise(
      saveJobDescPdfPromise,
      {
        loading: 'Saving PDF',
        success: (savePath) => {
          return (
            <div className='flex'>
              <span className='grow'>
                Successfully uploaded PDF{' '}
                <Button
                  Icon={Folder2Open}
                  value='Open'
                  onClick={() => openFileExplorer(`${userPath}${savePath}`)}
                />
              </span>
            </div>
          );
        },
        error: 'Error uploading job description PDF',
      },
      {
        success: {
          duration: 10000,
        },
      }
    );
  };

  const saveJobDescTextHandler = () => {
    updateDatabaseEntry(
      'UPDATE applications SET job_description=? WHERE id=?',
      [textArea, id],
      ({ error }) => {
        if (error) {
          console.error(error);
          genericErrorNotification('Error: Job description text not saved');
          return;
        }
        readDatabaseEntry(
          'SELECT applications.*, seasons.season, cv_list.cv_url, letter_list.letter_url, letter_list.letter_json FROM applications LEFT JOIN seasons ON applications.season_id = seasons.id LEFT JOIN cv_list ON applications.cv_id = cv_list.id LEFT JOIN letter_list ON applications.letter_id = letter_list.id',
          null,
          ({ error, result }) => {
            if (error) {
              console.error(error);
              genericErrorNotification('Error: Job description text not saved');
              return;
            }
            genericSuccessNotification(
              'Successfully saved job description text'
            );
            setAppsData(result);
          }
        );
      }
    );
  };

  const openFileExplorer = (path) => {
    window.electron.openFolder(path);
  };

  return (
    <div className='mb-2'>
      <h1
        id='job-description'
        className='my-2 text-xl font-bold tracking-tight'>
        Job Description
      </h1>
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <textarea
            className='px-2Z mb-2 h-48 w-full min-w-[500px] rounded border-2 border-gray-300 p-1 outline-none focus:border-blue-500'
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
              className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
              role='alert'>
              No Job Description PDF found. Upload a PDF.
            </div>
          )}
          <FilePicker
            label='Upload Job Description PDF'
            accept='.pdf'
            onChange={(event) =>
              saveJobDescPdfHandler(event.target.files[0].path)
            }
            id='uploadJobDescPdfPicker'
          />
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionSection;
