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
} from 'react-bootstrap-icons';

const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
    headerCellProps: { className: 'pr-2 w-1/12' },
    bodyCellProps: { className: 'pr-2 w-1/12 text-center' },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    headerCellProps: { className: 'px-2 w-3/12' },
    bodyCellProps: { className: 'px-2 w-3/12' },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    headerCellProps: { className: 'px-2 w-4/12' },
    bodyCellProps: { className: 'px-2 w-4/12' },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    headerCellProps: { className: 'px-2 w-2/12' },
    bodyCellProps: { className: 'px-2 w-2/12 text-center' },
  },
  {
    accessorKey: 'date_applied',
    header: () => (
      <>
        <CalendarCheck className='mb-1 mr-1 inline h-4 w-4' />
        Applied
      </>
    ),
    headerCellProps: { className: 'px-2 w-2/12 text-center' },
    bodyCellProps: { className: 'px-2 w-2/12 text-center' },
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    id: 'cv',
    header: 'CV',
    headerCellProps: { className: 'px-2' },
    bodyCellProps: { className: 'px-2 text-center' },
    cell: (info) => (
      <Link
        className='w-12'
        to={`/application/${info.row.original.id}#cv-contructor`}>
        <FilePersonFill
          className='hoanimate-pulse inline h-6 w-6 hover:text-purple-700'
          alt='CV Icon'
        />
      </Link>
    ),
  },
  {
    id: 'letter',
    header: 'Letter',
    headerCellProps: { className: 'px-2' },
    bodyCellProps: { className: 'px-2 text-center' },
    cell: (info) => (
      <Link className='w-12' to={`/application/${info.row.original.id}`}>
        <EnvelopeFill
          className='inline h-6 w-6 hover:text-purple-700'
          alt='Letter Icon'
        />
      </Link>
    ),
  },
];

const ApplicationSummaryPage = () => {
  const { appsData, setAppsData } = useContext(GlobalContext);
  const [showForm, toggleForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [noItemsRemoved, setNoItemsRemoved] = useState(0);

  const table = useReactTable({
    data: appsData,
    columns,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    readDatabaseEntry('SELECT * FROM applications', null, setAppsData);
  }, [showForm, setAppsData, noItemsRemoved]);

  let navigate = useNavigate();
  const handleApplicationClick = (id) => {
    if (deleteMode) {
      deleteDatabaseEntry('DELETE FROM applications WHERE id=?', id, () =>
        setNoItemsRemoved(noItemsRemoved + 1)
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
        toggleForm(!showForm);
      }
    );
  };

  const handleCancelCallback = () => {
    toggleForm(!showForm);
  };

  return (
    <div className='absolute mx-2'>
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
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='divide-x divide-slate-200 border-y border-slate-500'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  {...header.column.columnDef.headerCellProps}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
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
              className='w-full cursor-pointer border-y border-slate-200 hover:bg-slate-100'
              onClick={() => handleApplicationClick(row.original.id)}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-2'
                  {...cell.column.columnDef.bodyCellProps}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault();
          toggleForm(!showForm);
        }}
        className='std-button my-2 ml-auto block'>
        Add new
      </button>
      {showForm ? (
        <AddApplicationForm
          className={`absolute top-0 block h-full w-full bg-white`}
          handleSubmitCallback={handleSubmitCallback}
          handleCancelCallback={handleCancelCallback}
        />
      ) : null}
    </div>
  );
};

export default ApplicationSummaryPage;
