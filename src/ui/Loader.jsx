import React from 'react'
import PropTypes from 'prop-types'
import Spin from './icons/Spin'

const Loader = (className) => (
  <div className={className}>
    <Spin className='h-10 w-10 text-indigo-700' />
    <span className='sr-only'>Loading...</span>
  </div>
)

Loader.propTypes = {
  className: PropTypes.string,
}

Loader.defaultProps = {
  className: null,
}

export default Loader
