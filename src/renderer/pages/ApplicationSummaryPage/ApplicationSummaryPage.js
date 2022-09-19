import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddApplicationForm from '../../components/AddApplicationForm';
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
  EnvelopeFill,
  TrashFill,
  FilePersonFill,
  PlusLg,
} from 'react-bootstrap-icons';

const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className:
        'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
  },
  {
    accessorKey: 'date_applied',
    header: () => (
      <>
        <CalendarCheck className='mb-1 mr-1 inline h-4 w-4' />
        Applied
      </>
    ),
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    id: 'cv',
    header: 'CV',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
    cell: (info) => (
      <Link
        className='w-8'
        to={`/application/${info.row.original.id}#cv-contructor`}>
        <FilePersonFill
          className='hoanimate-pulse inline h-5 w-5 hover:text-purple-700'
          alt='CV Icon'
        />
      </Link>
    ),
  },
  {
    id: 'letter',
    header: 'Letter',
    headerCellProps: {
      className: 'text-sm font-medium text-gray-900 px-6 py-4 text-left',
    },
    bodyCellProps: {
      className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
    cell: (info) => (
      <Link className='w-8' to={`/application/${info.row.original.id}`}>
        <EnvelopeFill
          className='inline h-5 w-5 hover:text-purple-700'
          alt='Letter Icon'
        />
      </Link>
    ),
  },
];

const ApplicationSummaryPage = () => {
  const { appsData, setAppsData } = useContext(GlobalContext);
  const [deleteMode, setDeleteMode] = useState(false);
  const [noItemsChanged, setNoItemsChanged] = useState(0);

  const table = useReactTable({
    data: appsData,
    columns,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    readDatabaseEntry('SELECT * FROM applications', null, setAppsData);
  }, [setAppsData, noItemsChanged]);

  let navigate = useNavigate();
  const handleApplicationClick = (id) => {
    if (deleteMode) {
      deleteDatabaseEntry('DELETE FROM applications WHERE id=?', id, () =>
        setNoItemsChanged(noItemsChanged + 1)
      );
    } else {
      navigate('/application/' + id, { replace: true });
    }
  };

  const handleSubmitCallback = (params) => {
    createDatabaseEntry(
      'INSERT INTO applications (company, role, job_description, status, date_applied) VALUES (?,?,?,?,?)',
      [
        params.company,
        params.role,
        params.job_description,
        params.status,
        new Date().toISOString(),
      ],
      () => {
        setNoItemsChanged(noItemsChanged + 1);
      }
    );
  };

  return (
    <div className='p-4'>
      <h1 className='inline w-fit text-xl font-bold'>All Applications</h1>
      <p
        className='has-tooltip inline px-1'
        onClick={() => setDeleteMode(!deleteMode)}>
        <span className='tooltip -mt-8 rounded bg-slate-100 p-1 shadow-md'>
          {' '}
          Delete button{' '}
        </span>
        <TrashFill
          style={{ color: `${deleteMode ? 'red' : ''}` }}
          className={'mx-1 mb-1 inline h-6 w-6 hover:text-purple-700'}
          alt='Delete Entry Icon'
        />
      </p>
      {deleteMode ? <p className='-mt-1'>Click on an item to delete 🡣</p> : ''}
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
                          {...header.column.columnDef.headerCellProps}
                          scope='col'
                          className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
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
                      className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
                      onClick={() => handleApplicationClick(row.original.id)}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900'
                          {...cell.column.columnDef.bodyCellProps}>
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
      <button
        type='button'
        data-mdb-ripple='true'
        data-mdb-ripple-color='light'
        data-bs-toggle='modal'
        data-bs-target='#addNewModal'
        className='align-center ml-auto flex rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
        <PlusLg className='mr-2 h-4 w-4' />
        Add new
      </button>
      <AddApplicationForm handleSubmitCallback={handleSubmitCallback} />
    </div>
  );
};

export default ApplicationSummaryPage;
