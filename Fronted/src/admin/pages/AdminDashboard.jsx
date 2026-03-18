import React from 'react'

function AdminDashboard() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Basic admin panel shell is ready.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Authentication</p>
          <p className="mt-2 text-base font-semibold text-slate-900">JWT + Admin Route Guard</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Access Control</p>
          <p className="mt-2 text-base font-semibold text-slate-900">Only users with isAdmin=true</p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Layout</p>
          <p className="mt-2 text-base font-semibold text-slate-900">Responsive sidebar + header</p>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboard
