> **Note / 注意：** This project has been merged into **[culinAI](https://github.com/kenyeh727/culinAI)** — please go there for the latest version. 本專案已合併至 **culinAI**，請前往新 repo 查看最新版本。

---


<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍳 CulinAI - Smart Chef Assistant

> AI-powered recipe generator that transforms your ingredients into culinary masterpieces using Google Gemini

[![Deploy to GitHub Pages](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml/badge.svg)](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](https://kenyeh727.github.io/Culin-make-your-food-become-masterpieces/) | [📖 中文說明](#中文說明)

---

## ✨ Features

- 🤖 **AI-Powered Recipe Generation** - Personalized recipes using Google Gemini AI
- 🌍 **Multi-Language Support** - English, Traditional Chinese, Simplified Chinese, and Korean
- 🎨 **AI Image Generation** - Visualize your dishes before cooking with Imagen
- 💬 **Chef Chatbot** - Ask cooking questions and get expert advice in real-time
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔐 **Google Sign-In** - Secure authentication with your Gmail account
- 📜 **Recipe History** - Save and revisit your favorite recipes
- 🎯 **Smart Preferences** - Customize by cuisine, difficulty, dietary restrictions, and more

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces.git
   cd Culin-make-your-food-become-masterpieces
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Open `.env` and add your Google Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (Vite Default)

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This will:
- Run TypeScript type checking
- Build optimized production bundle in `dist/` folder using **Vite**

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

The project is configured for **automated deployment** to GitHub Pages via GitHub Actions.

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **GitHub Actions** will automatically:
   - Install dependencies
   - Build the project
   - Deploy the `dist` folder to the `gh-pages` branch

3. **Verify Deployment**:
   - Go to `Settings` → `Pages` in your repository
   - Ensure "Build and deployment" source is set to **GitHub Actions** (or "Deploy from a branch" -> `gh-pages` / `root` depending on if you want the Action to handle it all or just push artifacts. *Note: The provided workflow uses `upload-pages-artifact`, so ensure Source is set to **GitHub Actions** in the repository settings.*)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **AI Integration**: Google Gemini API (@google/genai)
- **Deployment**: GitHub Pages + GitHub Actions
- **Authentication**: Google OAuth

## 📁 Project Structure

```
Culin-make-your-food-become-masterpieces/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── components/                 # React components
├── services/                   # API services
├── public/                     # Static assets
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
├── index.css                   # Tailwind directives & global styles
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Project dependencies
```

## 🌐 Multi-Language Support

CulinAI supports 4 languages:
- 🇺🇸 English (EN)
- 🇹🇼 Traditional Chinese (繁體)
- 🇨🇳 Simplified Chinese (简体)
- 🇰🇷 Korean (한국어)

## 📝 License

This project is licensed under the MIT License.

---

## 中文說明

*(Identical Chinese content omitted for brevity, assumed unchanged)*
