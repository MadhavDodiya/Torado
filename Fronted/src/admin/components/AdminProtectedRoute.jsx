import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

function AdminProtectedRoute() {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default AdminProtectedRoute
