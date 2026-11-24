import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Intro from '../components/Intro';

const SEEN_KEY = 'porto-intro-seen';

describe('cinematic intro', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('is skippable and remembers the choice for the session', async () => {
    render(<Intro />);

    expect(screen.getByRole('dialog', { name: 'PORTO opening sequence' })).toBeInTheDocument();
    expect(screen.getByText(/GROWING IDEAS\./)).toBeInTheDocument();
    expect(screen.getByText(/BUILDING THE FUTURE\./)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /skip intro/i }));

    // The intro has an 850ms AnimatePresence exit before it unmounts.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(), { timeout: 3000 });
    expect(window.sessionStorage.getItem(SEEN_KEY)).toBe('1');
  });

  it('does not replay once seen in the current session', () => {
    window.sessionStorage.setItem(SEEN_KEY, '1');
    render(<Intro />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
