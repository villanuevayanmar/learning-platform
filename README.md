# Learning Platform

A prototype for an adaptive learning platform. The working product name is Learning Studio; the final name remains undecided.

## Current scope
- Introductory C lesson on variables and data types.
- Guided, self-paced, and adaptive modes.
- Hints, feedback, retries, and concept-level practice.
- Independent mastery is measured separately from supported answers.
- Personal notes and progress persist in the current browser.
- Responsive React interface.

This is an early prototype, not a complete production platform. It does not yet provide sign-in, student/teacher accounts, cross-device sync, AI model access, or a production database. Local progress is device/browser-specific.

## Run locally
Requires Node.js 22 or newer.
- npm install
- npm run dev
- npm run typecheck
- npm test
- npm run build

## Architecture direction
React + TypeScript + Vite; Supabase Auth and PostgreSQL when a dedicated free project is available; a provider-independent AI teacher service with a built-in non-AI fallback. The learning engine must function without an AI provider.

The database migration is not yet connected to any database. No existing Supabase project has been reused. No paid APIs, subscriptions, or usage billing are part of this implementation.