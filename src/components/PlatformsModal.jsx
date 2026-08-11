import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { PlatformIcon } from './platformIcons';
import { defaultTrackData } from '../data/platforms';

const PLATFORM_META = {
  spotify: { glow: '#1db954', className: 'pm-card--spotify' },
  apple: { glow: '#ffffff', className: 'pm-card--apple' },
  youtube: { glow: '#ff0000', className: 'pm-card--youtube' },
  soundcloud: { glow: '#ff5500', className: 'pm-card--soundcloud' },
  instagram: { glow: '#e1306c', className: 'pm-card--instagram' },
  tiktok: { glow: '#25f4ee', className: 'pm-card--tiktok' },
  facebook: { glow: '#1877f2', className: 'pm-card--facebook' },
};

const VISUALIZER_BARS = [0.35, 0.62, 0.48, 0.82, 0.55, 0.74, 0.42, 0.68, 0.5, 0.88, 0.58, 0.72];

const BACKGROUND_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${6 + (i * 5.7) % 88}%`,
  left: `${4 + (i * 9.3) % 92}%`,
  size: 1.5 + (i % 3),
  delay: `${(i * 0.6) % 6}s`,
  duration: `${5 + (i % 4)}s`,
}));

function AudioVisualizer({ reducedMotion }) {
  return (
    <div className="pm-visualizer" aria-hidden="true">
      <div className="pm-visualizer__ring pm-visualizer__ring--outer" />
      <div className="pm-visualizer__ring pm-visualizer__ring--inner" />
      <svg className="pm-visualizer__wave" viewBox="0 0 200 40" preserveAspectRatio="none">
        <path
          d="M0 20 C25 8, 50 32, 75 20 S125 8, 150 20 S175 32, 200 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <div className="pm-visualizer__bars">
        {VISUALIZER_BARS.map((height, i) => (
          <motion.span
            key={i}
            className="pm-visualizer__bar"
            style={{ '--bar-h': height }}
            animate={
              reducedMotion
                ? { scaleY: height }
                : { scaleY: [height * 0.6, height, height * 0.75, height * 1.1, height * 0.65] }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: 1.8 + (i % 3) * 0.3,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: i * 0.08,
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}

function PlatformCard({ platform, description, index, isDimmed, onHover, onLeave, reducedMotion }) {
  const meta = PLATFORM_META[platform.iconId] || { glow: '#ffffff', className: '' };

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`pm-card ${meta.className}${isDimmed ? ' is-dimmed' : ''}`}
      style={{ '--pm-glow': meta.glow }}
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 380,
            damping: 32,
            delay: index * 0.06,
          },
        },
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -5,
              transition: { type: 'spring', stiffness: 420, damping: 28 },
            }
      }
      whileTap={reducedMotion ? {} : { scale: 0.985 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
    >
      <span className="pm-card__glow" aria-hidden="true" />
      <span className="pm-card__icon">
        <PlatformIcon id={platform.iconId} size={24} />
      </span>
      <span className="pm-card__content">
        <span className="pm-card__name">{platform.platformName}</span>
        {description && <span className="pm-card__desc">{description}</span>}
      </span>
      <span className="pm-card__arrow" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.a>
  );
}

export default function PlatformsModal({
  isOpen,
  onClose,
  platforms = defaultTrackData.platforms,
}) {
  const { t } = useApp();
  const reducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleParallax = useCallback(
    (e) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x, y });
    },
    [reducedMotion],
  );

  const resetParallax = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setHoveredId(null);
  }, [isOpen]);

  const overlayTransition = reducedMotion
    ? { duration: 0.15 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  const modalTransition = reducedMotion
    ? { duration: 0.15 }
    : { type: 'spring', stiffness: 320, damping: 32, mass: 0.85 };

  const platformDescriptions = t.platformDescriptions || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pm-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.platformsListenTitle || 'Listen'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="pm-modal"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24, filter: 'blur(12px)' }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16, filter: 'blur(8px)' }}
            transition={modalTransition}
            onMouseMove={handleParallax}
            onMouseLeave={resetParallax}
          >
            {/* Ambient background layers */}
            <div className="pm-ambient" aria-hidden="true">
              <motion.div
                className="pm-ambient__gradient pm-ambient__gradient--1"
                animate={
                  reducedMotion
                    ? {}
                    : { x: [0, 12, -8, 0], y: [0, -10, 6, 0] }
                }
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  transform: `translate(${parallax.x * 14}px, ${parallax.y * 10}px)`,
                }}
              />
              <motion.div
                className="pm-ambient__gradient pm-ambient__gradient--2"
                animate={
                  reducedMotion
                    ? {}
                    : { x: [0, -14, 10, 0], y: [0, 8, -12, 0] }
                }
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  transform: `translate(${parallax.x * -10}px, ${parallax.y * -8}px)`,
                }}
              />
              <div className="pm-ambient__volumetric" />
              <div className="pm-ambient__noise" />
              <div className="pm-ambient__particles">
                {BACKGROUND_PARTICLES.map((p) => (
                  <span
                    key={p.id}
                    className="pm-ambient__particle"
                    style={{
                      top: p.top,
                      left: p.left,
                      width: p.size,
                      height: p.size,
                      animationDelay: p.delay,
                      animationDuration: p.duration,
                    }}
                  />
                ))}
              </div>
            </div>

            <motion.button
              className="pm-close"
              onClick={onClose}
              aria-label={t.platformsClose || 'Close'}
              whileHover={
                reducedMotion
                  ? {}
                  : { rotate: 90, scale: 1.08, boxShadow: '0 0 24px rgba(255,255,255,0.25)' }
              }
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>

            <div className="pm-body">
              <motion.header
                className="pm-header"
                initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="pm-headline">{t.platformsListenTitle || 'LISTEN'}</h2>
                <motion.span
                  className="pm-headline-line"
                  initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.header>

              <motion.div
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <AudioVisualizer reducedMotion={reducedMotion} />
              </motion.div>

              <motion.div
                className="pm-list"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {platforms.map((platform, i) => (
                  <PlatformCard
                    key={platform.iconId}
                    platform={platform}
                    description={platformDescriptions[platform.iconId]}
                    index={i}
                    isDimmed={hoveredId !== null && hoveredId !== platform.iconId}
                    onHover={() => setHoveredId(platform.iconId)}
                    onLeave={() => setHoveredId(null)}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
