# Product specification

**Working name:** Learning Studio (temporary)  
**Initial audience:** College students  
**Initial subject area:** Programming and technology

## Product principle
Adapt instruction to evidence of a learner's current understanding. Do not assign permanent learning-style labels or assume one modality defines a student.

> You haven't understood it yet. That's okay. Let's try another way.

## Approved decisions
- Public access to course content; accounts required to save progress across devices.
- Student and teacher roles from the beginning.
- Platform-curated lessons first; student and teacher contributions later.
- Guided, self-paced, and adaptive modes can be switched without losing lesson progress.
- AI teacher available throughout lessons once a genuinely free, reliable provider is verified.
- The learning experience must continue when AI is unavailable.

## Learning experience
1. Introduce one concept in plain language.
2. Provide alternate explanations, analogies, and worked examples.
3. Ask the learner to retrieve or apply the concept.
4. Explain the reasoning gap rather than returning only pass/fail.
5. Offer hints and alternate explanations when needed.
6. Track independent work separately from supported answers.
7. Recommend practice based on evidence, not fixed learner labels.

## Mastery evidence
Track concept-level performance, independent correct answers, mistakes, retries, hint usage, performance on unfamiliar problems, and delayed retention. A correct answer after a full solution is not equivalent to independent mastery.

## Content and AI quality
Initial content is platform-reviewed. AI-generated content is not trusted automatically. The AI service must be provider-independent, server-only, quota-protected, and optional. Never expose provider keys in client code. Never promise unlimited free AI.

## Initial release boundaries
- No public user-generated lesson publishing in the first release.
- No unsandboxed arbitrary code execution.
- No client-side writes to authoritative mastery records or answer keys.
- No fabricated AI responses or fake authentication.
- Offline/local prototype behavior must be clearly distinguished from account-backed sync.

## Success measures
Pre/post improvement, concept mastery, independent unfamiliar problem solving, delayed retention, recurring misconceptions, accessibility, and learner satisfaction.