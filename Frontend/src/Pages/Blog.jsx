import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/Image/service-bg.jpg'
import blog1 from '../assets/Image/blog1.jpg'
import blog2 from '../assets/Image/blog2.jpg'
import blog3 from '../assets/Image/blog3.jpg'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Blog' }

function Blog() {
  const content = usePageContent('blog', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const blogs = [
    {
      id: 1,
      category: 'BUSINESS & FINANCE',
      title: 'How To Start Getting More Of a Return From Your Savings',
      image: blog1,
      date: '19',
    },
    {
      id: 2,
      category: 'FINANCE',
      title: 'Consulted Admitting Wooded Is Power Acuteness',
      image: blog2,
      date: '23',
    },
    {
      id: 3,
      category: 'BUSINESS',
      title: 'Popular Consultants are Big Meetup 2025',
      image: blog3,
      date: '15',
    },
    {
      id: 4,
      category: 'BUSINESS & FINANCE',
      title: 'How To Start Getting More Of a Return From Your Savings',
      image: blog1,
      date: '19',
    },
    {
      id: 5,
      category: 'FINANCE',
      title: 'Consulted Admitting Wooded Is Power Acuteness',
      image: blog2,
      date: '23',
    },
    {
      id: 6,
      category: 'BUSINESS',
      title: 'Popular Consultants are Big Meetup 2025',
      image: blog3,
      date: '15',
    },
  ]

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
                    <p className="text-2xl font-bold">{blog.date}</p>
                    <p className="text-xs">Jul</p>
                    <p className="text-xs">2025</p>
                  </div>
                </div>

                <div className="blog-news-content">
                  <p className="blog-news-category">{blog.category}</p>

                  <h3 className="blog-news-title">{blog.title}</h3>

                  <Link to="/blog-details" className="blog-news-button no-underline">
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
