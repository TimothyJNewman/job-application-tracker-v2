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
  CalendarCheck,
  TrashFill,
  FiletypeCsv,
  PlusLg,
  ArrowUpRightSquare,
  Folder2Open,
  XLg,
} from 'react-bootstrap-icons';
import { Button } from '../../components/microComponents/';
import toast from 'react-hot-toast';

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
    header: '',
    cell: (info) => {
      let color;
      switch (info.getValue()) {
        case 'Offer':
          color = 'bg-green-500';
          break;
        case 'Rejected':
          color = 'bg-red-500';
          break;
        case 'To apply':
          color = 'bg-blue-500';
          break;
        default:
          color = 'bg-purple-500';
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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'date_applied',
    header: () => (
      <>
        <CalendarCheck className='mb-1 mr-2 inline h-4 w-4' />
        Applied
      </>
    ),
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
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
        className='flex rounded bg-blue-600 p-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
        <ArrowUpRightSquare className='mr-1' />
        Open
      </Link>
    ),
  },
];

const ApplicationSummaryPage = () => {
  const { appsData, setAppsData, userPath } = useContext(GlobalContext);
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
      'SELECT * FROM applications',
      null,
      ({ error, result }) => {
        if (error) console.error(error);
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
    const appDetails = appsData.find((elem) => elem.id === id);
    setDeleteItemDetails({
      company: appDetails.company,
      role: appDetails.role,
      id,
    });
  };

  const handleDeleteConfirmationCallback = () => {
    if (deleteMode) {
      deleteDatabaseEntry(
        'DELETE FROM cv_component_in_application WHERE application_id=?',
        deleteItemDetails.id,
        ({ error }) => {
          if (error) console.error(error);
          deleteDatabaseEntry(
            'DELETE FROM applications WHERE id=?',
            deleteItemDetails.id,
            ({ error }) => {
              if (error) console.error(error);
              setNoItemsChanged(noItemsChanged + 1);
            }
          );
        }
      );
    }
  };

  const handleSubmitCallback = (params) => {
    createDatabaseEntry(
      'INSERT INTO applications (company, role, job_description, status, link, priority, date_created) VALUES (?,?,?,?,?,?,?)',
      [
        params.company,
        params.role,
        params.job_description,
        params.status,
        params.link,
        params.priority,
        new Date().toISOString(),
      ],
      ({ error }) => {
        if (error) console.error(error);
        setNoItemsChanged(noItemsChanged + 1);
      }
    );
  };

  const exportClickHandler = () => {
    const exportCsvPromise = window.electron
      .exportToCsv('export-to-csv', appsData)
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
                  onClick={openFileExplorer(`${userPath}${savePath}`)}
                />
              </span>
              {/* <button onClick><XLg /></button> */}
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

  const openFileExplorer = (path) => {};

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='inline w-fit text-xl font-bold'>All Applications</h1>
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
        <p className='-mt-1 text-red-500'>Click on an item to delete 🡣</p>
      ) : (
        ''
      )}
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
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
