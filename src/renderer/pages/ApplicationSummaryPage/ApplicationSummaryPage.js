import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewApplicationForm from '../../components/NewApplicationForm';
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
import { DropdownLinks } from '../../components/microComponents/';

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
      <DropdownLinks
        values={[
          {
            label: (
              <>
                <FilePersonFill
                  className='mb-1 mr-2 inline hover:text-blue-300'
                  alt='CV Icon'
                />
                CV
              </>
            ),
            link: `/application/${info.row.original.id}#cv-contructor`,
          },
          {
            label: (
              <>
                <EnvelopeFill
                  className='mb-1 mr-2 inline hover:text-blue-300'
                  alt='Letter Icon'
                />
                Letter
              </>
            ),
            link: `/application/${info.row.original.id}`,
          },
        ]}
      />
      // <Link to={`/application/${info.row.original.id}`}>
      //   <EnvelopeFill
      //     className='inline h-5 w-5 hover:text-purple-700'
      //     alt='Letter Icon'
      //   />
      // </Link>
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
          Delete button
        </span>
        <TrashFill
          style={{ color: `${deleteMode ? 'red' : ''}`, stroke: 1 }}
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
                      className='group border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
                      // TODO remove this line onClick={() => handleApplicationClick(row.original.id)}
                    >
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
      <button
        type='button'
        data-mdb-ripple='true'
        data-mdb-ripple-color='light'
        data-bs-toggle='modal'
        data-bs-target='#addNewModal'
        className='align-center my-2 ml-auto flex rounded bg-blue-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
        <PlusLg className='mr-2 h-4 w-4' />
        Add new
      </button>
      <NewApplicationForm handleSubmitCallback={handleSubmitCallback} />
    </div>
  );
};

export default ApplicationSummaryPage;
