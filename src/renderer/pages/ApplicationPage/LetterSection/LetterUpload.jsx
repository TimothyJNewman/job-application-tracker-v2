import React, { useContext } from 'react';
import { Button, FilePicker } from '../../../components/microComponents';
import { toast } from 'react-hot-toast';
import { createDatabaseEntry, readDatabaseEntry, updateDatabaseEntry } from '../../../util/CRUD';
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
        const applicationID = `Application ${id}`
        createDatabaseEntry(
          `
        INSERT INTO letter_list (name, letter_url, is_uploaded)
        VALUES(?,?,?) 
        ON CONFLICT(name) 
        DO UPDATE SET letter_url=excluded.letter_url, is_uploaded=excluded.is_uploaded;
        `,
          [applicationID, savedRelativeUrl,1],
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
                              if (error) {console.error(error);return}
                                                             setAppsData(result);
                            
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
