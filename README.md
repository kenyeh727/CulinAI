<div align="center">
<img width="1200" height="475" alt="CulinAI Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍳 CulinAI — Smart Chef Assistant

> 把冰箱裡現有的食材，變成一道道料理傑作。告訴 CulinAI 你手邊有什麼，它幫你想菜單、給食譜、一步步帶著你做完。
>
> Turn the ingredients you already have into culinary masterpieces. Tell CulinAI what's in your kitchen, and it plans the menu, generates recipes, and guides you through every step.

[![Deploy to GitHub Pages](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml/badge.svg)](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](https://kenyeh727.github.io/Culin-make-your-food-become-masterpieces/) | [📖 中文說明](#中文說明)

---

## ✨ Features

- 🤖 **Smart Recipe Generation** — Personalized recipes built around the ingredients you actually have on hand
- 🎨 **Dish Visualization** — AI-generated images so you can preview your dish before cooking
- 💬 **Chef Chatbot** — Ask cooking questions anytime and get real-time guidance
- 🌍 **Multi-Language Support** — English, Traditional Chinese, Simplified Chinese, and Korean
- 📱 **Responsive Design** — A beautiful interface that works on phone, tablet, and desktop
- 🔐 **Secure Sign-In** — Quick and safe authentication
- 📜 **Recipe History** — Save your favorite recipes and revisit them anytime
- 🎯 **Smart Preferences** — Customize by cuisine, difficulty level, and dietary restrictions

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

   Copy the example file and add your API key:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **AI**: AI API integration for recipe generation, chat, and image creation
- **Deployment**: GitHub Pages + GitHub Actions
- **Authentication**: OAuth sign-in

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
└── package.json                # Project dependencies
```

## 🌐 Deployment

Pushes to `main` auto-deploy to GitHub Pages via GitHub Actions (install → build → deploy `dist/`). Make sure **Settings → Pages → Build and deployment** is set to **GitHub Actions**.

## 🌍 Multi-Language Support

- 🇺🇸 English (EN)
- 🇹🇼 Traditional Chinese (繁體)
- 🇨🇳 Simplified Chinese (简体)
- 🇰🇷 Korean (한국어)

## 📝 License

This project is licensed under the MIT License.

---

## 中文說明

### 🍳 CulinAI — 智慧料理小幫手

CulinAI 把你冰箱裡現有的食材變成料理傑作：輸入手邊的食材，AI 幫你想好餐點、產生食譜、一步步指導你製作，還沒下鍋就能先看到成品的樣子。

**功能特色**

- 🤖 **智慧食譜產生** — 根據你現有的食材，量身打造個人化食譜
- 🎨 **料理視覺化** — 下鍋前先預覽成品照片
- 💬 **主廚聊天機器人** — 烹飪問題隨問隨答，即時指導
- 🌍 **多國語言** — 英文、繁體中文、簡體中文、韓文
- 📱 **響應式設計** — 手機、平板、電腦都有漂亮介面
- 🔐 **安全登入** — 快速又安全的驗證機制
- 📜 **食譜紀錄** — 收藏喜歡的食譜，隨時回顧
- 🎯 **智慧偏好設定** — 依菜系、難易度、飲食限制篩選

**快速開始**：需求 Node.js v18 以上，`npm install` → 複製 `.env.example` 為 `.env` 並填入 API key → `npm run dev`。推送到 `main` 會自動部署到 GitHub Pages。

本專案採用 MIT 授權。
