import React, { useContext, useState, useEffect } from 'react';
import { readDatabaseEntry, createDatabaseEntry } from '../../util/CRUD';
import PdfDisplay from '../../components/PdfDisplay';
import { GlobalContext } from '../../context/GlobalContext';
import CVConstructorSection from './CVConstructorSection/CVConstructorSection';
import { Button, Selector } from '../../components/microComponents';

const CVPage = () => {
  const { appsData, userPath } = useContext(GlobalContext);
  const [cvList, setCVList] = useState([]);
  const [cvName, setCVName] = useState('');
  const [selectedCV, setSelectedCV] = useState({ cv_url: '', id: null });

  useEffect(() => {
    readDatabaseEntry(
      'SELECT * FROM cv_list WHERE is_uploaded=0',
      null,
      ({ result, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setCVList(result);
        if (selectedCV.id === null)
          setSelectedCV({ cv_url: result[0].cv_url, id: result[0].id });
      }
    );
  }, [selectedCV]);

  const selectCVHandler = (event) => {
    const cvID = Number(event.target.value);
    const cv_url = cvList.find(({ id }) => id === cvID).cv_url;
    setSelectedCV({ cv_url, id: cvID });
  };

  const newCV = () => {
    createDatabaseEntry(
      'INSERT INTO cv_list (name, is_uploaded) VALUES (?,?)',
      [cvName, 0],
      ({ error, result }) => {
        if (error) {
          console.error(error);
          return;
        }
        readDatabaseEntry(
          'SELECT * FROM cv_list WHERE is_uploaded=0',
          null,
          ({ result, error }) => {
            if (error) {
              console.error(error);
              return;
            }
            setCVList(result);
            const cvID = result.find(({ name }) => name === cvName).id;
            setSelectedCV({ ...selectedCV, id: cvID });
          }
        );
      }
    );
  };

  return (
    <div className='p-4'>
      <h1 id='home-page' className='text-xl font-bold tracking-tight'>
        Curriculum Vitae
      </h1>
      <p>Create a new CV!</p>
      <div className='mb-4 mt-2'>
        <label
          htmlFor='cvName'
          className='form-label mb-2 inline-block capitalize text-gray-700'>
          CV Name
        </label>
        <input
          type='text'
          className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
          placeholder='CV Name'
          name='cvName'
          id='cvName'
          value={cvName}
          onChange={(event) => setCVName(event.target.value)}
        />
      </div>
      <div className='mb-2'>
        <Selector
          options={cvList.map(({ id, name }) => ({ k: id, v: name }))}
          selected={selectedCV.id}
          onChange={selectCVHandler}
          title='Select CV'
        />
      </div>
      <Button onClick={newCV} value='New CV' />
      <div className='flex flex-col gap-y-4 overflow-x-auto md:flex-row md:gap-x-4'>
        <div className='grow'>
          <CVConstructorSection cvID={selectedCV.id} />
        </div>
        <div>
          {selectedCV.cv_url !== null ? (
            <PdfDisplay url={`atom://${userPath}${selectedCV.cv_url}`} />
          ) : (
            <div
              className='mb-3 w-[500px] rounded-lg bg-yellow-100 py-5 px-6 text-base text-yellow-700'
              role='alert'>
              No CV PDF found. Click generate PDF to create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPage;
