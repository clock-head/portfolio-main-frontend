import { format, addMonths, subMonths } from 'date-fns';
import './MonthToggle.css';

export default function MonthToggle({ month, onChange }) {
  const handlePrev = () => onChange(subMonths(month, 1));
  const handleNext = () => onChange(addMonths(month, 1));

  return (
    <div className="month-toggle">
      <button
        className="arrow-button"
        onClick={handlePrev}
        aria-label="Previous Month"
      >
        &lsaquo;
      </button>
      <div className="month-label">{format(month, 'MMMM')}</div>
      <button
        className="arrow-button"
        onClick={handleNext}
        aria-label="Next Month"
      >
        &rsaquo;
      </button>
    </div>
  );
}
