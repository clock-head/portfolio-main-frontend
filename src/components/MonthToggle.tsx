import { format, addMonths, subMonths } from 'date-fns';
import './MonthToggle.css';
import { DateInput } from '../types/DateInput';

interface MonthToggleProps {
  date: DateInput;
  onChange: (newDate: Date) => void;
}

const MonthToggle: React.FC<MonthToggleProps> = ({ date, onChange }) => {
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
};

export default MonthToggle;
