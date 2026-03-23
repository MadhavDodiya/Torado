import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { clearAuth, isAdminUser, isLoggedIn } from '../../utils/auth'

function AdminProtectedRoute() {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (!isAdminUser()) {
    clearAuth()
    return <Navigate to="/admin/login" replace state={{ reason: 'access_denied' }} />
  }

  return <Outlet />
}

export default AdminProtectedRoute
