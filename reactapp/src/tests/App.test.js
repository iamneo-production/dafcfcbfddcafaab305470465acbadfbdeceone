import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import QuoteGenerator from '../components/QuoteGenerator';

test('renders_title_with_h1_tag', () => {
  render(<App />);
  const titleElement = screen.getByText(/Random Quote Generator/i);
  expect(titleElement.tagName).toBe('H1');
});

test('displays_a_quote_and_author_name_when_clicking_button', async () => {
  render(<App />);
  const button = screen.getByText(/Surprise Me/i);
  fireEvent.click(button);
  const quoteElement = await screen.findByText(/- .+/); 
  expect(quoteElement).toBeInTheDocument();
});

test('creates_Surprise_Me_button', () => {
  render(<App />);
  const button = screen.getByText(/Surprise Me/i);
  expect(button).toBeInTheDocument();
});

test('changes_quote_on_button_click', async () => {
  render(<App />);

  const button = screen.getByText(/Surprise Me/i);

  // Get initial quote author
  const initialQuoteAuthor = screen.getByText(/- .+/).textContent;

  fireEvent.click(button);

  // Wait for new quote author to appear
  await screen.findByText(/- (?!initialQuoteAuthor$).+/);

  // Get new quote author
  const newQuoteAuthor = screen.getByText(/- .+/).textContent;

  expect(newQuoteAuthor).not.toBe(initialQuoteAuthor);
});


test('displayRandomQuote_is_used_and_performs', async () => {
  render(<App />);

  // Get initial quote text
  const initialQuoteText = screen.getByTestId('quote').textContent;

  // Click the "Surprise Me" button
  const button = screen.getByText(/Surprise Me/i);
  fireEvent.click(button);

  // Wait for a new quote to appear
  await screen.findByTestId('quote');

  // Get new quote text
  const newQuoteText = screen.getByTestId('quote').textContent;

  // Check if the quote text has changed
  expect(newQuoteText).not.toBe(initialQuoteText);
});

