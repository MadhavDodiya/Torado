import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#f8fafc] px-4 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-red-200/60 blur-3xl"></div>
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#0d1e35]/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-xl md:px-12">
        <p className="mb-4 rounded-full bg-red-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-600">
          Error Page
        </p>

        <h1 className="mb-3 text-6xl font-black leading-none text-[#0d1e35] md:text-8xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-4xl">
          Page Not Found
        </h2>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
          The page you are looking for does not exist or may have been moved.
          Please return to the homepage or go back to the previous page.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-md bg-red-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white no-underline transition hover:bg-red-600"
          >
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-slate-300 bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  )
}

export default Error
