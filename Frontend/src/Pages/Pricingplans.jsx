import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import heroImg from '../assets/Image/service-bg.jpg'
import usePageContent from '../hooks/usePageContent'

const defaultContent = {
  pageTitle: 'Pricing Plan',
  heroWatermark: 'Pricing',
  sectionTag: 'How We Charge',
  sectionTitle: 'Pricing Plans',
  sectionDescription:
    'Etiam euismod libero id neque facilisis elementum in eget ligula. Ut consequat varius blandit. Duis quis tortor quis lacus facilisis.',
  billingMonthlyLabel: 'Monthly',
  billingYearlyLabel: 'Yearly',
  billingSaveBadge: 'Save 2 Months',
  includesLabel: 'This Plan Includes Global Relations',
  enterpriseText: 'Need custom enterprise pricing?',
  enterpriseCtaText: 'Talk to our team',
  plans: [
    {
      id: 'small',
      name: 'Small Plan',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      description: 'Best for startup teams who need structured finance basics.',
      cta: 'Start Small Plan',
      featured: false,
      features: [
        { text: 'All Financial Tasks', active: true },
        { text: 'Economic Market Survey', active: true },
        { text: 'Sales Operations', active: false },
        { text: 'Auto Intelligence', active: false },
        { text: '24/7 Support', active: false },
        { text: 'Technology Services', active: false },
      ],
    },
    {
      id: 'smart',
      name: 'Smart Plan',
      monthlyPrice: 249,
      yearlyPrice: 2490,
      description: 'For growing businesses that need full planning and execution.',
      cta: 'Start Smart Plan',
      featured: true,
      features: [
        { text: 'All Financial Tasks', active: true },
        { text: 'Economic Market Survey', active: true },
        { text: 'Sales Operations', active: true },
        { text: 'Auto Intelligence', active: true },
        { text: '24/7 Support', active: false },
        { text: 'Technology Services', active: false },
      ],
    },
    {
      id: 'super',
      name: 'Super Plan',
      monthlyPrice: 349,
      yearlyPrice: 3490,
      description: 'Advanced package for high-scale operations and dedicated support.',
      cta: 'Start Super Plan',
      featured: false,
      features: [
        { text: 'All Financial Tasks', active: true },
        { text: 'Economic Market Survey', active: true },
        { text: 'Sales Operations', active: true },
        { text: 'Auto Intelligence', active: true },
        { text: '24/7 Support', active: true },
        { text: 'Technology Services', active: true },
      ],
    },
  ],
}

function Pricingplans() {
  const content = usePageContent('pricingplan', defaultContent)
  const pageTitle = content.pageTitle || defaultContent.pageTitle
  const plans = Array.isArray(content.plans) && content.plans.length ? content.plans : defaultContent.plans

  const [billing, setBilling] = useState('monthly')

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[430px] lg:grid-cols-2">
          <div className="relative flex items-center overflow-hidden bg-[#0d1e35] px-10 py-20 lg:px-16">
            <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[6rem] font-black uppercase tracking-widest text-white/[0.06] lg:text-[8rem]">
              {content.heroWatermark || defaultContent.heroWatermark}
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
            <img
              src={heroImg}
              alt="Pricing plan background"
              className="block h-full w-full object-cover object-top"
            />
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

      <section className="bg-[#f6f6f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="mb-2 text-sm font-semibold uppercase text-red-500">
                {content.sectionTag || defaultContent.sectionTag}
              </p>
              <h2 className="mb-4 text-4xl font-bold text-[#0f1f3d] md:text-5xl">
                {content.sectionTitle || defaultContent.sectionTitle}
              </h2>
              <p className="text-gray-600">
                {content.sectionDescription || defaultContent.sectionDescription}
              </p>
            </div>

            <div className="rounded-full bg-white p-1 shadow-md">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition ${billing === 'monthly'
                      ? 'bg-[#e61b50] text-white'
                      : 'text-gray-600 hover:text-[#0f1f3d]'
                    }`}
                >
                  {content.billingMonthlyLabel || defaultContent.billingMonthlyLabel}
                </button>

                <button
                  type="button"
                  onClick={() => setBilling('yearly')}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition ${billing === 'yearly'
                      ? 'bg-[#e61b50] text-white'
                      : 'text-gray-600 hover:text-[#0f1f3d]'
                    }`}
                >
                  {content.billingYearlyLabel || defaultContent.billingYearlyLabel}
                  <span className="ml-2 rounded-full bg-[#0f1f3d] px-2 py-0.5 text-[10px] font-bold text-white">
                    {content.billingSaveBadge || defaultContent.billingSaveBadge}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <button
                key={plan.id || `plan-${index}`}
                type="button"
                className={`relative overflow-hidden rounded-2xl border text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${plan.featured
                    ? 'border-[#e61b50] bg-[#0f1f3d] text-white'
                    : 'border-slate-200 bg-white text-[#17253d]'
                  }`}
              >
                {plan.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#e61b50] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}

                <div className="p-8">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.18em] ${plan.featured ? 'text-[#ff8fb0]' : 'text-[#e61b50]'
                      }`}
                  >
                    {plan.name}
                  </p>

                  <div className="mt-4 flex items-end gap-2">
                    <h3 className="text-5xl font-extrabold">
                      $
                      {billing === 'monthly'
                        ? Number(plan.monthlyPrice ?? 0)
                        : Number(plan.yearlyPrice ?? Number(plan.monthlyPrice ?? 0) * 10)}
                    </h3>
                    <span className={plan.featured ? 'text-white/70' : 'text-gray-500'}>
                      / {billing === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  <p className={`mt-4 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div
                  className={`border-y px-8 py-4 text-xs font-semibold uppercase tracking-wide ${plan.featured
                      ? 'border-white/15 bg-white/5 text-white/80'
                      : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                >
                  {content.includesLabel || defaultContent.includesLabel}
                </div>

                <div className="space-y-3 px-8 py-6">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feature, featureIndex) => (
                    <div key={`${feature.text}-${featureIndex}`} className="flex items-center gap-3 text-sm">
                      <FaCheckCircle
                        className={
                          feature.active
                            ? plan.featured
                              ? 'text-[#ff8fb0]'
                              : 'text-[#e61b50]'
                            : 'text-gray-400'
                        }
                      />
                      <span
                        className={
                          feature.active
                            ? plan.featured
                              ? 'text-white'
                              : 'text-gray-700'
                            : 'text-gray-400 line-through'
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="px-8 pb-8">
                  <Link
                    to="/contact"
                    className={`block rounded-md px-8 py-3 text-center text-sm font-bold uppercase tracking-wide no-underline transition ${plan.featured
                        ? 'bg-[#e61b50] text-white hover:bg-[#d41749]'
                        : 'border border-[#e61b50] text-[#e61b50] hover:bg-[#e61b50] hover:text-white'
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-[#0f1f3d] px-6 py-4 text-center text-white">
            {content.enterpriseText || defaultContent.enterpriseText}{' '}
            <Link to="/contact" className="font-bold text-[#ff8fb0] no-underline hover:text-white">
              {content.enterpriseCtaText || defaultContent.enterpriseCtaText}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pricingplans
