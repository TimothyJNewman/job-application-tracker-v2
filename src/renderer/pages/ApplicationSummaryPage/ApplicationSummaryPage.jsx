import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NewApplicationForm from './NewApplicationForm';
import DeleteApplicationModal from './DeleteComponentModal';
import {
  createDatabaseEntry,
  deleteDatabaseEntry,
  readDatabaseEntry,
} from '../../util/CRUD';
import { GlobalContext } from '../../context/GlobalContext';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  SortAlphaDown,
  SortAlphaDownAlt,
  TrashFill,
  FiletypeCsv,
  PlusLg,
  ArrowUpRightSquare,
  Folder2Open,
} from 'react-bootstrap-icons';
import { Button } from '../../components/microComponents';
import toast from 'react-hot-toast';
import { genericErrorNotification } from '../../components/Notifications';

const columns = [
  // {
  //   accessorKey: 'id',
  //   header: 'Id',
  //   headerCellProps: {
  //     className: 'w-8',
  //   },
  //   bodyCellProps: {
  //     className: 'w-8',
  //   },
  // },
  {
    accessorKey: 'status',
    id: 'status_color',
    header: '',
    cell: (info) => {
      let color;
      switch (info.getValue()) {
        case 'Offer':
          color = 'bg-green-600';
          break;
        case 'Rejected':
          color = 'bg-red-600';
          break;
        case 'To apply':
          color = 'bg-blue-600';
          break;
        default:
          color = 'bg-purple-600';
          break;
      }
      return <div className={`h-5 w-1 ${color}`}></div>;
    },
    bodyCellProps: { className: 'pr-0 w-0.5' },
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const str = info.getValue();
      let bgColor;
      switch (str) {
        case 'Offer':
          bgColor = 'bg-green-600';
          break;
        case 'Rejected':
          bgColor = 'bg-red-600';
          break;
        case 'To apply':
          bgColor = 'bg-blue-600';
          break;
        default:
          bgColor = 'bg-purple-600';
          break;
      }
      return (
        <span className={`${bgColor} rounded py-1 px-2 text-white`}>
          {str.charAt(0).toUpperCase() + str.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: (info) => {
      const str = info.getValue();
      let bgColor;
      switch (str) {
        case 'low':
          bgColor = 'bg-blue-600';
          break;
        case 'medium':
          bgColor = 'bg-green-600';
          break;
        case 'high':
          bgColor = 'bg-red-600';
          break;
        default:
          break;
      }
      return (
        <span className={`${bgColor} rounded py-1 px-2 text-white`}>
          {str.charAt(0).toUpperCase() + str.slice(1)}
        </span>
      );
    },
  },
  {
    id: 'documents',
    header: 'Docs',
    headerCellProps: {
      className: 'w-12',
    },
    bodyCellProps: {
      className: 'w-12 text-center',
    },
    cell: (info) => (
      <Link
        type='button'
        to={`/application/${info.row.original.id}`}
        data-mdb-ripple='true'
        data-mdb-ripple-color='light'
        className='flex rounded bg-gray-200 p-2 text-xs font-medium uppercase leading-tight text-gray-700 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:text-white active:shadow-lg'>
        <ArrowUpRightSquare
          className='mr-1 h-4 w-4'
          style={{ stokeWidth: 5 }}
        />
        Open
      </Link>
    ),
  },
];

const ApplicationSummaryPage = () => {
  const { appsData, setAppsData, userPath, seasonValues, currentSeason } =
    useContext(GlobalContext);
  const [deleteMode, setDeleteMode] = useState(false);
  const [bsToggleContent, setBSToggleContent] = useState({});
  const [deleteItemDetails, setDeleteItemDetails] = useState({
    comapny: '',
    role: '',
    id: null,
  });
  const [noItemsChanged, setNoItemsChanged] = useState(0);

  const table = useReactTable({
    data: appsData,
    columns,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
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
  }, [noItemsChanged]);

  useEffect(() => {
    if (deleteMode) {
      setBSToggleContent({
        'data-bs-toggle': 'modal',
        'data-bs-target': '#deleteModal',
      });
    } else {
      setBSToggleContent({});
    }
  }, [deleteMode]);

  const handleApplicationClick = (id) => {
    if (deleteMode) {
      const appDetails = appsData.find((elem) => elem.id === id);
      setDeleteItemDetails({
        company: appDetails.company,
        role: appDetails.role,
        id,
      });
    }
  };

  const handleDeleteConfirmationCallback = () => {
    deleteDatabaseEntry(
      'DELETE FROM applications WHERE id=?',
      deleteItemDetails.id,
      ({ error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setNoItemsChanged(noItemsChanged + 1);
      }
    );
  };

  const handleSubmitCallback = (params) => {
    const currentDate = new Date().toISOString();
    const seasonID = seasonValues.find(
      ({ season }) => season === currentSeason
    )?.id;
    if (seasonID === undefined) {
      genericErrorNotification('Error: No season selected. Go to settings.');
      return;
    }
    createDatabaseEntry(
      'INSERT INTO applications (company, role, job_description, status, link, priority, location, deadline, date_created, date_modified, season_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [
        params.company,
        params.role,
        params.job_description,
        params.status,
        params.link,
        params.priority,
        params.location,
        params.deadline,
        currentDate,
        currentDate,
        seasonID,
      ],
      ({ error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setNoItemsChanged(noItemsChanged + 1);
      }
    );
  };

  const exportClickHandler = () => {
    // only select a few columns from database in export
    const exportDataArray = appsData.map(
      ({ company, role, location, link, status, priority }) => ({
        company,
        role,
        location,
        link,
        status,
        priority,
      })
    );
    const exportCsvPromise = window.electron
      .exportToCsv('export-to-csv', exportDataArray)
      .catch((error) => {
        console.error(error);
      });
    toast.promise(
      exportCsvPromise,
      {
        loading: 'Loading',
        success: (savePath) => {
          return (
            <div className='flex'>
              <span className='grow'>
                Successfully exported to CSV{' '}
                <Button
                  Icon={Folder2Open}
                  value='Open'
                  onClick={() => openFileExplorer(`${userPath}\\${savePath}`)}
                />
              </span>
            </div>
          );
        },
        error: 'Error exporting CSV',
      },
      {
        success: {
          duration: 10000,
        },
      }
    );
  };

  const openFileExplorer = (path) => {
    window.electron.openFolder(path);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='inline w-fit text-xl font-bold tracking-tight'>
          All Applications
        </h1>
        <div className='flex gap-x-2'>
          <Button
            Icon={FiletypeCsv}
            value='Export'
            color='purple'
            onClick={exportClickHandler}
          />
          <Button
            Icon={TrashFill}
            value='Delete'
            color='red'
            onClick={() => setDeleteMode(!deleteMode)}
          />
        </div>
      </div>
      {deleteMode ? (
        <p className='-mt-3 text-red-500'>Click on an item to delete 🡣</p>
      ) : (
        ''
      )}
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full py-2'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='border-b bg-white'>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          scope='col'
                          className={`px-4 py-2 text-left font-medium text-gray-900 ${
                            header.column.columnDef.headerCellProps
                              ?.className ?? ''
                          }`}>
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: (
                                  <SortAlphaDown className='mb-1 ml-1 inline h-4 w-4' />
                                ),
                                desc: (
                                  <SortAlphaDownAlt className='mb-1 ml-1 inline h-4 w-4' />
                                ),
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`${
                        deleteMode && 'cursor-pointer'
                      } group border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100`}
                      onClick={() => handleApplicationClick(row.original.id)}
                      {...bsToggleContent}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`whitespace-nowrap px-4 py-2 font-light text-gray-900 ${
                            cell.column.columnDef.bodyCellProps?.className ?? ''
                          }`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='my-2'>
        <Button
          Icon={PlusLg}
          color='blue'
          value='Add new'
          additionalAttributes={{
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addNewModal',
          }}
        />
      </div>
      <NewApplicationForm handleSubmitCallback={handleSubmitCallback} />
      <DeleteApplicationModal
        handleSubmitCallback={handleDeleteConfirmationCallback}
        deleteApplicationName={`${deleteItemDetails.role} at ${deleteItemDetails.company}`}
      />
    </div>
  );
};

export default ApplicationSummaryPage;
