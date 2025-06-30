/// <reference types="vitest" />
import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import { useBookingLogic } from '../hooks/useBookingLogic';
import { useEffect } from 'react';

function TestComponent() {
  const { date, selectDay, selectTime, time, isAvailable } = useBookingLogic();

  useEffect(() => {
    selectDay(7);
    selectTime('12:00');
  }, []);

  return (
    <>
      <div data-testid="day">{date.day}</div>
      <div data-testid="time">{time}</div>
      <div data-testid="available">{isAvailable.toString()}</div>
    </>
  );
}

describe('useBookingLogic (manual test component)', () => {
  it('sets date and time correctly', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('day').textContent).toBe('7');
    expect(screen.getByTestId('time').textContent).toBe('12:00');
    expect(screen.getByTestId('available').textContent).toBe('false');
  });
});
