import React, { useContext } from 'react';
import { Button, FilePicker } from '../../../components/microComponents';
import { toast } from 'react-hot-toast';
import { readDatabaseEntry, updateDatabaseEntry } from '../../../util/CRUD';
import { GlobalContext } from '../../../context/GlobalContext';
import { Folder2Open } from 'react-bootstrap-icons';

const LetterUpload = ({ id }) => {
  const { setAppsData, userPath } = useContext(GlobalContext);

  const openFileExplorer = (path) => {
    window.electron.openFolder(path);
  };

  const saveLetterPdfHandler = (uploadPdfUrl) => {
    const saveLetterPdfPromise = window.electron.savePdf('save-pdf', {
      applicationID: id,
      uploadPdfUrl,
      type: 'letter',
    });
    saveLetterPdfPromise
      .then((savedRelativeUrl) => {
        updateDatabaseEntry(
          'UPDATE applications SET cover_letter_url=? WHERE id=?',
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
    toast.promise(
      saveLetterPdfPromise,
      {
        loading: 'Loading',
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
        error: 'Error uploading Letter PDF',
      },
      {
        success: {
          duration: 10000,
        },
      }
    );
  };

  return (
    <FilePicker
      label='Upload letter PDF'
      accept='.pdf'
      onChange={(event) => saveLetterPdfHandler(event.target.files[0].path)}
      id='uploadLetterPdfPicker'
    />
  );
};

export default LetterUpload;
