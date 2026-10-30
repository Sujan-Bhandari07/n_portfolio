# Sujan Bhandari — Developer Portfolio

A premium, interactive 3D developer portfolio showcasing my projects, technical expertise, and passion for software engineering, AI, and creative development.

Built with modern frontend technologies, immersive 3D experiences, and scroll-driven animations.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **3D:** Three.js, React Three Fiber
- **Animation:** GSAP, ScrollTrigger
- **Smooth Scrolling:** Lenis
- **Icons:** Lucide React
- **Email:** EmailJS

## Features

- Interactive 3D hero experience.
- Animated developer workspace.
- GSAP-powered scroll animations.
- Pinned, animated technology showcase.
- Interactive project presentations.
- Responsive design for desktop, tablet, and mobile.
- Direct email contact form using EmailJS.
- GitHub and LinkedIn integration.
- SEO and accessibility considerations.
- Optimized 3D assets and animations.

## Projects Showcased

| Project | Description |
|---|---|
| Ujyalo AI | AI-powered learning management system |
| Gothalo AI | Multi-agent AI productivity platform |
| BuffaloIDE | AI-powered development environment |
| Nepdaa | Real-time social media platform |
| Forever | Full-stack e-commerce application |
| Zentry | Animated gaming website |
| Mojito | Interactive beverage landing page |

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Configuration

Update `src/data.ts` with your personal information and project links.

Configure the following environment variables:

- `VITE_GITHUB_PROFILE`
- `VITE_LINKIN_PROFILE`
- `VITE_EMAIL`

Add actual repository URLs for projects where available. Projects without a repository URL will link to the GitHub profile.

## EmailJS Configuration

The contact form uses EmailJS to send emails directly from the frontend without requiring a custom backend.

### 1. Create an EmailJS account

Visit [EmailJS](https://www.emailjs.com/) and create an account.

### 2. Configure an email service

Add an email service, such as Gmail, and copy your Service ID.

### 3. Create an email template

Create a template using these variables:

- `{{from_name}}`
- `{{reply_to}}`
- `{{subject}}`
- `{{message}}`

Copy the Template ID.

### 4. Configure API keys

Go to your EmailJS account API keys and copy your Public Key.

Create your local environment file:

```bash
cp .env.example .env
```

Add the following:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Never expose your EmailJS private key in frontend code.

### 5. Configure security

In EmailJS:
- Restrict allowed domains to your portfolio domain.
- Enable available spam protection.
- Configure rate limits where available.

The contact form also includes a honeypot field to help prevent spam.

If the EmailJS configuration is missing, the form displays a clear configuration message.

## Deployment

This project can be deployed using:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

Add the required environment variables to your hosting provider before deploying.

## Author

**Sujan Bhandari**

BCA Student | Software Developer | AI Enthusiast

Based in Nepal.

- GitHub: [Sujan-Bhandari07](https://github.com/Sujan-Bhandari07)
- LinkedIn: Add your LinkedIn profile URL.

---

Built with React, Three.js, GSAP, and a passion for creative engineering.