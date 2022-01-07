import React, { useState, memo } from 'react'

import { isAuthenticated } from '../../hoc/protected'

const Dashboard = () => {
  return (
    <div>
      The users dashboard
    </div>
  )
}

export default isAuthenticated(memo(Dashboard))
