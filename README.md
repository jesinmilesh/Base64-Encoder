# Base64 Encoder & Decoder

A clean, responsive web application built with HTML5, CSS3, and JavaScript for encoding plain text into Base64 format and decoding Base64 strings back into readable text.

---

## 🎨 UI & Design Layout

- **Layout**: Split Panel Layout (Side-by-Side)
- **Background**: Light Gray (`#F5F5F5`)
- **Input Panel**: White (`#FFFFFF`)
- **Output Panel**: Light Green (`#F0FFF4`)
- **Buttons**: Green (`#16A34A`) positioned in a horizontal row below the panels (`[ Encode ] [ Decode ] [ Copy Output ] [ Clear ]`).
- **Modal Dialog**: Center popup modal displaying copy status (`Copied output to clipboard!` / `No output text to copy!`).

---

## ⚡ Features

- **Encode**: Converts text into Base64 string format.
- **Decode**: Converts valid Base64 back to plain text.
- **Error Detection**: Displays error message (`Invalid Base64 String`) if decoding fails.
- **Copy Output**: Copies output to clipboard and triggers a center dialog modal.
- **Clear**: Clears input, output, and resets error messages.

---

## 📁 File Structure

```
Base64-Encoder/
├── index.html
├── style.css
└── script.js
```
