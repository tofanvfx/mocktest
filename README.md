# MockTest CBT - Government Exam & PDF Question Simulator

A high-fidelity Computer Based Test (CBT) portal modeled after the official **TCS iON** interface used in Indian government examinations (**SSC CGL/CHSL**, **Railway RRB NTPC/Group D**, **Banking IBPS/SBI**).

Includes an **Admin & Question Creator Dashboard** that allows uploading question papers directly from **PDF files** or pasting text to automatically extract questions and options.

---

## 🚀 Key Features

### 1. Official Government Exam (TCS iON) Simulator
- **5-State Question Palette:**
  - ⚪ White: Not Visited
  - 🔴 Red: Not Answered
  - 🟢 Green: Answered
  - 🟣 Violet: Marked for Review
  - 🟣🟢 Violet + Green indicator: Answered & Marked for Review (*Evaluated for marks*)
- **Reverse Countdown Timer:** Configurable exam duration with low-time warning.
- **Bilingual Support:** Instant on-the-fly toggle between English and Hindi per question.
- **Font Resizing:** `A-`, `A`, and `A+` controls matching official exam terminals.
- **Sectional Navigation:** Switch across Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension.
- **Summary Modal:** Displays sectional attempt counts before final submission.
- **Comprehensive Scorecard & Solution Analysis:**
  - Raw score calculation with positive (+2.00) and negative (-0.50) marking.
  - Accuracy %, Attempt Rate, and Time Spent.
  - Full Question-by-Question review with step-by-step explanations in both English & Hindi.

### 2. PDF & Question Creator Dashboard
- **PDF File Upload & Auto-Extractor:** Reads `.pdf` question papers directly in the browser and automatically parses:
  - Question numbers (`1.`, `Q1.`, `Q. 1`)
  - 4 Options (`(A), (B), (C), (D)` or `A), B), C), D)`)
  - Answer keys (`Answer: B`, `Ans: C`)
  - Explanations and solutions (`Exp: ...`, `Sol: ...`)
- **Bulk Text Importer:** Paste copied text from PDFs/documents with instant smart parsing.
- **Manual Form:** Add or customize questions one by one.
- **Interactive Question Bank:** One-click correct answer selector pills, section filter, search, and JSON export/import.
- **One-Click Launch:** Run your custom uploaded test directly inside the CBT exam simulator.

---

## 🛠️ Tech Stack
- **Frontend:** React 19, Vite 6, Tailwind CSS v4
- **PDF Processing:** `pdfjs-dist`
- **Icons:** Lucide React

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
