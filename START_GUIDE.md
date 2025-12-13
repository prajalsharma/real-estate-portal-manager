# 🚀 Project Setup & Deployment Guide

This guide will help you start the Real Estate Portal Manager project and deploy it to Sanity.

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **bun** (package manager)
- **Sanity account** (you mentioned you have access)

## 🔧 Step 1: Install Dependencies

### Main Project Dependencies

```bash
npm install
```

### Sanity Studio Dependencies

The Sanity configuration is in the `spasic` folder. Install its dependencies:

```bash
cd spasic
npm install
cd ..
```

## 🔐 Step 2: Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
# Create .env.local file
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=8dj9jthx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token-here

# Optional: If you need other environment variables
# Add them here
```

**Note:** 
- The project ID `8dj9jthx` is already configured in the code, but it's best practice to use environment variables
- Get your `SANITY_API_TOKEN` from [sanity.io/manage](https://sanity.io/manage) → Your Project → API → Tokens
- Create a token with **Editor** permissions for write operations

## 🏃 Step 3: Start Development Servers

You need to run **two servers** simultaneously:

### Option A: Two Separate Terminals

**Terminal 1 - Next.js Application:**
```bash
npm run dev
```
This starts the Next.js app at [http://localhost:3000](http://localhost:3000)

**Terminal 2 - Sanity Studio:**
```bash
cd spasic
npm run dev
```
This starts the Sanity Studio at [http://localhost:3333](http://localhost:3333)

### Option B: Using the Root Scripts

The root `package.json` has scripts configured, but they reference a `sanity` folder that doesn't exist. You can use:

```bash
# Terminal 1
npm run dev

# Terminal 2
cd spasic && npm run dev
```

## 🌐 Step 4: Access Your Application

- **Next.js App**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3333](http://localhost:3333) or [http://localhost:3000/studio](http://localhost:3000/studio)

The Sanity Studio is also integrated into your Next.js app at the `/studio` route.

## 🚀 Step 5: Deploy to Sanity

### Deploy Sanity Studio

To deploy your Sanity Studio to Sanity's hosting:

```bash
cd spasic
npm run build
npm run deploy
```

This will:
1. Build the Sanity Studio
2. Deploy it to `https://your-project-id.sanity.studio`

**First-time deployment:**
- You'll be prompted to authenticate with Sanity
- Follow the prompts to log in and authorize the deployment
- The Studio will be available at a URL like: `https://real-estate-portal-8dj9jthx.sanity.studio`

### Verify Deployment

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. You should see your deployed Studio URL
4. Access it and verify your schemas are working

## 📝 Step 6: Initial Content Setup

After deploying, set up your initial content in this order:

1. **Agents** - Create agent profiles first (properties reference agents)
2. **Locations** - Add location data for better organization
3. **Categories** - Set up blog categories
4. **Properties** - Add properties with proper agent references
5. **Blog Posts** - Create blog content

## 🔍 Troubleshooting

### Issue: "Project not found"
- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Check that the project ID matches in `sanity.config.ts` and `spasic/sanity.config.ts`

### Issue: "Unauthorized" errors
- Verify your `SANITY_API_TOKEN` is correct
- Ensure the token has the right permissions (Editor for write operations)
- Check token hasn't expired

### Issue: CORS errors
- Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → API → CORS origins
- Add your localhost and production domains:
  - `http://localhost:3000`
  - `http://localhost:3333`
  - Your production domain (e.g., `https://yourdomain.com`)

### Issue: Dependencies not installing
- Make sure you're using Node.js v18+
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- For the `spasic` folder, do the same: `cd spasic && rm -rf node_modules package-lock.json && npm install`

### Issue: Sanity Studio not starting
- Make sure you're in the `spasic` directory when running `npm run dev`
- Check that all dependencies in `spasic/package.json` are installed
- Verify the `spasic/sanity.config.ts` file is correctly configured

## 📚 Additional Commands

### Build for Production
```bash
# Build Next.js app
npm run build

# Build Sanity Studio
cd spasic
npm run build
```

### Start Production Server
```bash
npm run start
```

### Lint Code
```bash
npm run lint
```

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Install main deps | `npm install` |
| Install Sanity deps | `cd spasic && npm install` |
| Start Next.js dev | `npm run dev` |
| Start Sanity Studio | `cd spasic && npm run dev` |
| Deploy Sanity Studio | `cd spasic && npm run build && npm run deploy` |
| Build Next.js | `npm run build` |

## 🔗 Useful Links

- **Sanity Dashboard**: [sanity.io/manage](https://sanity.io/manage)
- **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**You're all set!** Start by running the development servers and accessing the Sanity Studio to begin adding content.

