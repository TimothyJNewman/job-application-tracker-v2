import React, { useContext } from 'react';
import { Button, FilePicker } from '../../../components/microComponents';
import { toast } from 'react-hot-toast';
import { readDatabaseEntry, updateDatabaseEntry } from '../../../util/CRUD';
import { GlobalContext } from '../../../context/GlobalContext';
import { Folder2Open } from 'react-bootstrap-icons';

const LetterUpload = ({ id }) => {
  const { setAppsData, userPath } = useContext(GlobalContext);

  const openFileExplorer = (path) => {};

  const saveCVPdfHandler = (uploadPdfUrl) => {
    const saveCVPdfPromise = window.electron.savePdf('save-cv', {
      applicationID: id,
      uploadPdfUrl,
    });
    saveCVPdfPromise
      .then((savedRelativeUrl) => {
        updateDatabaseEntry(
          'UPDATE applications SET cv_url=? WHERE id=?',
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
      saveCVPdfPromise,
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
                  onClick={openFileExplorer(`${userPath}${savePath}`)}
                />
              </span>
              {/* <button onClick><XLg /></button> */}
            </div>
          );
        },
        error: 'Error uploading CV PDF',
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
      label='Upload CV PDF'
      accept='.pdf'
      onChange={(event) => saveCVPdfHandler(event.target.files[0].path)}
      id='uploadCVPdfPicker'
    />
  );
};

export default LetterUpload;
