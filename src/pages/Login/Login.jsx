import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import { notAuthenticated } from '../../hoc/protected'

const Login = ({ login }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInput = event => {
    const target = event.target
    const value = target.value

    setForm(form => ({
      ...form,
      [target.name]: value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (!isLoading) {
      setIsLoading(true)
      login(form, (result) => {
        setIsLoading(false)

        if (!result) {
          setForm({
            ...form,
            password: '',
          })
        }
      })
    }
  }

  return (
    <form id='login-form' className='px-4 py-4 w-full mx-auto' onSubmit={onSubmit}>
      <h2 className='text-2xl font-extrabold text-gray-900'>
        Sign in to your account
      </h2>
      <div className='mt-4'>
        <div className=''>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
        </div>
        <div className='mt-1 relative'>
          <input
            type='email'
            name='email'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md'
            placeholder='you@example.com'
            aria-describedby='email-optional'
            value={form.email}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className='mt-4'>
        <div className=''>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
        </div>
        <div className='mt-1 relative'>
          <input
            type='password'
            name='password'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm p-2 border-gray-300 rounded-md'
            placeholder='Password'
            aria-describedby='password-optional'
            value={form.password}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className='flex items-baseline justify-between'>
        <button
          type='submit'
          className='inline-flex select-none items-center border border-transparent leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 px-8 py-2 mt-4 text-sm'
        >
          Sign in
        </button>
        <a className='underline text-blue-600 hover:text-indigo-800 text-md' href='https://swetrix.com/signup' target='_blank' rel='noreferrer noopener'>
          Sign up instead
        </a>
      </div>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

export default notAuthenticated(memo(Login))
