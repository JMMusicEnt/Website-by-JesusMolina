import { useEffect, useRef } from 'react';

/**
 * Infinite auto-scrolling marquee that the user can also drag (mouse) or swipe (touch).
 *
 * The track must render its items `copies` times in a row: the loop wraps every
 * 1/copies of the track width, so the seam is never visible.
 * Durations are the seconds needed to scroll one full set (same as the old CSS animation).
 */
export function useDragMarquee({
  copies = 4,
  duration = 40,
  mobileDuration = 30,
  mobileQuery = '(max-width: 768px)',
  resumeDelay = 1200,
} = {}) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mq = window.matchMedia(mobileQuery);
    const DRAG_THRESHOLD = 6; // px before a press becomes a horizontal drag
    const MAX_VELOCITY = 3; // px/ms

    let setWidth = track.scrollWidth / copies;
    let offset = 0; // px, kept in (-setWidth, 0]
    let autoFactor = 1; // 0..1, eases auto-scroll in/out
    let velocity = 0; // px/ms, inertia after release
    let hovering = false;
    let pressed = false;
    let dragging = false;
    let moved = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let resumeAt = 0;
    let prevT = 0;
    let raf = null;

    const wrap = (x) => {
      if (!setWidth) return x;
      x %= setWidth;
      return x > 0 ? x - setWidth : x;
    };

    const render = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (now) => {
      const dt = prevT ? Math.min(now - prevT, 64) : 16;
      prevT = now;

      if (!dragging) {
        if (velocity !== 0) {
          offset += velocity * dt;
          velocity *= Math.pow(0.94, dt / 16.67);
          if (Math.abs(velocity) < 0.02) velocity = 0;
        }

        const shouldAuto = !hovering && !pressed && velocity === 0 && now >= resumeAt;
        autoFactor += ((shouldAuto ? 1 : 0) - autoFactor) * Math.min(1, dt / 400);
        const secs = mq.matches ? mobileDuration : duration;
        offset -= (setWidth / (secs * 1000)) * dt * autoFactor;

        offset = wrap(offset);
        render();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf === null) {
        prevT = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const endPress = (e) => {
      if (e.pointerId !== pointerId) return;
      if (dragging) {
        // Ignore stale velocity if the pointer rested before release
        if (performance.now() - lastT > 80) velocity = 0;
        wrapper.classList.remove('is-dragging');
        if (wrapper.hasPointerCapture?.(e.pointerId)) wrapper.releasePointerCapture(e.pointerId);
      }
      dragging = false;
      pressed = false;
      pointerId = null;
      resumeAt = performance.now() + resumeDelay;
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerId = e.pointerId;
      pressed = true;
      moved = false;
      velocity = 0;
      startX = lastX = e.clientX;
      startY = e.clientY;
      lastT = performance.now();
      startOffset = offset;
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;

      if (!dragging) {
        const dy = e.clientY - startY;
        if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
        dragging = true;
        moved = true;
        // Start from the current position so the track doesn't jump by the threshold
        startOffset = offset - dx;
        wrapper.classList.add('is-dragging');
        wrapper.setPointerCapture?.(e.pointerId);
      }

      const now = performance.now();
      const dtMove = now - lastT;
      if (dtMove > 0) {
        const v = (e.clientX - lastX) / dtMove;
        velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, 0.8 * v + 0.2 * velocity));
      }
      lastX = e.clientX;
      lastT = now;

      offset = wrap(startOffset + dx);
      render();
    };

    const onPointerEnter = (e) => {
      if (e.pointerType === 'mouse') hovering = true;
    };
    const onPointerLeave = (e) => {
      if (e.pointerType === 'mouse' && !dragging) hovering = false;
    };
    const onLostCapture = (e) => {
      endPress(e);
      if (e.pointerType === 'mouse' && !wrapper.matches(':hover')) hovering = false;
    };

    // Don't let a drag end up triggering a click on something inside the carousel
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onDragStart = (e) => e.preventDefault();

    wrapper.addEventListener('pointerdown', onPointerDown);
    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerup', endPress);
    wrapper.addEventListener('pointercancel', endPress);
    wrapper.addEventListener('lostpointercapture', onLostCapture);
    wrapper.addEventListener('pointerenter', onPointerEnter);
    wrapper.addEventListener('pointerleave', onPointerLeave);
    wrapper.addEventListener('click', onClickCapture, true);
    wrapper.addEventListener('dragstart', onDragStart);

    const resizeObserver = new ResizeObserver(() => {
      setWidth = track.scrollWidth / copies;
      offset = wrap(offset);
      render();
    });
    resizeObserver.observe(track);

    // Only animate while the carousel is on screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(wrapper);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      wrapper.removeEventListener('pointerdown', onPointerDown);
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerup', endPress);
      wrapper.removeEventListener('pointercancel', endPress);
      wrapper.removeEventListener('lostpointercapture', onLostCapture);
      wrapper.removeEventListener('pointerenter', onPointerEnter);
      wrapper.removeEventListener('pointerleave', onPointerLeave);
      wrapper.removeEventListener('click', onClickCapture, true);
      wrapper.removeEventListener('dragstart', onDragStart);
      wrapper.classList.remove('is-dragging');
      track.style.transform = '';
    };
  }, [copies, duration, mobileDuration, mobileQuery, resumeDelay]);

  return { wrapperRef, trackRef };
}
