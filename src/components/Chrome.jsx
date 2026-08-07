import { useRef } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

/** Groups decorative bits: grain overlay and the top scroll-progress bar. */
export default function Chrome() {
  const barRef = useRef(null);

  useScrollProgress(barRef);

  return (
    <>
      <div className="grain"></div>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" ref={barRef}></div>
      </div>
    </>
  );
}
