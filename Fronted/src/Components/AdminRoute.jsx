import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { isAdminUser } from '../utils/auth'

function AdminRoute() {
  if (!isAdminUser()) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default AdminRoute
