import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaChartLine,
    FaChevronLeft,
    FaChevronRight,
    FaCogs,
    FaFacebookF,
    FaHandshake,
    FaHeadset,
    FaInstagram,
    FaLightbulb,
    FaLinkedinIn,
    FaPuzzlePiece,
    FaStar,
    FaTwitter,
} from 'react-icons/fa'
import hero from '../assets/Image/imgi_70_hero1.png'
import heroBg from '../assets/Image/hero-color-bg.png'
import service1 from '../assets/Image/service1.jpg'
import service2 from '../assets/Image/service2.jpg'
import service3 from '../assets/Image/service3.jpg'
import service4 from '../assets/Image/service4.jpg'
import service5 from '../assets/Image/service5.jpg'
import blog1 from '../assets/Image/blog1.jpg'
import blog2 from '../assets/Image/blog2.jpg'
import blog3 from '../assets/Image/blog3.jpg'
import aboutImage from '../assets/Image/imgi_13_about1.png'
import maps from '../assets/Image/imgi_37_map.png'
import logo1 from '../assets/Image/imgi_38_logo.png'
import man from '../assets/Image/register1.png'
import team1 from '../assets/Image/team1.jpg'
import team2 from '../assets/Image/team2.jpg'
import team3 from '../assets/Image/team3.jpg'
import team4 from '../assets/Image/team4.jpg'
import usePageContent from '../hooks/usePageContent'

const getPagePath = (pageId) => (pageId === 'home' ? '/' : `/${pageId}`)

const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 640) return 1
    if (window.innerWidth <= 992) return 2
    return 3
}

const getVisibleTestimonials = () => {
    if (typeof window === 'undefined') return 2
    if (window.innerWidth <= 768) return 1
    return 2
}

const getVisibleTeamMembers = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth <= 640) return 1
    if (window.innerWidth <= 992) return 2
    return 4
}

const defaultContent = {
    heroTagPrefix: 'Get On The',
    heroTagHighlight: 'Right',
    heroTagSuffix: 'Way',
    heroTitleLine1: 'Financial Assistance',
    heroTitleLine2: 'With True Purpose',
    heroDescription:
        'Miena sipu del inora aid consectetur adipiscing elit. Ut elit tellus luctus nec ullamc orperrm nutka pulvinar dapibus leo della pierrano set amuse.',
    heroButtonText: 'HOW CAN WE HELP',
}

