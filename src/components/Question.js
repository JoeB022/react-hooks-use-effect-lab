import { render, screen } from '@testing-library/react';
import Question from '../Question';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

test('decrements the timer by 1 every second', () => {
  const onAnswered = jest.fn();
  render(<Question onAnswered={onAnswered} />);

  // Check initial timer value
  expect(screen.getByText(/Time Remaining: 10 seconds/i)).toBeInTheDocument();

  // Fast-forward 1 second
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/Time Remaining: 9 seconds/i)).toBeInTheDocument();

  // Fast-forward to 0 seconds
  act(() => {
    jest.advanceTimersByTime(9000);
  });
  expect(onAnswered).toHaveBeenCalledWith(false);
});

test('clears the interval after unmount', () => {
  const onAnswered = jest.fn();
  const { unmount } = render(<Question onAnswered={onAnswered} />);

  unmount();

  // Ensure the interval is cleared and onAnswered is not called again
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(onAnswered).not.toHaveBeenCalled();
});

