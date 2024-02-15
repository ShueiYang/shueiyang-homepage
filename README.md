# Kim's Homepage

Welcome to my homepage !

<br />

Stacks use for this portfolio:

- Next.js 14 app directory
- TailwindCss
- Framer Motion
- Three.js
- Prisma
- MongoDB

Languages and tools

- TypeScript
- React hook form
- Zod schema validation
- Headless ui
- Cloudinary
- PNPM package manager

Features:

- Projects are stored in MongoDB and can be uploaded from admin panel.
- Projects can also be edited and removed from the Edit panel.
- Only admin get acces to CRUD operation.
- Authentification with JWT (Jose) using Route Handler, and session with cookie.
- Use ServerAction to create, updated, and delete projects.
- Playground with Zod validation and TypeScript
- Testing new hooks like useTransition, useFormState and useOptimistic.

Known issues:

- Exit animation shared layout with Framer Motion not working in the App router.
- as props from Link component didn't work as expected in App router.
- ~~Issue with revalidation / router.refresh didn't work as expected in the App router when deployed in Vercel.~~
