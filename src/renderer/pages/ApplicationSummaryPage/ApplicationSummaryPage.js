import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddApplicationForm from '../../components/AddApplicationForm'
import { createDatabaseEntry, deleteDatabaseEntry, readDatabaseEntry } from '../../util/CRUD'
import { GlobalContext } from '../../context/GlobalContext'
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import {
  SortAlphaDown,
  SortAlphaDownAlt,
  CalendarCheck,
  EnvelopeFill,
  TrashFill,
  FilePersonFill,
} from 'react-bootstrap-icons'

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
        <CalendarCheck className='w-4 h-4 mb-1 mr-1 inline' />
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
      <Link className='w-12' to={`/application/${info.row.original.id}#cv-contructor`}>
        <FilePersonFill
          className='w-6 h-6 inline hover:text-purple-700 hoanimate-pulse'
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
        <EnvelopeFill className='w-6 h-6 inline hover:text-purple-700' alt='Letter Icon' />
      </Link>
    ),
  },
]

const ApplicationSummaryPage = () => {
  const { appsData, setAppsData, } = useContext(GlobalContext)
  const [showForm, toggleForm] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [noItemsRemoved, setNoItemsRemoved] = useState(0)

  const table = useReactTable({
    data: appsData,
    columns,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    readDatabaseEntry('SELECT * FROM applications', undefined, setAppsData)
  }, [showForm, setAppsData, noItemsRemoved])

  let navigate = useNavigate()
  const handleApplicationClick = (id) => {
    if (deleteMode) {
      deleteDatabaseEntry('DELETE FROM applications WHERE id=?', id, () =>
        setNoItemsRemoved(noItemsRemoved + 1)
      )
    } else {
      navigate('/application/' + id, { replace: true })
    }
  }

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
        toggleForm(!showForm)
      }
    )
  }

  const handleCancelCallback = () => {
    toggleForm(!showForm)
  }

  return (
    <div className='mx-2 absolute'>
      <h1 className='font-bold text-xl w-fit inline'>All Applications</h1>
      <p className='has-tooltip inline px-1' onClick={() => setDeleteMode(!deleteMode)}>
        <span className='tooltip rounded shadow-md p-1 bg-slate-100 -mt-8'> Delete button </span>
        <TrashFill
          style={{ color: `${deleteMode ? 'red' : ''}` }}
          className={'w-6 h-6 mx-1 mb-1 inline hover:text-purple-700'}
          alt='Delete Entry Icon'
        />
      </p>
      {deleteMode ? <p className='-mt-1'>Click on an item to delete 🡣</p> : ''}
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='border-y border-slate-500 divide-x divide-slate-200'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  {...header.column.columnDef.headerCellProps}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <SortAlphaDown className='w-4 h-4 mb-1 ml-1 inline' />,
                        desc: <SortAlphaDownAlt className='w-4 h-4 mb-1 ml-1 inline' />,
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
              className='w-full border-y border-slate-200 hover:bg-slate-100 cursor-pointer'
              onClick={() => handleApplicationClick(row.original.id)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} {...cell.column.columnDef.bodyCellProps}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleForm(!showForm)
        }}
        className='block my-2 ml-auto std-button'>
        Add new
      </button>
      {showForm ? (
        <AddApplicationForm
          className={`block w-full h-full absolute top-0 bg-white`}
          handleSubmitCallback={handleSubmitCallback}
          handleCancelCallback={handleCancelCallback}
        />
      ) : null}
    </div>
  )
}

export default ApplicationSummaryPage
