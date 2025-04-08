# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Test: `npm run test` (runs all tests with Vitest)
- Test single file: `npm run test -- path/to/file.test.ts`
- E2E tests: `npm run test:e2e`
- Full validation: `npm run validate`
- Typecheck: `npm run typecheck`

## Code Style Guidelines
- Summit Line Validation follows Prettier config from @epic-web/config/prettier
- Follow ESLint rules from @epic-web/config
- Use TypeScript with strict typing
- Use shadcn/ui component patterns for UI components
- Prefer named exports/imports over default exports
- Follow React 19 best practices
- Avoid useEffect when possible per .cursor/rules (prefer ref callbacks, event handlers, CSS)
- Handle errors with consistent error messages via getErrorMessage utility
- Use Tailwind CSS for styling following project conventions
- Use Zod for validation