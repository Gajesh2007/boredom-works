# Gaj's Boredom Works

A cyberpunk-themed blog for sharing learning notes and ideas created during moments of boredom.

![Terminal Style](https://img.shields.io/badge/Style-Cyberpunk%20Terminal-50fa7b)
![Built with](https://img.shields.io/badge/Built%20with-Next.js-black)
![Status](https://img.shields.io/badge/Status-Active-bd93f9)

## Overview

This project is a personal blog with a unique terminal/cyberpunk aesthetic, designed to host notes, ideas, and explorations that emerge during moments of boredom. The design features a terminal interface with dynamic elements like "decrypting" text, simulated connection statuses, and glitch effects.

## Features

- 🖥️ Terminal-style cyberpunk UI with animated elements
- 🔐 Dynamic "decryption" animations for content
- 📚 Reading time estimates
- 🧭 Table of contents for navigation
- 🔄 Post navigation (previous/next)
- 🏷️ Tag display system
- 📱 Responsive design for all devices
- 🔗 Social sharing capabilities

## Tech Stack

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Content**: Markdown files
- **Animation**: Custom CSS and JavaScript

## Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/boredom-works.git
   cd boredom-works
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run development server
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Commands

- Build: `npm run build` 
- Dev: `npm run dev`
- Lint: `npm run lint`
- Test: `npm test`

## Project Structure

```
boredom-works/
├── content/             # Markdown content for posts
│   └── posts/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router components
│   │   ├── posts/
│   │   └── globals.css  # Global styles
│   └── lib/             # Utilities and libraries
└── ...configuration files
```

## Content Management

Posts are written in Markdown format and stored in the `content/posts` directory. Each post requires the following frontmatter:

```md
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---

# Post content starts here
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspiration from cyberpunk aesthetics and terminal UIs
- Built using the Next.js framework