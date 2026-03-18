import React, { useState } from 'react'
import heroImg from '../assets/Image/service-bg.jpg'
import { Link } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import usePageContent from '../hooks/usePageContent'

const defaultContent = { pageTitle: "Faq's" }

function Faqs() {
  const content = usePageContent('faqs', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const [active, setActive] = useState(0)

  const faqs = [
    {
      question: 'Who I should select your company ?',
      answer:
        'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'What do you call a financial advisor?',
      answer:
        'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'How many your customers have ?',
      answer:
        'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'What kinds of payment do you accept?',
      answer: 'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'Where is you main office ?',
      answer: 'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'What does a financial consultant do?',
      answer:
        'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'Can my accountant access my account?',
      answer: 'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    },
    {
      question: 'Does TORADO offer its own card?',
      answer:
        'Tempor incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitation ullamco laboris nis aliquip consequat duis aute iure dolor volup enim veniam quis nostrud exercitation ullamco. Incididunt ut labore et dolore magna alquat enim veniam quis nost dexercitat ion ullamco laboris nis aliquip consequat duis aute iure dolor volup.',
    }
  ]

  const leftFaqIndexes = [0, 2, 4, 6]
  const rightFaqIndexes = [1, 3, 5, 7]

  const toggle = (index) => {
    setActive(active === index ? null : index)
  }

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[6rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[8rem]">
              FAQ
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
            <img src={heroImg} alt="Pricing plan background" className="block h-full w-full object-cover object-top" />
            <div className="absolute left-0 top-0 z-10 h-0 w-0" style={{ borderStyle: 'solid', borderWidth: '430px 0 0 200px', borderColor: 'transparent transparent transparent #0d1e35', }} />
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f6] py-16">
        <div className="mx-auto grid max-w-[1700px] gap-8 px-3 md:grid-cols-2 md:px-6">
          <div className="space-y-8">
            {leftFaqIndexes.map((index) => {
              const faq = faqs[index]
              return (
                <div key={index} className="rounded-lg">
                  <button
                    onClick={() => toggle(index)}
                    className={`relative flex w-full items-center justify-between overflow-hidden rounded-lg px-6 py-7 text-left text-[24px] font-semibold leading-[1.2] transition-colors duration-300 ${active === index ? 'bg-[#0b1f46] text-white' : 'bg-white text-[#001c45]'
                      }`}
                  >
                    {active === index && (
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 8% 50%, rgba(255,255,255,0.20) 0, rgba(255,255,255,0.20) 3px, transparent 3px), radial-gradient(circle at 15% 50%, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.10) 1px, transparent 1px)',
                          backgroundSize: '20px 20px, 15px 15px',
                        }}
                      />
                    )}
                    <span className="relative z-10">{faq.question}</span>
                    <FiChevronDown
                      className={`relative z-10 shrink-0 text-[30px] transition-transform duration-300 ${active === index ? 'rotate-180 text-white' : 'text-[#2a3342]'
                        }`}
                    />
                  </button>

                  {active === index && (
                    <div className="px-3 pt-8 text-[18px] leading-[1.8] text-[#3c4657]">
                      {faq.answer}
                      {index === 0 && (
                        <p className="pt-8">
                          Incididunt ut labore et dolore magna aliquat enim veniam quis nost
                          dexercitat ion ullamco laboris nis aliquip consequat duis aute iure
                          dolor volup.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="space-y-8">
            {rightFaqIndexes.map((index) => {
              const faq = faqs[index]
              return (
                <div key={index} className="rounded-lg">
                  <button
                    onClick={() => toggle(index)}
                    className={`relative flex w-full items-center justify-between overflow-hidden rounded-lg px-6 py-7 text-left text-[24px] font-semibold leading-[1.2] transition-colors duration-300 ${active === index ? 'bg-[#0b1f46] text-white' : 'bg-white text-[#001c45]'
                      }`}
                  >
                    {active === index && (
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 8% 50%, rgba(255,255,255,0.20) 0, rgba(255,255,255,0.20) 3px, transparent 3px), radial-gradient(circle at 15% 50%, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.10) 1px, transparent 1px)',
                          backgroundSize: '20px 20px, 15px 15px',
                        }}
                      />
                    )}
                    <span className="relative z-10">{faq.question}</span>
                    <FiChevronDown
                      className={`relative z-10 shrink-0 text-[30px] transition-transform duration-300 ${active === index ? 'rotate-180 text-white' : 'text-[#2a3342]'
                        }`}
                    />
                  </button>

                  {active === index && (
                    <div className="px-3 pt-8 text-[18px] leading-[1.8] text-[#3c4657]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div>
            <p className="mb-3 font-semibold tracking-widest text-red-500">FAQ QUESTIONS</p>

            <h2 className="mb-10 text-5xl font-bold leading-tight text-[#0f1f3c]">
              Have Any Question And <br /> Any Answers?
            </h2>

            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-md border border-gray-200 bg-white p-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="rounded-md border border-gray-200 bg-white p-4 outline-none"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-gray-200 bg-white p-4 outline-none"
              />

              <textarea
                rows="6"
                placeholder="Message"
                className="w-full rounded-md border border-gray-200 bg-white p-4 mt-4 mb-4 outline-none"
              ></textarea>

              <button
                type="submit"
                className="rounded-md bg-red-500 px-8 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                SEND MASSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faqs
