import React, { useState, useEffect } from 'react'
import { readDatabaseEntry } from '../util/CRUD'

// could make this an empty obj
const defaultState = {
  id: '',
  company: '',
  role: '',
  job_description: '',
  status: '',
  date_applied: '',
  cv_url: '',
  is_cv_ready: false,
}

const ApplicationDetails = ({ id, setPdfUrl }) => {
  const [AppsDetails, setAppsDetails] = useState([defaultState])

  useEffect(() => {
    readDatabaseEntry('SELECT * FROM applications WHERE id=?', id, setAppsDetails)
  }, [id])

  useEffect(() => {
    if (AppsDetails[0].is_cv_ready) {
      setPdfUrl({ isReady: true, url: AppsDetails[0].cv_url })
    } else {
      setPdfUrl({ isReady: false, url: '' })
    }
  }, [setPdfUrl, id, AppsDetails])

  return (
    <div className='mx-2 grid col-span-1 md:col-span-2'>
      <h1 className='font-bold text-xl'>Application Details</h1>
      <div className='grid grid-cols-2'>
        <p>Id: {AppsDetails[0].id}</p>
        <p>Company: {AppsDetails[0].company}</p>
        <p>Role: {AppsDetails[0].role}</p>
        <p>Job Description: {AppsDetails[0].job_description}</p>
        <p>Status: {AppsDetails[0].status}</p>
        <p>Date Applied: {Date(AppsDetails[0].date_applied)}</p>
      </div>
    </div>
  )
}

export default ApplicationDetails
