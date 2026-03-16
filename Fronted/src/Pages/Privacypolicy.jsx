import React from 'react'
import heroImg from '../assets/Image/service-bg.jpg'
import { Link } from 'react-router-dom'

function Privacypolicy({ pageTitle = 'Privacy Policy' }) {
  const sections = [
    {
      id: 1,
      title: 'Staudigl perfumery and health shop caress your soul',
      paragraphs: [
        'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the.',
        'Truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        'It has survived not only five centuries, but also the leap into electronic typesetting.',
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
        'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      ],
    },
    {
      id: 2,
      title: 'Available for clinic services',
      paragraphs: [
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      ],
    },
    {
      id: 3,
      title: 'Rate & write reviews',
      paragraphs: [
        'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.',
      ],
    },
    {
      id: 4,
      title: 'Available tests',
      paragraphs: [
        'Fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque pouam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',
        'On the other hand, we denounce whteous indignation and dislike men wh beguiled and demoralized er hand.',
        'Nunc, mauris ut in vestibulum. Consectetur phasellus ultrices fusce nibh justo, venenatis, amet.',
        'Phasellus ultrices fusce nibh venenatis, amet to all design and development.',
      ],
    },
    {
      id: 5,
      title: 'Processing of personal reviews',
      paragraphs: [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum eleniti corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis.',
      ],
    },
  ]

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[2rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[7rem]">
              PRIVACY
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
            <img src={heroImg} alt="Privacy policy background" className="block h-full w-full object-cover object-top" />
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

      <section className="py-20">
        <div className="mx-auto max-w-6xl space-y-14 px-6">
          {sections.map((section) => (
            <div key={section.id}>
              <h2 className="mb-6 text-3xl font-extrabold text-[#0f1f3c] md:text-4xl">
                {section.id}. {section.title}
              </h2>

              <div className="space-y-5 text-lg leading-relaxed text-gray-600">
                {section.paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Privacypolicy
