# 🚀 iBuiltThis

**iBuiltThis** is a community-driven platform where creators, builders, and innovators showcase their latest projects and discover what’s launching next. From AI tools to SaaS products, it’s the home for authentic launches and genuine feedback.

---

## ✨ Features

### 🛠️ The Tech Stack

Built with the cutting-edge **Next.js 16** and **React 19** ecosystem for maximum performance and a type-safe developer experience:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org) using **Dynamic IO** for intelligent request handling.
- **Auth:** [Clerk](https://clerk.com) (Passkeys, GitHub, Google) for secure, frictionless onboarding.
- **Database:** [NeonDB](https://neon.tech) serverless PostgreSQL for scalable, edge-ready storage.
- **ORM:** [Drizzle ORM](https://orm.drizzle.team) for full type-safety from the schema to the UI.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com) for a high-performance, accessible interface.
- **Validation:** [Zod](https://zod.dev) for strict schema enforcement on the client and server.

### 💫 Application Highlights

- **Optimized Discovery:** Tag-based categorization, "Featured" showcases, and "Recently Launched" feeds.
- **Creator Workflow:** Streamlined submission process with Zod-validated forms and instant feedback.
- **Real-time Engagement:** Community voting system (Upvote/Downvote) featuring **Optimistic UI** updates for zero-latency interactions.
- **Admin Governance:** Integrated moderation panel to review, approve, or manage product submissions.
- **Hybrid Caching:** Leverages Next.js 16 `"use cache"` to serve static content instantly while streaming dynamic user data via **React Suspense**.

---

## 🚦 Getting Started

### Prerequisites

- A **Clerk** account for Authentication.
- A **Neon.tech** project for your PostgreSQL database.
- Node.js 20+ installed.

### 1. Installation

```bash
git clone [https://github.com/your-username/iBuiltThis.git](https://github.com/your-username/iBuiltThis.git)
cd iBuiltThis
npm install
```