function Home() {
    const content = usePageContent('home', defaultContent)
    const services = useMemo(
        () => [
            { title: 'Financial Analysis', image: service1 },
            { title: 'Taxation Planning', image: service2, highlight: true },
            { title: 'Investment Trading', image: service3 },
        ],
        [],
    )

    const serviceGrowth = useMemo(
        () => [
            {
                title: 'Business Tax Reforms',
                description:
                    'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
                image: service3,
                icon: <FaLightbulb />,
            },
            {
                title: 'Process Development',
                description:
                    'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
                image: service4,
                icon: <FaCogs />,
            },
            {
                title: 'Manage Investment',
                description:
                    'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
                image: service5,
                icon: <FaChartLine />,
            },
            {
                title: 'Financial Growth Planning',
                description:
                    'Pellentesque at posuere tellus sed dui justo scelerisque turpis arcu ut pulvinar lectus tristique non ptoy laoreet risus vel.',
                image: service1,
                icon: <FaHandshake />,
            },
        ],
        [],
    )

    const members = useMemo(
        () => [
            {
                name: 'William Benjamin',
                role: 'Financial Advisor',
                img: team1,
            },
            {
                name: 'Sophia Isabella',
                role: 'Financial Head',
                img: team2,
            },
            {
                name: 'Michael Pluim',
                role: 'Head Office Manager',
                img: team3,
            },
            {
                name: 'Charlotte Allen',
                role: 'Account Manager',
                img: team4,
            },
            {
                name: 'Daniel Morgan',
                role: 'Investment Strategist',
                img: team1,
            },
            {
                name: 'Emma Collins',
                role: 'Risk Consultant',
                img: team2,
            },
            {
                name: 'Noah Bennett',
                role: 'Tax Specialist',
                img: team3,
            },
            {
                name: 'Olivia Turner',
                role: 'Client Relations Lead',
                img: team4,
            },
        ],
        [],
    )

    const projects = useMemo(
        () => [
            {
                title: 'Business Consultation',
                category: 'Business & Finance',
                image: service1,
                showOverlay: true,
            },
            {
                title: 'Business Consultation',
                category: 'Business & Finance',
                image: service2,
                showOverlay: true,
            },
            {
                title: 'Business Consultation',
                category: 'Business & Finance',
                image: service3,
                showOverlay: false,
            },
            {
                title: 'Business Tax Reforms',
                category: 'Business & Finance',
                image: service4,
                showOverlay: true,
            },
        ],
        [],
    )

    const steps = [
        {
            icon: <FaHeadset size={28} />,
            title: 'Our Consultation',
            desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
        },
        {
            icon: <FaPuzzlePiece size={28} />,
            title: 'Perfect Solutions',
            desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
        },
        {
            icon: <FaChartLine size={28} />,
            title: 'Business Growth',
            desc: 'Praesent sed erat cursus leifend mi vitae lacinia ullamcorp ligulaat augue vulputate.',
        },
    ]

    const stats = [
        { number: "10k", label: "Global Customers" },
        { number: "5k+", label: "Projects Completed" },
        { number: "96+", label: "Cup Of Coffee" },
        { number: "370", label: "Expert Employees" },
        { number: "75+", label: "Countries Served" },
    ];

    const testimonials = useMemo(
        () => [
            {
                name: 'Aurel Beniamin',
                role: 'Operations Director',
                company: 'Brixon Finance',
                initials: 'AB',
                text: 'Torado helped us restructure reporting and cash-flow planning. The team moved quickly, explained tradeoffs clearly, and improved our monthly decision process.',
            },
            {
                name: 'Sophia Carter',
                role: 'Company Manager',
                company: 'Northvale Group',
                initials: 'SC',
                text: 'We came in for tax guidance and stayed for the broader strategy support. Their recommendations were practical, measurable, and easy for our staff to execute.',
            },
            {
                name: 'Michael Hansen',
                role: 'Startup Founder',
                company: 'GridSpark Labs',
                initials: 'MH',
                text: 'The advisory sessions were focused and direct. They identified cost leaks, improved investor reporting, and gave us a much stronger financial operating rhythm.',
            },
            {
                name: 'Charlotte Allen',
                role: 'Finance Lead',
                company: 'Apex Retail',
                initials: 'CA',
                text: 'Their team balanced growth planning with risk control. We used their roadmap to set quarterly targets, and the improvement was visible within one cycle.',
            },
            {
                name: 'Daniel Cooper',
                role: 'Business Consultant',
                company: 'Merit Axis',
                initials: 'DC',
                text: 'What stood out was consistency. From consultation through follow-up, Torado stayed accountable and kept the plan grounded in realistic execution.',
            },
        ],
        [],
    )

    const blogs = [
        {
            id: 1,
            category: "BUSINESS & FINANCE",
            title: "How To Start Getting More Of a Return From Your Savings",
            image: blog1,
            date: "19",
        },
        {
            id: 2,
            category: "FINANCE",
            title: "Consulted Admitting Wooded Is Power Acuteness",
            image: blog2,
            date: "23",
            dark: true,
        },
        {
            id: 3,
            category: "BUSINESS",
            title: "Popular Consultants are Big Meetup 2025",
            image: blog3,
            date: "15",
        },
    ];

    const totalGrowthSlides = serviceGrowth.length
    const [visibleSlides, setVisibleSlides] = useState(() => getVisibleSlides())

    const growthSliderCards = useMemo(
        () => [
            ...serviceGrowth.slice(totalGrowthSlides - visibleSlides),
            ...serviceGrowth,
            ...serviceGrowth.slice(0, visibleSlides),
        ],
        [serviceGrowth, totalGrowthSlides, visibleSlides],
    )

    const [growthSlide, setGrowthSlide] = useState(() => getVisibleSlides())
    const [growthAnimating, setGrowthAnimating] = useState(true)
    const [growthPaused, setGrowthPaused] = useState(false)
    const totalMembers = members.length
    const [visibleTeamMembers, setVisibleTeamMembers] = useState(() => getVisibleTeamMembers())

    const teamSliderCards = useMemo(
        () => [
            ...members.slice(totalMembers - visibleTeamMembers),
            ...members,
            ...members.slice(0, visibleTeamMembers),
        ],
        [members, totalMembers, visibleTeamMembers],
    )

    const [teamSlide, setTeamSlide] = useState(() => getVisibleTeamMembers())
    const [teamAnimating, setTeamAnimating] = useState(true)
    const [teamPaused, setTeamPaused] = useState(false)
    const totalTestimonials = testimonials.length
    const [testimonialVisible, setTestimonialVisible] = useState(() => getVisibleTestimonials())

    const testimonialSliderCards = useMemo(
        () => [
            ...testimonials.slice(totalTestimonials - testimonialVisible),
            ...testimonials,
            ...testimonials.slice(0, testimonialVisible),
        ],
        [testimonialVisible, testimonials, totalTestimonials],
    )

    const [testimonialSlide, setTestimonialSlide] = useState(() => getVisibleTestimonials())
    const [testimonialAnimating, setTestimonialAnimating] = useState(true)
    const [testimonialPaused, setTestimonialPaused] = useState(false)

    const nextGrowthSlide = () => setGrowthSlide((prev) => prev + 1)
    const prevGrowthSlide = () => setGrowthSlide((prev) => prev - 1)
    const nextTeamSlide = () => setTeamSlide((prev) => prev + 1)
    const prevTeamSlide = () => setTeamSlide((prev) => prev - 1)
    const nextTestimonialSlide = () => setTestimonialSlide((prev) => prev + 1)
    const prevTestimonialSlide = () => setTestimonialSlide((prev) => prev - 1)

    const onGrowthTransitionEnd = () => {
        if (growthSlide >= totalGrowthSlides + visibleSlides) {
            setGrowthAnimating(false)
            setGrowthSlide(visibleSlides)
            requestAnimationFrame(() => setGrowthAnimating(true))
        }
        if (growthSlide <= visibleSlides - 1) {
            setGrowthAnimating(false)
            setGrowthSlide(totalGrowthSlides + visibleSlides - 1)
            requestAnimationFrame(() => setGrowthAnimating(true))
        }
    }

    const onTestimonialTransitionEnd = () => {
        if (testimonialSlide >= totalTestimonials + testimonialVisible) {
            setTestimonialAnimating(false)
            setTestimonialSlide(testimonialVisible)
            requestAnimationFrame(() => setTestimonialAnimating(true))
        }
        if (testimonialSlide <= testimonialVisible - 1) {
            setTestimonialAnimating(false)
            setTestimonialSlide(totalTestimonials + testimonialVisible - 1)
            requestAnimationFrame(() => setTestimonialAnimating(true))
        }
    }

    const onTeamTransitionEnd = () => {
        if (teamSlide >= totalMembers + visibleTeamMembers) {
            setTeamAnimating(false)
            setTeamSlide(visibleTeamMembers)
            requestAnimationFrame(() => setTeamAnimating(true))
        }
        if (teamSlide <= visibleTeamMembers - 1) {
            setTeamAnimating(false)
            setTeamSlide(totalMembers + visibleTeamMembers - 1)
            requestAnimationFrame(() => setTeamAnimating(true))
        }
    }

    useEffect(() => {
        let rafId = null

        const updateVisibleSlides = () => {
            const nextVisibleSlides = getVisibleSlides()
            setVisibleSlides((prevVisibleSlides) => {
                if (prevVisibleSlides === nextVisibleSlides) return prevVisibleSlides
                setGrowthAnimating(false)
                setGrowthSlide(nextVisibleSlides)
                rafId = window.requestAnimationFrame(() => setGrowthAnimating(true))
                return nextVisibleSlides
            })
        }

        window.addEventListener('resize', updateVisibleSlides)
        return () => {
            window.removeEventListener('resize', updateVisibleSlides)
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId)
            }
        }
    }, [])

    useEffect(() => {
        let rafId = null

        const updateVisibleTestimonials = () => {
            const nextVisibleTestimonials = getVisibleTestimonials()
            setTestimonialVisible((prevVisibleTestimonials) => {
                if (prevVisibleTestimonials === nextVisibleTestimonials) return prevVisibleTestimonials
                setTestimonialAnimating(false)
                setTestimonialSlide(nextVisibleTestimonials)
                rafId = window.requestAnimationFrame(() => setTestimonialAnimating(true))
                return nextVisibleTestimonials
            })
        }

        window.addEventListener('resize', updateVisibleTestimonials)
        return () => {
            window.removeEventListener('resize', updateVisibleTestimonials)
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId)
            }
        }
    }, [])

    useEffect(() => {
        let rafId = null

        const updateVisibleTeamMembers = () => {
            const nextVisibleTeamMembers = getVisibleTeamMembers()
            setVisibleTeamMembers((prevVisibleTeamMembers) => {
                if (prevVisibleTeamMembers === nextVisibleTeamMembers) return prevVisibleTeamMembers
                setTeamAnimating(false)
                setTeamSlide(nextVisibleTeamMembers)
                rafId = window.requestAnimationFrame(() => setTeamAnimating(true))
                return nextVisibleTeamMembers
            })
        }

        window.addEventListener('resize', updateVisibleTeamMembers)
        return () => {
            window.removeEventListener('resize', updateVisibleTeamMembers)
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId)
            }
        }
    }, [])

    useEffect(() => {
        if (growthPaused) return undefined
        const intervalId = window.setInterval(() => nextGrowthSlide(), 3500)
        return () => window.clearInterval(intervalId)
    }, [growthPaused])

    useEffect(() => {
        if (testimonialPaused) return undefined
        const intervalId = window.setInterval(() => nextTestimonialSlide(), 4200)
        return () => window.clearInterval(intervalId)
    }, [testimonialPaused])

    useEffect(() => {
        if (teamPaused) return undefined
        const intervalId = window.setInterval(() => nextTeamSlide(), 3600)
        return () => window.clearInterval(intervalId)
    }, [teamPaused])

    return (
        <>
            {/* ── Hero Section ── */}
            <section
                className="hero-section"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-container">
                    <div className="hero-left">
                        <span className="hero-tag">
                            {content.heroTagPrefix || defaultContent.heroTagPrefix}{' '}
                            <span className="highlight">{content.heroTagHighlight || defaultContent.heroTagHighlight}</span>{' '}
                            {content.heroTagSuffix || defaultContent.heroTagSuffix}
                        </span>
                        <h1>
                            {content.heroTitleLine1 || defaultContent.heroTitleLine1} <br />
                            {content.heroTitleLine2 || defaultContent.heroTitleLine2}
                        </h1>
                        <p>
                            {content.heroDescription || defaultContent.heroDescription}
                        </p>
                        <Link to={getPagePath('contact')} className="hero-btn">
                            {content.heroButtonText || defaultContent.heroButtonText}
                        </Link>
                    </div>
                    <div className="hero-right">
                        <img src={hero} alt="hero" />
                    </div>
                </div>
            </section>

            {/* ── Service Section ── */}
            <section className="service-section">
                <div className="service-container">
                    <div className="service-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card-wrap">
                                <img src={service.image} alt={service.title} className="service-image" />
                                <div className={`service-card${service.highlight ? ' service-card-highlight' : ''}`}>
                                    <h3>{service.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="service-bottom-text">
                        <p>
                            TORADO started its march with providing assistants in <span>1999</span>. Initially they
                            provide financial assistance within the country.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── About Section ── */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-image-wrap">
                        <img src={aboutImage} alt="About Torado" className="about-image" />
                        <div className="about-image-decor"></div>
                    </div>
                    <div className="about-content">
                        <p className="about-label">ABOUT TORADO</p>
                        <h2 className="about-title">
                            Business Planning Strategy <br /> & Execution
                        </h2>
                        <p className="about-description">
                            Pellentesque at posuere tellus. Ut sed dui justo. Phasellus scelerisque turpis arcu ut
                            pulvinar lectus tristique non. Nam laoreet risus vel laoreet laoreet, mauris risus porta
                            velit imperdiet ante nisi in ante. Integer consectetur in nisi mattis tincidunt.
                        </p>
                        <div className="about-points">
                            <div className="about-point">
                                <div className="about-point-icon">-&gt;</div>
                                <p>Communicate orthogonal process</p>
                            </div>
                            <div className="about-point">
                                <div className="about-point-icon">-&gt;</div>
                                <p>Professionally grow cutting-edge paradigms</p>
                            </div>
                        </div>
                        <div className="about-progress-row">
                            <div className="about-progress-item">
                                <div className="about-progress-circle">
                                    <svg viewBox="0 0 64 64" aria-hidden="true">
                                        <circle cx="32" cy="32" r="28" stroke="#eee" strokeWidth="6" fill="none" />
                                        <circle cx="32" cy="32" r="28" stroke="#ff2d55" strokeWidth="6" fill="none" strokeDasharray="176" strokeDashoffset="26" />
                                    </svg>
                                    <span className="about-progress-value">85%</span>
                                </div>
                                <p className="about-progress-text">Clients <br /> Satisfactions</p>
                            </div>
                            <div className="about-progress-item">
                                <div className="about-progress-circle">
                                    <svg viewBox="0 0 64 64" aria-hidden="true">
                                        <circle cx="32" cy="32" r="28" stroke="#eee" strokeWidth="6" fill="none" />
                                        <circle cx="32" cy="32" r="28" stroke="#ff2d55" strokeWidth="6" fill="none" strokeDasharray="176" strokeDashoffset="9" />
                                    </svg>
                                    <span className="about-progress-value">95%</span>
                                </div>
                                <p className="about-progress-text">Business & <br /> Finance Consulting</p>
                            </div>
                        </div>
                        <Link to={getPagePath('about')} className="about-btn">
                            MORE ABOUT US
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Service Growth Section ── */}
            <section className="service-growth-section">
                <div className="service-growth-container">
                    <div className="service-growth-heading">
                        <p>WHAT WE PROVIDES</p>
                        <h2>
                            Get Exceptional Service
                            <br />
                            For Growth
                        </h2>
                    </div>

                    <div
                        className="service-growth-slider"
                        onMouseEnter={() => setGrowthPaused(true)}
                        onMouseLeave={() => setGrowthPaused(false)}
                    >
                        <button
                            className="service-growth-nav service-growth-nav-left"
                            type="button"
                            onClick={prevGrowthSlide}
                            aria-label="Previous slide"
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="service-growth-viewport">
                            <div
                                className="service-growth-track"
                                style={{
                                    transform: `translateX(-${(growthSlide / visibleSlides) * 100}%)`,
                                    transition: growthAnimating ? 'transform 0.6s ease' : 'none',
                                }}
                                onTransitionEnd={onGrowthTransitionEnd}
                            >
                                {growthSliderCards.map((item, index) => (
                                    <article key={`${item.title}-${index}`} className="service-growth-slide">
                                        <div className="service-growth-card">
                                            <img src={item.image} alt={item.title} className="service-growth-image" />
                                            <div className="service-growth-icon">{item.icon}</div>
                                            <div className="service-growth-content">
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                    <Link to={getPagePath('service-detail')}>Read More -&gt;</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <button
                            className="service-growth-nav service-growth-nav-right"
                            type="button"
                            onClick={nextGrowthSlide}
                            aria-label="Next slide"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="service-growth-dots">
                        {serviceGrowth.map((item, index) => {
                            const isActive =
                                ((growthSlide - visibleSlides) % totalGrowthSlides + totalGrowthSlides) %
                                totalGrowthSlides ===
                                index

                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    aria-label={`Go to service slide ${index + 1}`}
                                    aria-pressed={isActive}
                                    className={`service-growth-dot${isActive ? ' service-growth-dot-active' : ''}`}
                                    onClick={() => {
                                        setGrowthAnimating(true)
                                        setGrowthSlide(index + visibleSlides)
                                    }}
                                />
                            )
                        })}
                    </div>

                    <div className="service-growth-footer">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
                        <span>View All Services -&gt;</span>
                    </div>
                </div>
            </section>

            <section className=" py-14 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-10 gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <p className="text-[#e61b50] text-xs font-bold tracking-widest uppercase">
                                    Our Portfolio
                                </p>
                                <span className="block w-14 h-[2px] bg-[#e61b50]" />
                            </div>
                            <h2 className="text-[#17253d] font-extrabold text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
                                Success Work Stories
                            </h2>
                        </div>

                        <div className="hidden lg:flex items-center justify-center flex-1 pt-2">
                            <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
                                <path
                                    d="M4 15 Q13 4 22 15 Q31 26 40 15 Q49 4 58 15 Q67 26 76 15 Q85 4 90 10"
                                    stroke="#e61b50"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <Link
                            to={getPagePath('projects')}
                            className="bg-[#e61b50] hover:bg-[#c0143f] text-white px-10 py-4 rounded-md text-sm font-bold tracking-wide transition"
                        >
                            VIEW ALL PROJECT
                        </Link>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {projects.map((project, index) => (
                            <article key={index} className="relative overflow-hidden rounded-lg group aspect-[4/3]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {project.showOverlay && (
                                    <div className="absolute left-4 right-4 bottom-4 bg-[#0f2239]/80 px-4 py-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        <div className="mb-2">
                                            <span className="inline-flex items-center rounded-sm bg-[#e61b50] px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                                                {project.category}
                                            </span>
                                        </div>
                                        <h3 className="text-white text-2xl leading-tight font-extrabold">
                                            {project.title}
                                        </h3>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    {/* Subtitle */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-red-500 font-semibold tracking-widest text-sm">
                            GLOBALLY RENOWNED & TRUSTED
                        </span>
                        <div className="w-16 h-[2px] bg-red-500"></div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                        TORADO’s Working
                        <br />
                        Everywhere
                    </h1>

                </div>
            </section>

            {/* <section>
                <div className="container-fluid">
                    <img src={maps} alt="" />
                </div>
            </section> */}

            <section className="relative w-full flex justify-center">

                <div className="relative max-w-7xl w-full">

                    {/* Map Image */}
                    <img src={maps} alt="world map" className="w-full opacity-70" />

                    {/* Dot 1 */}
                    <div className="group absolute top-[32%] left-[20%]">
                        <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>

                        {/* Popup */}
                        <div className="absolute hidden group-hover:flex items-center gap-4 bg-white shadow-xl p-4 rounded-lg w-64 -top-20 left-6">
                            <img src={logo1} alt="" className="w-10" />
                            <p className="text-gray-700 text-sm">
                                Serve you to reach best profits & goals
                            </p>
                        </div>
                    </div>

                    {/* Dot 2 */}
                    <div className="group absolute top-[28%] left-[40%]">
                        <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>

                        <div className="absolute hidden group-hover:flex items-center gap-4 bg-white shadow-xl p-4 rounded-lg w-64 -top-20 left-6">
                            <img src={logo1} alt="" className="w-10" />
                            <p className="text-gray-700 text-sm">
                                Serve you to reach best profits & goals
                            </p>
                        </div>
                    </div>

                    {/* Dot 3 */}
                    <div className="group absolute top-[45%] left-[55%]">
                        <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>

                        <div className="absolute hidden group-hover:flex items-center gap-4 bg-white shadow-xl p-4 rounded-lg w-64 -top-20 left-6">
                            <img src={logo1} alt="" className="w-10" />
                            <p className="text-gray-700 text-sm">
                                Serve you to reach best profits & goals
                            </p>
                        </div>
                    </div>

                    {/* Dot 4 */}
                    <div className="group absolute top-[35%] right-[15%]">
                        <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>

                        <div className="absolute hidden group-hover:flex items-center gap-4 bg-white shadow-xl p-4 rounded-lg w-64 -top-20 left-6">
                            <img src={logo1} alt="" className="w-10" />
                            <p className="text-gray-700 text-sm">
                                Serve you to reach best profits & goals
                            </p>
                        </div>
                    </div>

                    {/* Dot 5 */}
                    <div className="group absolute bottom-[25%] left-[45%]">
                        <div className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></div>

                        <div className="absolute hidden group-hover:flex items-center gap-4 bg-white shadow-xl p-4 rounded-lg w-64 -top-20 left-6">
                            <img src={logo1} alt="" className="w-10" />
                            <p className="text-gray-700 text-sm">
                                Serve you to reach best profits & goals
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-20 flex justify-center">
                <div className="relative max-w-6xl w-full rounded-lg overflow-hidden grid lg:grid-cols-2">

                    {/* ── LEFT SIDE ── */}
                    <div className="bg-[#0f2745] text-white p-10 md:p-14 flex flex-col justify-center rounded-l-xl lg:pr-40">

                        <p className="text-red-500 tracking-widest mb-3 text-sm">
                            TRY OUR SERVICE
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Get Free Quote
                        </h2>

                        <p className="text-gray-300 mb-8 max-w-md">
                            Pellentesque at posuere tellus. Ut sed dui justo
                            hasellus
                            scelerisque turpis arcu ut.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="bg-red-500 w-14 h-14 rounded-full flex items-center justify-center text-xl">
                                📞
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Contact Us</p>
                                <p className="text-lg font-bold">(+212)-226-3126</p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT SIDE FORM ── */}
                    <div className="bg-red-600 p-10 md:p-14 flex flex-col justify-center rounded-r-xl lg:pl-40">

                        {/* Name + Phone */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3.5 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2745] focus:bg-white transition"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full p-3.5 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2745] focus:bg-white transition"
                            />
                        </div>

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3.5 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2745] focus:bg-white transition mb-4"
                        />

                        {/* Message */}
                        <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full p-3.5 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2745] focus:bg-white transition resize-none mb-6"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#0f2745] text-white py-4 rounded-md text-xs font-black uppercase tracking-widest hover:bg-[#0b1c33] transition-colors"
                        >
                            Request Estimate
                        </button>

                    </div>

                    {/* ── CENTER IMAGE — sits above both columns ── */}
                    <img
                        src={man}
                        alt="Business consultant"
                        className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[115%] max-h-[540px] object-contain z-10 pointer-events-none"
                    />

                </div>
            </section>

            <section className="bg-gray-100 py-24">

                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center mb-16">

                        <p className="text-red-500 font-semibold tracking-widest mb-3 flex items-center justify-center gap-3">
                            OUR TEAM
                            <span className="w-10 h-[2px] bg-red-500"></span>
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Meet Our Team Member
                        </h2>

                    </div>

                    <div
                        className="team-slider"
                        onMouseEnter={() => setTeamPaused(true)}
                        onMouseLeave={() => setTeamPaused(false)}
                    >
                        <button
                            className="team-nav team-nav-left"
                            type="button"
                            onClick={prevTeamSlide}
                            aria-label="Previous team member"
                        >
                            <FaChevronLeft />
                        </button>

                        <div className="team-viewport">
                            <div
                                className="team-track"
                                style={{
                                    transform: `translateX(-${(teamSlide / visibleTeamMembers) * 100}%)`,
                                    transition: teamAnimating ? 'transform 0.6s ease' : 'none',
                                }}
                                onTransitionEnd={onTeamTransitionEnd}
                            >
                                {teamSliderCards.map((member, index) => (
                                    <article
                                        key={`${member.name}-${index}`}
                                        className="team-slide"
                                    >
                                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 h-full">
                                            <div className="relative overflow-hidden rounded-lg mb-6">
                                                <img
                                                    src={member.img}
                                                    alt={member.name}
                                                    className="w-full h-[260px] object-cover"
                                                />

                                                <div
                                                    className="absolute bottom-0 left-0 w-full h-16 bg-white"
                                                    style={{
                                                        clipPath: 'polygon(0 50%,100% 0,100% 100%,0 100%)',
                                                    }}
                                                ></div>
                                            </div>

                                            <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                {member.name}
                                            </h3>

                                            <p className="text-gray-500 mb-6 text-sm">
                                                {member.role}
                                            </p>

                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">
                                                    <FaFacebookF />
                                                </div>

                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">
                                                    <FaTwitter />
                                                </div>

                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">
                                                    <FaInstagram />
                                                </div>

                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer">
                                                    <FaLinkedinIn />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <button
                            className="team-nav team-nav-right"
                            type="button"
                            onClick={nextTeamSlide}
                            aria-label="Next team member"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="team-dots">
                        {members.map((member, index) => {
                            const isActive =
                                ((teamSlide - visibleTeamMembers) % totalMembers + totalMembers) % totalMembers ===
                                index

                            return (
                                <button
                                    key={member.name}
                                    type="button"
                                    aria-label={`Go to team member ${index + 1}`}
                                    aria-pressed={isActive}
                                    className={`team-dot${isActive ? ' team-dot-active' : ''}`}
                                    onClick={() => {
                                        setTeamAnimating(true)
                                        setTeamSlide(index + visibleTeamMembers)
                                    }}
                                />
                            )
                        })}
                    </div>

                </div>

            </section>

            <section className=" py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    {/* Title */}
                    <p className="text-red-500 font-semibold tracking-widest mb-3">
                        PROCESS
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 leading-tight">
                        We Follow Some Easy Steps <br />
                        To Developed Projects
                    </h2>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-12">

                        {steps.map((step, index) => (
                            <div key={index} className="text-center flex flex-col items-center">

                                {/* Zigzag */}
                                <div className="text-red-400 text-xl mb-3">
                                    ~~~~~
                                </div>

                                {/* Icon Circle */}
                                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg mb-6">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 max-w-xs">
                                    {step.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            </section>

            <section className="bg-[#0f2745] py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center text-white">

                        {stats.map((item, index) => (
                            <div key={index}>

                                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                                    {item.number}
                                </h2>

                                <p className="text-gray-300 text-sm tracking-wide">
                                    {item.label}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            <section className="bg-[#f5f6f7] py-20 px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Title */}
                    <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                        <div>
                            <p className="text-pink-500 font-semibold tracking-widest text-sm mb-2">
                                TESTIMONIAL
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold text-[#0c2340] leading-tight">
                                What User Say About <br /> Our TORADO
                            </h2>
                        </div>

                        {/* arrows */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={prevTestimonialSlide}
                                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center cursor-pointer"
                                aria-label="Previous testimonials"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={nextTestimonialSlide}
                                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center cursor-pointer"
                                aria-label="Next testimonials"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div
                        className="testimonial-slider"
                        onMouseEnter={() => setTestimonialPaused(true)}
                        onMouseLeave={() => setTestimonialPaused(false)}
                    >
                        <div className="testimonial-viewport">
                            <div
                                className="testimonial-track"
                                style={{
                                    transform: `translateX(-${(testimonialSlide / testimonialVisible) * 100}%)`,
                                    transition: testimonialAnimating ? 'transform 0.65s ease' : 'none',
                                }}
                                onTransitionEnd={onTestimonialTransitionEnd}
                            >
                                {testimonialSliderCards.map((item, index) => (
                                    <article
                                        key={`${item.name}-${index}`}
                                        className="testimonial-slide"
                                    >
                                        <div className="testimonial-card">
                                            <div className="testimonial-card-header">
                                                <div className="testimonial-avatar">{item.initials}</div>

                                                <div>
                                                    <h4 className="font-semibold text-lg text-[#0c2340]">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-gray-500 text-sm">
                                                        {item.role} • {item.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {item.text}
                                            </p>

                                            <div className="flex gap-1 text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} size={18} />
                                                ))}
                                            </div>

                                            <span className="testimonial-quote-mark">
                                                "
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-dots">
                        {testimonials.map((item, index) => {
                            const isActive =
                                ((testimonialSlide - testimonialVisible) % totalTestimonials + totalTestimonials) %
                                totalTestimonials ===
                                index

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    aria-pressed={isActive}
                                    className={`testimonial-dot${isActive ? ' testimonial-dot-active' : ''}`}
                                    onClick={() => {
                                        setTestimonialAnimating(true)
                                        setTestimonialSlide(index + testimonialVisible)
                                    }}
                                />
                            )
                        })}
                    </div>

                    {/* bottom bar */}
                    <div className="mt-12 bg-[#0c2340] text-white text-center py-4 rounded-lg">
                        TORADO started its march with providing assistants in
                        <span className="text-pink-500 font-semibold"> 1999</span>. Initially
                        they provide financial assistance within the country.
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Heading */}
                    <div className="text-center mb-14">
                        <p className="text-pink-600 font-semibold tracking-widest">
                            BLOG & NEWS
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#1b2940] mt-3">
                            Consulter Latest Blog & News
                        </h2>
                    </div>

                    {/* Cards */}
                    <div className="blog-news-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article key={blog.id} className="blog-news-card">

                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <img src={blog.image} className="blog-news-image" alt={blog.title} />

                                    {/* Date */}
                                    <div className="blog-news-date">
                                        <p className="text-2xl font-bold">{blog.date}</p>
                                        <p className="text-xs">Jul</p>
                                        <p className="text-xs">2025</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="blog-news-content">
                                    <p className="blog-news-category">{blog.category}</p>

                                    <h3 className="blog-news-title">{blog.title}</h3>

                                    <button className="blog-news-button" type="button">
                                        READ MORE
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home





