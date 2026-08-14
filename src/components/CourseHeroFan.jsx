import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import { useApp } from '../context/AppContext';

const fanSlots = [
  { width: 'w-[36%] md:w-[38%]', layout: '-mr-6 md:-mr-10 z-10', rotate: -7, x: 40, ty: 20 },
  { width: 'w-[40%] md:w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: -10 },
  { width: 'w-[36%] md:w-[38%]', layout: '-ml-6 md:-ml-10 z-10', rotate: 7, x: -40, ty: 20 },
];

const fanContainer = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
      delayChildren: 0.25,
      staggerChildren: 0.1,
    },
  },
};

const fanCardVariant = {
  hidden: (slot) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ active, variants, className, children }) {
  if (!active) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={variants ?? itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

function ImageFan({ images, imageAlts, animate }) {
  return (
    <motion.div
      className="chf-fan-container relative flex w-full items-center justify-center"
      variants={fanContainer}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
    >
      {images.slice(0, 3).map((src, i) => {
        const slot = fanSlots[i] ?? fanSlots[1];
        return (
          <motion.div
            key={src}
            custom={slot}
            variants={fanCardVariant}
            className={`chf-fan-card relative shrink-0 overflow-hidden rounded-2xl shadow-2xl ${slot.layout}`}
            style={{
              width: i === 1 ? '38%' : '32%',
              aspectRatio: '4 / 5',
            }}
          >
            <img
              src={src}
              alt={imageAlts?.[i] ?? 'Course preview'}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="chf-card-overlay" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function CourseHeroFan() {
  const { language, t } = useApp();
  const reduce = useReducedMotion();
  const animate = !reduce;
  const isEs = language === 'es';

  const title = 'Master the Piano with World-Class Courses';
  const titleLine2Prefix = 'by';
  const titleHighlight = 'Jesus Molina';
  const description = 'Two world-class platforms to master piano, composition, and harmony. Experience an elegant, step-by-step methodology designed to elevate your musical journey.';
  const socialProof = '✦ Trusted by 5,000+ Students Worldwide ✦ 4.9★ Rating';

  const images = [
    `${import.meta.env.BASE_URL}images/image1.png`,
    `${import.meta.env.BASE_URL}images/image3.png`,
    `${import.meta.env.BASE_URL}images/image2.png`,
  ];
  const imageAlts = ['Piano Essentials', 'Dexterity Course', 'Live Performance'];

  const titleElement = (
    <h2 className="chf-title text-foreground font-serif tracking-tight text-balance">
      <Balancer>{title}</Balancer>
      <br />
      <Balancer>
        <span>{titleLine2Prefix} </span>
        <span className="chf-title-highlight">{titleHighlight}</span>
      </Balancer>
    </h2>
  );

  const descriptionElement = (
    <p className="chf-description">
      <Balancer>{description}</Balancer>
    </p>
  );

  const ctasElement = (
    <div className="chf-ctas-group flex flex-wrap items-center justify-center gap-4">
      <a href="#cursos-disponibles" className="chf-btn-primary">
        <span>{isEs ? 'Explorar Cursos' : 'Explore Courses'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
      <a href="https://www.clama.mx/" target="_blank" rel="noopener noreferrer" className="chf-btn-secondary">
        <span>{isEs ? 'Conocer CLAMA' : 'Discover CLAMA'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  );

  const socialProofElement = (
    <p className="chf-social-proof">{socialProof}</p>
  );

  return (
    <div className="chf-section relative isolate w-full overflow-hidden">
      <motion.div
        className="chf-content-wrapper relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-60px' }}
      >
        <Reveal active={animate} className="chf-header flex w-full max-w-2xl flex-col items-center">
          {titleElement}
          {descriptionElement}
        </Reveal>

        <Reveal active={animate} className="flex flex-col items-center gap-4 my-6">
          {ctasElement}
          {socialProofElement}
        </Reveal>

        <div className="chf-fan-wrapper mx-auto w-full max-w-3xl mt-4">
          <ImageFan images={images} imageAlts={imageAlts} animate={animate} />
        </div>
      </motion.div>
    </div>
  );
}
