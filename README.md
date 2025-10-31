# 🎓 NINAD 2025 – City College Jayanagar

**NINAD 2025** is the official **Academic Management Fest Website** of *City College Jayanagar, Bengaluru*.  
A premium, responsive static website showcasing 50+ events across Sports, Cultural, and Academic categories.

---

## 🌟 Features

- 🧩 **Multi-page Structure:** Home, Sports, Cultural, Academics, About, Event Details & Registration pages  
- 🏆 **50+ Events:** 25 Sports, 15 Cultural, and 12 Academic events  
- 🎨 **Premium UI/UX:** Modern dark gradient theme with glass-morphism cards & smooth animations  
- 📱 **Responsive Design:** Mobile-first, compatible with all devices  
- 🌗 **Dark / Light Theme:** Toggle with persistent mode  
- 🔍 **Search & Filter:** Real-time category-based filtering  
- 📝 **Registration System:** Integrated with Google Sheets + UPI Payment  
- 🧭 **Dynamic Event Details:** URL query-based event pages  
- 💾 **Offline Support:** Local Storage fallback

---

## 📁 File Structure

NINAD-2025/
├── index.html # Home page
├── sports.html # Sports events
├── cultural.html # Cultural events
├── academics.html # Academic events
├── about.html # About & venue details
├── event-details.html # Dynamic event info
├── register.html # Registration form
├── style.css # Global styling
├── script.js # Shared JS logic
├── google-apps-script.gs # Google Sheet backend
├── assets/
│ ├── logo.png
│ ├── qr-placeholder.png
│ └── background-pattern.png
└── README.md

## 🚀 Quick Start

### 1️⃣ Basic Setup
1. Download or clone the repository  
2. Replace `assets/logo.png` with your **college logo**  
3. Open `index.html` in your browser to preview  

### 2️⃣ Customization
- Update **college info** across HTML files  
- Replace **logo & colors** in `style.css`  
- Add/modify events directly in JS arrays  

---

## 🧾 Google Sheets Integration

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)  
2. Create a new sheet → name it **NINAD 2025 Registrations**  
3. Copy the **Sheet ID** from the URL (`/d/<SHEET_ID>/edit`)

### Step 2: Setup Google Apps Script
1. Go to [script.google.com](https://script.google.com)  
2. Create a new project  
3. Delete default code & paste content from `google-apps-script.gs`  
4. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID  
5. Save and deploy  

### Step 3: Deploy Web App
- **Deploy → New Deployment**  
- Type: **Web app**  
- Execute as: *Me*  
- Access: *Anyone*  
- Copy the **Web App URL**

### Step 4: Update Form Endpoint
In `register.html`, replace:
```js
const FORM_ENDPOINT = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

💸 Payment Setup

Replace 7349010322@ybl with your actual UPI ID in register.html

Update assets/qr-placeholder.png with your QR code image

Modify payment instructions as required

🌐 Deployment (GitHub Pages)

Push all files to your GitHub repo

Go to Settings → Pages

Source: Deploy from a branch → main branch → / (root)

Your live site will be available at:
https://<username>.github.io/NINAD-2025/

🎨 Customization Guide
🎨 Colors (in style.css)
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
}

🏫 Logo

Recommended: 200×200 px PNG

Replace in /assets/logo.png

Update alt="Your College Logo" in all HTML files

📞 Contact Info

Update across all pages:

Address

Email

Phone

UPI ID

🧠 Technical Highlights

⚡ CSS Grid & Flexbox for layouts

🎚 CSS Variables for easy theming

🎥 Intersection Observer for animations

💾 Local Storage for theme & data persistence

🌐 Fetch API (ES6+)

💪 Progressive Enhancement compatible

📊 Performance Benchmarks
Metric	Target
Lighthouse Score	95+
First Contentful Paint	< 1.5 s
Largest Contentful Paint	< 2.5 s
Cumulative Layout Shift	< 0.1
