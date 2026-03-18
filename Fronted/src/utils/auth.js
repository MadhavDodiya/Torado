export const getStoredUser = () => {
  const rawUser = localStorage.getItem('user')
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export const isLoggedIn = () => Boolean(localStorage.getItem('token'))

export const isAdminUser = () => {
  const user = getStoredUser()
  return Boolean(user?.isAdmin)
}

export const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
