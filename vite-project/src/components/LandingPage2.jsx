import React, { useRef, useEffect, useState } from 'react'
import '../index.css'
import Nav from './NavLanding.jsx'
import Footer from './Footer.jsx'
import {
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  ServerIcon,
} from '@heroicons/react/24/outline'

const faqs = [
  {
    id: 1,
    question: "What makes LuminaAI unique?",
    answer:
      "LuminaAI stands out with its AI-driven approach, delivering a streamlined project management experience with optimal efficiency and precision. It combines simplicity with high functionality, making it an ideal tool for project management.",
  },
  {
    id: 2,
    question: "Is LuminaAI suitable for freelancers and larger enterprises alike?",
    answer: "Yes, LuminaAI offers pricing plans for teams of all sizes. Whether you're a freelancer or part of a large enterprise, LuminaAI has plans tailored to meet your project management needs."
  },
  {
    id: 3,
    question: "How secure is LuminaAI?",
    answer: "LuminaAI takes security seriously. Our backend is secured with the latest encryption technology, ensuring that your data is safe and secure."
  },
  {
    id: 4,
    question: "Does LuminaAI offer a trial period?",
    answer: "Yes, LuminaAI offers a trial period for you to explore its features and capabilities. You can get started with the trial on our website.",
  }
]

const features = [
  {
    name: 'AI Feedback',
    description:
      'LuminaAI provides real-time feedback on your project, allowing you to make the best decisions for your team.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Calendar integration',
    description:
      'LuminaAI integrates with your calendar, allowing you to schedule meetings and events with ease.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Advanced Analytics',
    description:
      'LuminaAI provides advanced analytics on your project, allowing you to visualize your productivity and efficiency.',
    icon: ServerIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Our backend is secured with the latest encryption technology, ensuring that your data is safe and secure.',
    icon: FingerPrintIcon,
  },
]

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const HeroRef = useRef(null);
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const AboutRef = useRef(null);
  const [aboutIsVisible, setAboutIsVisible] = useState(false);
  const FeaturesRef = useRef(null);
  const [featuresIsVisible, setFeaturesIsVisible] = useState(false);
  const FAQRef = useRef(null);
  const [faqIsVisible, setFaqIsVisible] = useState(false);

  const toggleTheme = () => {
    console.log("change theme")
    setIsLightTheme(!isLightTheme);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === HeroRef.current && !elementIsVisible && entry.isIntersecting) {
          setElementIsVisible(true);
        } else if (entry.target === AboutRef.current && !aboutIsVisible && entry.isIntersecting) {
          setAboutIsVisible(true);
        } else if (entry.target === FeaturesRef.current && !featuresIsVisible && entry.isIntersecting) {
          setFeaturesIsVisible(true);
        } else if (entry.target === FAQRef.current && !faqIsVisible && entry.isIntersecting) {
          setFaqIsVisible(true);
        }
      });
    });
  
    observer.observe(HeroRef.current);
    observer.observe(AboutRef.current);
    observer.observe(FeaturesRef.current);
    observer.observe(FAQRef.current);
  }, []);

  return (
    <div className={isLightTheme ? "bg-white h-full overflow-auto w-full text-black" : "bg-gray-950 h-full overflow-auto w-full text-white"}>
      <Nav isLightTheme={isLightTheme} toggleTheme={toggleTheme}/>
      <section id="hero" ref={HeroRef} className="w-full h-full items-center justify-center flex">
        <div className={"animate-opacity-in w-1/2 h-1/2 flex flex-col justify-between mb-24"}>
          <h1 className="w-full text-7xl poppins">The Future of Project Management is Here.</h1>
          <h1 className={isLightTheme ? "text-black mt-4 text-lg mb-10" : "text-gray-200 mt-4 text-lg mb-10"}>LuminaAI embodies modernity through its innovative AI-driven approach, delivering a streamlined project management experience with optimal efficiency and precision.</h1>
          <div>
            <a
              onClick={toggleTheme}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
          </div>
        </div>

        <div className="w-1/3">
            <div className="z-10 animate-opacity-in mx-auto mt-16 flex sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none mr-10">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>        
        </div>
      </section>

      <section id="features" ref={FeaturesRef} className="w-full h-full  items-center justify-center flex">
      <div className={featuresIsVisible ? "text-z-10 animate-slide-in-reverse mx-auto max-w-7xl px-6 sm:mt-56 lg:px-8 justify-center items-center" : "hidden"}>
          <div className="mx-auto max-w-2xl lg:text-center items-center justify-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Simple and effortless.</h2>
            <p className={isLightTheme ? "mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" : "mt-2 text-3xl font-bold tracking-tight text-white-900 sm:text-4xl"}>
              Everything you need for project management and more.
            </p>
            <p className={isLightTheme ? "mt-6 text-lg leading-8 text-gray-600" : "mt-6 text-lg leading-8 text-gray-200"}>
              Utilizing a simple UI with high functionality, LuminaAI is the perfect tool for project management.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h1 className={isLightTheme ? "text-black" : "text-white"}>{feature.name}</h1>
                  </dt>
                  <dd className={isLightTheme ? "mt-2 text-base leading-7 text-gray-600" : "mt-2 text-base leading-7 text-gray-200"}>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="about" ref={AboutRef} className="w-full h-2/3 mt-32 items-center justify-center flex">
        {/* Testimonial section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8">
          <div className={aboutIsVisible ? "animate-slide-in w-full relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20" : "hidden"}>
            <img
              className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              alt=""
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div className="absolute -left-80 -top-56 transform-gpu blur-3xl" aria-hidden="true">
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div
              className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <img className="h-12 w-auto" src="https://tailwindui.com/img/logos/workcation-logo-white.svg" alt="" />
              <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8">
                  <p>
                    "LuminaAI revolutionized our project management, making our team incredibly efficient. Its intuitive interface, AI-powered task prioritization, and predictive analytics turned chaos into organized success – a must-have tool for any team striving for excellence!”
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Judith Black</div>
                  <div className="mt-1">CEO of Tuple</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" ref={FAQRef} className="mt-56 w-full h-full items-center justify-center flex">
      <div className={faqIsVisible ? "animate-opacity-in mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32" : "hidden"}>
          <h2 className={isLightTheme ? "text-2xl font-bold leading-10 tracking-tight text-gray-900" : "text-2xl font-bold leading-10 tracking-tight text-white-900"}>Frequently asked questions</h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className={isLightTheme ? "text-base font-semibold leading-7 text-gray-900 lg:col-span-5" : "text-base font-semibold leading-7 text-white lg:col-span-5" }>{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className={isLightTheme ? "text-base leading-7 text-gray-600" : "text-base leading-7 text-gray-200"}>{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}

export default App