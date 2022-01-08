import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../routes'

const Loading = () => (
  <header className='w-full py-2 px-4 bg-gray-50 flex items-center justify-between border-b-2 border-indigo-600'>
    <Link to={routes.dashboard}>
      <span className='sr-only'>Swetrix</span>
      <img className='h-10' src='/assets/logo_blue.svg' alt='' />
    </Link>
    <p className='text-indigo-600 font-bold text-xl'>
      Web Extension
    </p>
  </header>
)

export default Loading
