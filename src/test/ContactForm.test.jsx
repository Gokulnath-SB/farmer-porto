import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm, {
  DRAFT_STATUS,
  buildMailtoUrl,
  charCount,
  validateField,
  validateForm,
} from '../components/ContactForm';
import { profile } from '../data/site.js';

describe('contact form validation', () => {
  it('rejects empty and whitespace-only values', () => {
    const errors = validateForm({ name: '   ', email: '', message: '\n\t  ' });
    expect(errors.name).toMatch(/required/i);
    expect(errors.email).toMatch(/required/i);
    expect(errors.message).toMatch(/required/i);
  });

  it('validates length, email shape and unicode character counts', () => {
    expect(validateField('name', '李')).toMatch(/at least 2 characters/i);
    expect(charCount('👩🏽‍💻' )).toBeGreaterThanOrEqual(1);
    expect(validateField('email', 'not-an-email')).toMatch(/valid email/i);
    expect(validateField('message', 'short')).toMatch(/at least 10 characters/i);
    expect(validateField('message', 'x'.repeat(2001))).toMatch(/2000 characters or fewer/i);

    const valid = validateForm({
      name: 'Gokulnath',
      email: 'test@example.com',
      message: 'Hello, I would like to discuss a project.',
    });
    expect(valid).toEqual({ name: '', email: '', message: '' });
  });

  it('builds an encoded mailto draft without claiming delivery', () => {
    const url = buildMailtoUrl({
      name: 'Ana Silva',
      email: 'ana@example.com',
      message: 'Hello & welcome',
    });
    expect(url).toContain(`mailto:${profile.email}`);
    expect(url).toContain(encodeURIComponent('Portfolio enquiry from Ana Silva'));
    expect(url).toContain(encodeURIComponent('Hello & welcome'));
    expect(url).not.toMatch(/sent|delivered/i);
  });

  it('shows an inline error summary and focuses the first invalid field', async () => {
    render(<ContactForm />);
    const submit = screen.getByRole('button', { name: /open email draft/i });
    fireEvent.click(submit);

    expect(screen.getByRole('alert')).toHaveTextContent(/Name is required/i);
    expect(screen.getByLabelText(/^Name/)).toHaveAttribute('aria-invalid', 'true');
    await waitFor(() => expect(screen.getByLabelText(/^Name/)).toHaveFocus());
  });

  it('reports the draft status honestly after valid input', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { value: 'I would like to talk about a software engineering role.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /open email draft/i }));

    expect(await screen.findByText(DRAFT_STATUS)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    consoleError.mockRestore();
  });
});
