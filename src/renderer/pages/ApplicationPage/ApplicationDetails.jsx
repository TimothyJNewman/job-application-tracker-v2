import React, { useContext } from 'react';
import {
  EmojiFrown,
  EmojiNeutral,
  EmojiSmile,
  EmojiSunglasses,
  ArrowUpRightSquare,
} from 'react-bootstrap-icons';
import { updateDatabaseEntry } from '../../util/CRUD';
import { Selector } from '../../components/microComponents';
import { GlobalContext } from '../../context/GlobalContext';

const ApplicationDetails = ({ id, appsData, setAppsData }) => {
  const appDetails = appsData.find((elem) => elem.id === id);

  const { seasonValues } = useContext(GlobalContext);
  const updateValue = (newValue, field) => {
    let newAppsData = [...appsData];
    const acceptableFields = [
      'company',
      'role',
      'status',
      'link',
      'priority',
      'location',
      'deadline',
    ];
    if (acceptableFields.includes(field)) {
      newAppsData = newAppsData.map((elem) => {
        if (elem.id === id) return { ...elem, [field]: newValue };
        return elem;
      });
    }
    setAppsData(newAppsData);
  };

  const saveValue = (field) => {
    updateDatabaseEntry(
      `UPDATE applications SET ${field}=? WHERE id=?`,
      [appDetails[field], id],
      ({ error }) => {
        if (error) {
          console.error(error);
          return;
        }
      }
    );
  };

  const updateSeason = (newValue) => {
    const newAppsData = appsData.map((elem) => {
      if (elem.id === id) return { ...elem, season: newValue };
      return elem;
    });
    setAppsData(newAppsData);
  };

  const saveSeason = () => {
    const seasonID = seasonValues.find(
      ({ season }) => season === appDetails.season
    )?.id;
    updateDatabaseEntry(
      `UPDATE applications SET season_id=? WHERE id=?`,
      [seasonID, id],
      ({ error }) => {
        if (error) {
          console.error(error);
          return;
        }
      }
    );
  };

  return (
    <div className='flex flex-col items-start gap-x-4 sm:flex-row'>
      <div className='flex w-full justify-center pt-6 pb-2'>
        <div className='flex w-full flex-row rounded bg-blue-50 shadow transition-colors duration-100 hover:bg-gray-50'>
          <div className='flex w-full flex-col justify-start p-6 '>
            <div className='flex items-center'>
              {appDetails.status === 'Rejected' || appDetails.status === 'Expired' ? (
                <EmojiFrown className='h-5 w-5' />
              ) : appDetails.status === 'Offer' ? (
                <EmojiSmile className='h-5 w-5' />
              ) : appDetails.status === 'To apply' ? (
                <EmojiSunglasses className='h-5 w-5' />
              ) : (
                <EmojiNeutral className='h-5 w-5' />
              )}
              <input
                className='flex-grow bg-inherit p-1 text-xl font-medium text-gray-900 outline-blue-500'
                type='text'
                title='Company'
                placeholder='Company'
                value={appDetails.company}
                onChange={(event) => updateValue(event.target.value, 'company')}
                onBlur={() => saveValue('company')}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='role' className='w-24 font-medium'>
                Role
              </label>
              <input
                className='flex-grow bg-inherit p-1 text-base text-gray-700 outline-blue-500 hover:outline-blue-500'
                type='text'
                title='Role'
                placeholder='Role'
                id='role'
                value={appDetails.role}
                onChange={(event) => updateValue(event.target.value, 'role')}
                onBlur={() => saveValue('role')}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='location' className='w-24 font-medium'>
                Location
              </label>
              <input
                className='flex-grow bg-inherit p-1 text-base text-gray-700 outline-blue-500 hover:outline-blue-500'
                type='text'
                title='Location'
                id='location'
                placeholder='1600 Pennsylvania Ave., NW Washington, DC 20500'
                value={appDetails.location}
                onChange={(event) =>
                  updateValue(event.target.value, 'location')
                }
                onBlur={() => saveValue('location')}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='deadline' className='w-24 font-medium'>
                Deadline
              </label>
              <input
                className='flex-grow bg-inherit p-1 text-base text-gray-700 outline-blue-500 hover:outline-blue-500'
                type='date'
                title='Deadline'
                id='deadline'
                value={appDetails.deadline}
                onChange={(event) =>
                  updateValue(event.target.value, 'deadline')
                }
                onBlur={() => saveValue('deadline')}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='link' className='w-24 font-medium'>
                Link
              </label>
              <input
                className='flex-grow bg-inherit p-1 text-base text-gray-700 outline-blue-500'
                type='text'
                title='Link'
                id='link'
                placeholder='Link'
                value={appDetails.link}
                onChange={(event) => updateValue(event.target.value, 'link')}
                onBlur={() => saveValue('link')}
              />
              <a
                target='_blank'
                href={appDetails.link}
                data-mdb-ripple='true'
                data-mdb-ripple-color='light'
                className='ml-2 flex rounded bg-purple-600 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg'>
                <ArrowUpRightSquare className='mr-1' />
                Open
              </a>
            </div>
            <div className='flex items-center'>
              <label className='w-24 font-medium'>Status</label>
              <Selector
                options={[
                  { k: 'To apply', v: 'To apply' },
                  { k: 'Expired', v: 'Expired'},
                  { k: 'Applied', v: 'Applied' },
                  { k: 'Assessment', v: 'Assessment' },
                  { k: 'Interview', v: 'Interview' },
                  { k: 'Waiting for result', v: 'Waiting for result' },
                  { k: 'Rejected', v: 'Rejected' },
                  { k: 'Offer', v: 'Offer' },
                ]}
                title='Status'
                style={{
                  backgroundColor: 'inherit',
                  borderColor: 'transparent',
                  padding: '0.25rem',
                }}
                selected={appDetails.status}
                onChange={(event) => updateValue(event.target.value, 'status')}
                onBlur={() => saveValue('status')}
              />
            </div>
            <div className='flex items-center'>
              <label className='w-24 font-medium'>Priority</label>
              <Selector
                options={[
                  { k: 'low', v: 'Low' },
                  { k: 'medium', v: 'Medium' },
                  { k: 'high', v: 'High' },
                ]}
                title='Priority'
                style={{
                  backgroundColor: 'inherit',
                  borderColor: 'transparent',
                  padding: '0.25rem',
                }}
                className='border-transparent bg-inherit p-0'
                selected={appDetails.priority}
                onChange={(event) =>
                  updateValue(event.target.value, 'priority')
                }
                onBlur={() => saveValue('priority')}
              />
            </div>
            <div className='mt-1 min-w-[12rem] text-xs text-gray-600'>
              Season:{' '}
              <select
                onChange={(event) => updateSeason(event.target.value)}
                onBlur={() => saveSeason()}
                title='Season'
                className='bg-inherit'
                aria-label='Season selector'>
                {seasonValues
                  .map(({ season }) => ({ k: season, v: season }))
                  .map(({ k, v }) => (
                    <option
                      key={k}
                      selected={k === appDetails.season}
                      value={k}>
                      {v}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex w-full grow items-center'>
        <div className='accordion w-full' id='accordionJobDesc'>
          <div className='accordion-item border border-gray-200 bg-white'>
            <h2
              className='accordion-header mb-0'
              id='descriptionAccordionHeader'>
              <button
                className='accordion-button relative flex w-full items-center rounded-none border-0 bg-white py-2 px-5 text-left text-base text-gray-800 transition focus:outline-none'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#descriptionAccordion'
                aria-expanded='false'
                aria-controls='#descriptionAccordion'>
                Full job description
              </button>
            </h2>
            <div
              id='descriptionAccordion'
              className='collapse accordion-collapse'
              aria-labelledby='descriptionAccordionHeader'
              data-bs-parent='#accordionJobDesc'>
              <div className='accordion-body w-full px-4 py-2'>
                {appDetails.job_description}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ApplicationDetails;
