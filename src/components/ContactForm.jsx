/* eslint-disable react-refresh/only-export-components -- validation helpers are intentionally exported for reuse and tests */
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/site.js';
import './ContactForm.css';

/** Validation limits are exported so they can be reused or checked in isolation. */
export const VALIDATION_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
};

export const FIELD_ORDER = ['name', 'email', 'message'];

export const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  message: 'Message',
};

export const DRAFT_STATUS =
  'Your email app will open with the draft. This site does not send messages.';

const EMPTY_VALUES = { name: '', email: '', message: '' };
const EMPTY_ERRORS = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Count Unicode code points rather than UTF-16 units so emoji count as one character. */
export function charCount(value) {
  return Array.from(typeof value === 'string' ? value : '').length;
}

/** Returns an empty string when valid, otherwise a human-readable error. */
export function validateField(field, value) {
  const raw = typeof value === 'string' ? value : '';
  const trimmed = raw.trim();
  const count = charCount(trimmed);

  if (field === 'name') {
    if (!trimmed) return 'Name is required.';
    if (count < VALIDATION_LIMITS.name.min) {
      return `Name must be at least ${VALIDATION_LIMITS.name.min} characters.`;
    }
    if (count > VALIDATION_LIMITS.name.max) {
      return `Name must be ${VALIDATION_LIMITS.name.max} characters or fewer.`;
    }
    return '';
  }

  if (field === 'email') {
    if (!trimmed) return 'Email is required.';
    if (count > VALIDATION_LIMITS.email.max) {
      return `Email must be ${VALIDATION_LIMITS.email.max} characters or fewer.`;
    }
    if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.';
    return '';
  }

  if (field === 'message') {
    if (!trimmed) return 'Message is required.';
    if (count < VALIDATION_LIMITS.message.min) {
      return `Message must be at least ${VALIDATION_LIMITS.message.min} characters.`;
    }
    if (count > VALIDATION_LIMITS.message.max) {
      return `Message must be ${VALIDATION_LIMITS.message.max} characters or fewer.`;
    }
    return '';
  }

  return '';
}

export function validateForm(values = {}) {
  return {
    name: validateField('name', values.name),
    email: validateField('email', values.email),
    message: validateField('message', values.message),
  };
}

/** Builds a mailto draft. Nothing is transmitted by the site itself. */
export function buildMailtoUrl(values = {}) {
  const name = String(values.name ?? '').trim();
  const email = String(values.email ?? '').trim();
  const message = String(values.message ?? '').trim();

  const subject = `Portfolio enquiry from ${name}`;
  const body = `${message}\r\n\r\n---\r\nFrom: ${name}\r\nReply to: ${email}`;

  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState('');
  const fieldRefs = useRef({});

  const invalidFields = FIELD_ORDER.filter((field) => errors[field]);
  const messageCount = charCount(values.message);

  function handleChange(field, value) {
    setValues((previous) => ({ ...previous, [field]: value }));

    if (touched[field]) {
      setErrors((previous) => ({ ...previous, [field]: validateField(field, value) }));
    }

    if (status) setStatus('');
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors((previous) => ({ ...previous, [field]: validateField(field, values[field]) }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      setErrors(nextErrors);
      setTouched({ name: true, email: true, message: true });
      setShowSummary(true);
      setStatus('');
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrors(EMPTY_ERRORS);
    setShowSummary(false);
    setStatus(DRAFT_STATUS);

    try {
      window.location.href = buildMailtoUrl(values);
    } catch {
      /* Mail clients handle mailto differently; the draft notice remains truthful. */
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__head">
        <p className="mono-label contact-form__eyebrow">Write a draft</p>
        <h3 className="contact-form__title">Tell me what you&apos;re working on.</h3>
        <p className="contact-form__note">
          This form opens a pre-filled message in your email app. Nothing is sent from this site.
        </p>
      </div>

      {showSummary && invalidFields.length > 0 ? (
        <div className="contact-form__summary" role="alert">
          <p className="contact-form__summary-title">Please fix the following before continuing:</p>
          <ul className="contact-form__summary-list">
            {invalidFields.map((field) => (
              <li key={field}>
                <a
                  href={`#contact-${field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    fieldRefs.current[field]?.focus();
                  }}
                >
                  {FIELD_LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-name">
          Name <span className="contact-form__required" aria-hidden="true">*</span>
        </label>
        <input
          ref={(node) => {
            fieldRefs.current.name = node;
          }}
          className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => handleChange('name', event.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Your name"
          autoComplete="name"
          required
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p className="contact-form__error" id="contact-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-email">
          Email <span className="contact-form__required" aria-hidden="true">*</span>
        </label>
        <input
          ref={(node) => {
            fieldRefs.current.email = node;
          }}
          className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(event) => handleChange('email', event.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email ? (
          <p className="contact-form__error" id="contact-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">
          Message <span className="contact-form__required" aria-hidden="true">*</span>
        </label>
        <textarea
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          className={`contact-form__textarea${errors.message ? ' contact-form__textarea--error' : ''}`}
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => handleChange('message', event.target.value)}
          onBlur={() => handleBlur('message')}
          placeholder="A few sentences about your idea or question"
          autoComplete="off"
          required
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <p className="contact-form__error" id="contact-message-error">
            {errors.message}
          </p>
        ) : null}
        <div className="contact-form__meta">
          <span className="contact-form__hint">Minimum 10 characters</span>
          <span
            className={`contact-form__counter${
              messageCount > VALIDATION_LIMITS.message.max ? ' contact-form__counter--over' : ''
            }`}
          >
            {messageCount} / {VALIDATION_LIMITS.message.max}
          </span>
        </div>
      </div>

      <div className="contact-form__actions">
        <button className="btn btn--primary contact-form__submit" type="submit">
          Open email draft
          <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
        </button>
        <p className="contact-form__status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}
