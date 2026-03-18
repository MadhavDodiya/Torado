import { Link } from 'react-router-dom'
import heroImg from '../assets/Image/service-bg.jpg'
import img1 from '../assets/Image/service1.jpg'
import img2 from '../assets/Image/service2.jpg'
import img3 from '../assets/Image/service3.jpg'
import img4 from '../assets/Image/service4.jpg'
import img5 from '../assets/Image/service5.jpg'
import img6 from '../assets/Image/service6.jpg'
import { FaArrowRight } from 'react-icons/fa'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: 'Portfolio' }

function Portfolio() {
  const content = usePageContent('portfolio', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const services = [
    {
      title: 'Business Tax Reforms',
      category: 'Business & Finance',
      image: img1,
    },
    {
      title: 'Business Consultation',
      category: 'Business & Finance',
      image: img2,
    },
    {
      title: 'Branding Strategy',
      category: 'Business & Finance',
      image: img3,
    },
    {
      title: 'Digital marketing web',
      category: 'Business & Finance',
      image: img4,
    },
    {
      title: 'Business & Strategy',
      category: 'Business & Finance',
      image: img5,
    },
    {
      title: 'Accounting Advisory',
      category: 'Business & Finance',
      image: img6,
    },
  ]

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[7rem]">
              PORTFOLIO
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
            <img src={heroImg} alt="Portfolio background" className="block h-full w-full object-cover object-top" />
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

      <section className="bg-[#f3f3f3] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={index} className="group relative overflow-hidden rounded-lg bg-white">
              <img
                src={service.image}
                alt={service.title}
                className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="absolute bottom-7 left-0 right-14 p-7 shadow-[0_12px_24px_rgba(12,28,58,0.12)]"
                style={{
                  backgroundColor: '#ffffff',
                  backgroundImage:
                    'radial-gradient(circle at 0 0, rgba(15,31,60,0.06) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              >
                <p className="mb-3 flex items-center gap-2 text-sm leading-none text-[#f00455] md:text-base">
                  <span className="h-[2px] w-10 bg-[#f00455]"></span>
                  {service.category}
                </p>

                <h3 className="text-[22px] font-extrabold leading-tight text-[#0f1f3c]">
                  {service.title}
                </h3>

                <div className="absolute -right-7 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f7f7] shadow-sm">
                  <FaArrowRight className="text-[#f00455]" size={18} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Portfolio
