import { format, addMonths, subMonths } from 'date-fns';
import './MonthToggle.css';

export default function MonthToggle({ date, onChange }) {
  const today = new Date(date.year, date.month, date.day || 1);

  const handlePrev = () => onChange(subMonths(today, 1));
  const handleNext = () => onChange(addMonths(today, 1));

  return (
    <div className="month-toggle">
      <button
        className="arrow-button"
        onClick={handlePrev}
        aria-label="Previous Month"
      >
        &lsaquo;
      </button>
      <div className="month-label">{format(today, 'MMMM')}</div>
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
