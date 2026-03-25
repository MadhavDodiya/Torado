import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/Image/service-bg.jpg'
import blog1 from '../assets/Image/blog1.jpg'
import blog2 from '../assets/Image/blog2.jpg'
import blog3 from '../assets/Image/blog3.jpg'
import { useQuery } from '@tanstack/react-query'
import { fetchJson } from '../utils/api'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Blog' }

const BLOG_IMAGE_POOL = [blog1, blog2, blog3]
const BLOG_FALLBACKS = [
  {
    id: 'blog-1',
    category: 'business & finance',
    title: 'How To Start Getting More Of a Return From Your Savings',
    featuredImage: { url: blog1 },
    published_date: '2025-07-19T00:00:00.000Z',
  },
  {
    id: 'blog-2',
    category: 'finance',
    title: 'Consulted Admitting Wooded Is Power Acuteness',
    featuredImage: { url: blog2 },
    published_date: '2025-07-23T00:00:00.000Z',
  },
  {
    id: 'blog-3',
    category: 'business',
    title: 'Popular Consultants are Big Meetup 2025',
    featuredImage: { url: blog3 },
    published_date: '2025-07-15T00:00:00.000Z',
  },
]

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

const getBlogImage = (blog, index) =>
  blog?.featuredImage?.url ||
  blog?.featuredImage?.relativeUrl ||
  BLOG_IMAGE_POOL[index % BLOG_IMAGE_POOL.length]

function Blog() {
  const content = usePageContent('blog', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const { data: blogsPayload } = useQuery({
    queryKey: ['blogs', 'listing'],
    queryFn: () => fetchJson('/api/blogs?limit=6'),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  const blogs = useMemo(() => {
    const records = blogsPayload?.data ?? BLOG_FALLBACKS
    return records.map((blog, index) => {
      const { day, month, year } = formatBlogDate(
        blog.published_date ?? blog.createdAt ?? blog.updatedAt,
      )
      return {
        id: blog._id ?? blog.id ?? `blog-${index}`,
        category: (blog.category || 'General').toUpperCase(),
        title: blog.title || 'Latest Insight',
        image: getBlogImage(blog, index),
        day,
        month,
        year,
      }
    })
  }, [blogsPayload?.data])

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[4rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[7rem]">
              Blog
            </span>

            <div className="relative z-10">
              <p className="mb-4 flex items-center gap-2 text-base">
                <Link to="/" className="text-slate-300 no-underline hover:text-white">
                  Home
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
            <img src={heroImg} alt="Blog background" className="block h-full w-full object-cover object-top" />
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

      <section className=" py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-pink-600 font-semibold tracking-widest">
              BLOG & NEWS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#1b2940] mt-3">
              Consulter Latest Blog & News
            </h2>
          </div>

          <div className="blog-news-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-news-card">
                <div className="relative overflow-hidden">
                  <img src={blog.image} className="blog-news-image" alt={blog.title} />

                  <div className="blog-news-date">
                    <p className="text-2xl font-bold">{blog.day}</p>
                    <p className="text-xs">{blog.month}</p>
                    <p className="text-xs">{blog.year}</p>
                  </div>
                </div>

                <div className="blog-news-content">
                  <p className="blog-news-category">{blog.category}</p>

                  <h3 className="blog-news-title">{blog.title}</h3>

                  <Link
                    to={`/blog-details?id=${blog.id}`}
                    className="blog-news-button no-underline"
                  >
                    READ MORE
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Blog

