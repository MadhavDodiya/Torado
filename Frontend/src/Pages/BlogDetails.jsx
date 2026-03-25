import React, { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '../utils/api'
import {
  FaArrowRight,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Blog Details' }

const FALLBACK_BLOG_DETAIL = {
  title: 'How To Start Getting More Of a Return From Your Savings',
  category: 'BUSINESS & FINANCE',
  author: 'Torado Team',
  content:
    'Cras enim urna, interdum nec porttitor vitae, sollicitudin eu eros. Praesent eget mollis nulla, non lacinia urna.',
  featuredImage: { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72' },
  published_date: '2025-07-19T00:00:00.000Z',
}

const formatBlogDate = (value) => {
  const fallback = new Date()
  const date = value ? new Date(value) : fallback
  if (Number.isNaN(date.getTime())) {
    return {
      day: '01',
      month: 'JAN',
      year: fallback.getFullYear(),
    }
  }
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    year: date.getFullYear(),
  }
}

const getBlogImage = (blog) =>
  blog?.featuredImage?.url || blog?.featuredImage?.relativeUrl || 'https://images.unsplash.com/photo-1556761175-b413da4baf72'

function BlogDetails() {
  const content = usePageContent('blog-details', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const [searchParams] = useSearchParams()
  const blogId = searchParams.get('id')

  const { data: blogPayload } = useQuery({
    queryKey: ['blog-detail', blogId],
    queryFn: () => fetchJson(`/api/blogs/${blogId}`),
    enabled: Boolean(blogId),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const blog = blogPayload?.data ?? FALLBACK_BLOG_DETAIL
  const heroImage = getBlogImage(blog)
  const { day, month, year } = formatBlogDate(blog.published_date ?? blog.createdAt ?? blog.updatedAt)
  const contentParagraphs = useMemo(() => {
    if (!blog.content) return []
    return blog.content.split(/\n+/).filter(Boolean)
  }, [blog.content])
  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2.5rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[6rem]">
              Details
            </span>

            <div className="relative z-10">
              <p className="mb-4 flex items-center gap-2 text-base">
                <Link to="/" className="text-slate-300 no-underline hover:text-white">
                  Home
                </Link>
                <span className="text-sm text-slate-400">|</span>
                <Link to="/blog" className="text-slate-300 no-underline hover:text-white">
                  Blog
                </Link>
                <span className="text-sm text-slate-400">|</span>
                <span className="font-medium text-red-500">{pageTitle}</span>
              </p>

              <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-6xl">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden">
            <img src={heroImage} alt="Blog details background" className="block h-full w-full object-cover object-top" />
            <div
              className="absolute left-0 top-0 z-10 h-0 w-0"
              style={{
                borderStyle: 'solid',
                borderWidth: '430px 0 0 200px',
                borderColor: 'transparent transparent transparent #0d1e35',
              }}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
                alt="blog"
                className="h-[350px] w-full rounded object-cover md:h-[450px]"
              />

              <div className="absolute left-6 top-6 rounded bg-red-600 px-4 py-3 text-center text-white">
                <h3 className="text-xl font-bold">{day}</h3>
                <p className="text-sm">{month}</p>
                <p className="text-xs">{year}</p>
              </div>
            </div>

            <p className="mt-6 text-sm font-semibold tracking-wide text-red-600">
              {blog.category}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#0f172a] md:text-5xl">
              {blog.title}
            </h1>

            {contentParagraphs.length ? (
              contentParagraphs.map((paragraph, index) => (
                <p key={index} className="mt-6 leading-relaxed text-gray-500">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="mt-6 leading-relaxed text-gray-500">
                {FALLBACK_BLOG_DETAIL.content}
              </p>
            )}

            <div className="mt-12">
              <div className="flex flex-col items-start justify-between gap-6 border-t pt-6 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-semibold text-gray-700">Tags</span>

                  <div className="flex gap-3">
                    <span className="rounded bg-gray-100 px-4 py-2 text-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-600 hover:text-white"
                    >
                      <Icon />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded bg-gray-100 p-6">
                  <p className="font-medium leading-relaxed text-gray-800">
                    {blog.title}
                  </p>
                </div>

                <div className="rounded bg-gray-100 p-6 text-right">
                  <p className="font-medium leading-relaxed text-gray-800">
                    By {blog.author || FALLBACK_BLOG_DETAIL.author}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                  2 Comments
                </h2>

                <div className="flex gap-5 border-b pb-6">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="user"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-lg font-semibold">Luna Camila</h4>
                    <p className="mb-2 text-sm text-gray-500">IT-Executive</p>

                    <p className="leading-relaxed text-gray-600">
                      Mras enim urna, interdum nec porttitor vitae, sollicitudin eu
                      eros. Praesent eget mollis nulla nonl donec sit amet neque auctor,
                      ornare dui rutrum, condimentum justo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 pt-6">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="user"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-lg font-semibold">Evander Camilo</h4>
                    <p className="mb-2 text-sm text-gray-500">IT-Executive</p>

                    <p className="leading-relaxed text-gray-600">
                      Mras enim urna, interdum nec porttitor vitae, sollicitudin eu
                      eros. Praesent eget mollis nulla nonl donec sit amet neque auctor,
                      ornare dui rutrum, condimentum justo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded bg-[#f3f3f3] p-6 md:p-10">
                <h2 className="mb-8 text-2xl font-bold text-[#0f172a] md:text-3xl">
                  Leave a Comment
                </h2>

                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded border border-gray-200 bg-white px-5 py-4 outline-none focus:border-red-500"
                    />

                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="w-full rounded border border-gray-200 bg-white px-5 py-4 outline-none focus:border-red-500"
                    />
                  </div>

                  <textarea
                    rows="6"
                    placeholder="Enter Message..."
                    className="w-full resize-none rounded border border-gray-200 bg-white px-5 py-4 outline-none focus:border-red-500"
                  ></textarea>

                  <button
                    type="submit"
                    className="rounded bg-red-600 px-8 py-4 font-semibold tracking-wide text-white transition hover:bg-red-700"
                  >
                    SUBMIT MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded bg-white p-5 shadow-sm">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="w-full rounded-l bg-gray-100 px-4 py-3 outline-none"
                />
                <button className="flex items-center justify-center rounded-r bg-red-600 px-5 text-white">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="rounded bg-white p-6 shadow-sm">
              <h3 className="mb-4 border-l-4 border-red-600 pl-3 text-xl font-bold">
                Category
              </h3>

              <div className="space-y-3">
                {[
                  'Financial Analysis',
                  'Taxation Planning',
                  'Investment Trading',
                  'Wealth Marketing',
                  'Planning Strategies',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center justify-between rounded bg-gray-100 px-4 py-3 transition hover:bg-gray-200"
                  >
                    <span className="text-gray-700">{item}</span>
                    <FaArrowRight className="text-red-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetails
