import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { "data-testid": "day", children: date.day }), _jsx("div", { "data-testid": "time", children: time }), _jsx("div", { "data-testid": "available", children: isAvailable.toString() })] }));
}
describe('useBookingLogic (manual test component)', () => {
    it('sets date and time correctly', () => {
        render(_jsx(TestComponent, {}));
        expect(screen.getByTestId('day').textContent).toBe('7');
        expect(screen.getByTestId('time').textContent).toBe('12:00');
        expect(screen.getByTestId('available').textContent).toBe('false');
    });
});
