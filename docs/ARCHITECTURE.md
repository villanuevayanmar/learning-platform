# Architecture

## Current prototype
React + TypeScript + Vite. Learning rules live in a small independent TypeScript module. Progress and notes are stored in browser localStorage; this is local prototype storage, not account sync.

## Target architecture
- Web client: React + TypeScript + Vite.
- Identity and persistence: Supabase Auth + PostgreSQL on a dedicated free project.
- Learning engine: provider-independent TypeScript domain logic.
- AI teacher: server-side adapter; provider keys never reach the browser.
- Content: reviewed courses, lessons, concepts, exercises, and private answer keys.
- Hosting and source: GitHub and Vercel, subject to free-tier restrictions.

## Data boundaries
Public published course content is separate from private learner records. Row Level Security must scope learner data to its owner. Correctness evaluation and mastery writes must be performed by trusted server-side code. Private answer keys must not be exposed through public course queries.

## Current limitations
Authentication, teacher permissions, database connection, cross-device sync, AI, and isolated code execution are not implemented. A schema draft must not be applied to an existing unrelated database.

## Zero-cost operation
Do not enable billing or paid services. Verify free-tier limits, payment-method requirements, inactivity behavior, commercial-use restrictions, and quota-exhaustion behavior before connecting any hosted provider.