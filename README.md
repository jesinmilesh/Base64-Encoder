# Base64 Encoder & Decoder

A responsive web application built with **HTML5**, **CSS3**, and **JavaScript** for encoding plain text into Base64 format and decoding Base64 strings back into readable text. Designed with a clean split-panel interface, Unicode (UTF-8) character support, instant validation, and interactive feedback.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [What is Base64?](#-what-is-base64)
  - [How It Works](#how-it-works)
  - [The 64-Character Alphabet](#the-64-character-alphabet)
  - [Padding Mechanism](#padding-mechanism)
  - [Common Use Cases](#common-use-cases)
- [Key Features](#-key-features)
- [UI & Design System](#-ui--design-system)
  - [Color Palette](#color-palette)
  - [Layout & Responsiveness](#layout--responsiveness)
- [Technical Architecture](#-technical-architecture)
  - [UTF-8 Safe Encoding Pipeline](#1-utf-8-safe-encoding-pipeline)
  - [UTF-8 Safe Decoding Pipeline](#2-utf-8-safe-decoding-pipeline)
  - [Input Validation & Sanitization](#3-input-validation--sanitization)
  - [Clipboard & Modal Integration](#4-clipboard--modal-integration)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Project](#running-the-project)
- [Step-by-Step Usage Guide](#-step-by-step-usage-guide)
- [Examples](#-examples)
- [Security Considerations](#-security-considerations)
- [Browser Compatibility](#-browser-compatibility)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 📖 Overview

In modern computing, data often needs to be transmitted across channels or protocols designed strictly for ASCII text (such as HTTP headers, email via SMTP/MIME, or URLs). When binary data or arbitrary Unicode strings travel across these mediums, characters can get corrupted or misinterpreted by intermediate systems.

**Base64 Encoder & Decoder** provides a lightweight, client-side utility to:
1. Rapidly convert arbitrary text (including multi-byte UTF-8 symbols and emojis) into standard, safe Base64 ASCII strings.
2. Decode existing Base64 strings back to their original human-readable text.
3. Validate format integrity with real-time error notifications.
4. Copy results to the system clipboard with an intuitive modal dialog.

The entire application runs **100% client-side** in the browser—no data is sent to external servers or third-party APIs, ensuring complete data privacy and zero latency.

---

## 🔬 What is Base64?

**Base64** is a binary-to-text encoding scheme defined in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648). It represents binary data using an alphabet of 64 printable ASCII characters.

### How It Works

1. **Bit Grouping**: Base64 takes 3 bytes of binary data (3 × 8 = **24 bits**).
2. **Chunk Division**: The 24 bits are divided into 4 groups of **6 bits** each ($2^6 = 64$ possible values per chunk).
3. **Lookup**: Each 6-bit integer (ranging from 0 to 63) maps directly to a character in the standard Base64 alphabet table.
4. **Data Overhead**: Because 3 bytes become 4 characters, Base64 increases the data size by approximately **33%** (ratio of 4:3).

### The 64-Character Alphabet

| Index Range | Characters | Description |
|:---:|:---:|:---|
| `0 - 25` | `A - Z` | Uppercase Latin Alphabet |
| `26 - 51` | `a - z` | Lowercase Latin Alphabet |
| `52 - 61` | `0 - 9` | Arabic Numerals |
| `62` | `+` | Plus symbol |
| `63` | `/` | Slash symbol |
| *(Pad)* | `=` | Padding symbol (indicates missing bytes at end) |

### Padding Mechanism

Because data length may not always be a multiple of 3 bytes, padding characters (`=`) are appended to align the stream:
- **1 remaining byte (8 bits)**: Formed into two 6-bit chunks; padded with `==`.
- **2 remaining bytes (16 bits)**: Formed into three 6-bit chunks; padded with `=`.
- **3 remaining bytes (24 bits)**: Perfect multiple; no padding required.

### Common Use Cases

- **Data URIs**: Embedding images, icons, or audio directly in HTML/CSS without separate network round-trips (`data:image/png;base64,...`).
- **Web Tokens (JWT)**: Serializing headers and payloads in JSON Web Tokens.
- **HTTP Basic Authentication**: Encoding `username:password` pairs in `Authorization` headers.
- **Email Transfer**: Transmitting binary file attachments via SMTP through MIME encoding.
- **Security & Cryptography**: Representing cryptographic keys, hashes, certificates (e.g., PEM files), and digital signatures in text format.

---

## ⚡ Key Features

- 🔄 **Bidirectional Transformation**: Seamlessly switch between text encoding and Base64 decoding.
- 🌐 **Full UTF-8 / Unicode Support**: Native JavaScript `btoa()` and `atob()` functions fail on characters outside the Latin-1 range (`0x00 - 0xFF`). This application implements an encoding pipeline that handles international languages, special symbols, and emojis (e.g., `🔐`, `ü`, `ñ`, `こんにちは`).
- 🛡️ **Strict Format Validation**: Decoding input is validated using a regex compliance check before processing, preventing parsing crashes and identifying corrupted strings.
- 📋 **Integrated Clipboard Support**: One-click button copies output directly to the operating system's clipboard using the modern `navigator.clipboard` API with an interactive confirmation modal.
- ⚠️ **Dynamic Error Banner**: Invalid Base64 strings trigger an animated error notification that automatically clears upon new valid inputs.
- 🧹 **Instant Reset**: Clear button immediately resets input, output, and validation states for a clean workflow.
- 📱 **Mobile & Desktop Responsive**: Fluid flexbox/grid layout that adapts from side-by-side desktop view to stacked mobile view.
- 🔒 **Zero Server Dependency**: Operates entirely in the browser sandbox—no cookies, tracking, or network calls.

---

## 🎨 UI & Design System

The application employs a split-panel productivity layout designed for clarity, contrast, and ease of use.

### Color Palette

| Element | Color | Hex Code | Purpose |
|:---|:---|:---:|:---|
| Page Background | Soft Light Gray | `#F5F5F5` | Reduces eye strain and offers high contrast |
| Input Panel | Pure White | `#FFFFFF` | Clear, editable workspace indicator |
| Output Panel | Subtle Mint Tint | `#F0FFF4` | Visually distinguishes generated results from input |
| Primary Accent / Buttons | Emerald Green | `#16A34A` | Primary interactive call-to-actions |
| Button Hover State | Forest Green | `#15803D` | Interactive hover depth |
| Error Notification | Coral Red | `#EF4444` | High-visibility warning alert for invalid inputs |
| Modal Backdrop | Semi-transparent Black | `rgba(0, 0, 0, 0.45)` | Focuses attention on alert dialogs |

### Layout & Responsiveness

- **Header**: Centered typography with clean sans-serif font stack.
- **Split Panels**: Two synchronized text areas placed side-by-side on screens $> 768\text{px}$, transitioning to a vertical column on smaller devices.
- **Action Toolbar**: Centered horizontal row of elevated buttons (`Encode`, `Decode`, `Copy Output`, `Clear`).
- **Interactive Modal**: Center-aligned dialog with emoji visual cue and confirmation dismissal via:
  - Clicking the **OK** button
  - Pressing the **Escape** key
  - Clicking the **Backdrop overlay**

---

## 🛠️ Technical Architecture

### 1. UTF-8 Safe Encoding Pipeline

Standard `window.btoa()` throws a `DOMException` (`Character Out of Range`) when encountering Unicode characters beyond `U+00FF`. To resolve this, input text undergoes a URI component percent-encoding step to produce raw byte sequences:

```javascript
// Step 1: encodeURIComponent converts UTF-8 strings into percent-encoded hex sequences (%E2%9C%93)
// Step 2: Regex replaces each %XX with String.fromCharCode(0xXX) to form binary string
// Step 3: btoa converts the clean binary string to Base64
const encoded = btoa(
  encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  })
);
```

### 2. UTF-8 Safe Decoding Pipeline

The reverse pipeline decodes Base64 binary characters and reconstitutes multi-byte Unicode code points:

```javascript
// Step 1: atob extracts 8-bit binary characters
// Step 2: Array mapping converts character codes to percent-encoded hex bytes
// Step 3: decodeURIComponent reassembles the original UTF-8 characters
const sanitized = input.replace(/\s+/g, '');
const decoded = decodeURIComponent(
  Array.prototype.map.call(atob(sanitized), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')
);
```

### 3. Input Validation & Sanitization

Before attempting to decode, the input is sanitized of whitespace (including newlines and tabs often introduced when copying multiline blocks) and verified against RFC 4648 regex:

```javascript
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
```

If the string contains invalid characters, non-conforming lengths, or malformed padding, the error banner activates and output is suppressed.

### 4. Clipboard & Modal Integration

Copy operations utilize the asynchronous `navigator.clipboard.writeText()` API. If an empty output is attempted, the modal displays a contextual warning (`⚠️ No output text to copy!`) instead of a false positive copy confirmation.

---

## 📁 Project Structure

```
Base64-Encoder/
├── index.html        # Semantic HTML5 document with layout, panels, and modal
├── style.css         # Custom responsive stylesheet, transitions, and component styles
├── script.js         # Core encoding, decoding, validation, and DOM logic
└── README.md         # Detailed project documentation and specifications
```

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave, etc.).
- No external libraries, build tools, or npm installations are required.

### Running the Project

#### Option 1: Direct File Open
Simply double-click `index.html` or right-click and choose **Open With > Google Chrome / Firefox / Edge**.

#### Option 2: Local HTTP Server (Optional)
If you prefer running through a local web server:

**Using Python 3:**
```bash
# Navigate to the project directory
cd "e:/Information Security/Base64-Encoder"

# Start the server
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`

**Using Node.js (`serve` / `http-server`):**
```bash
npx serve .
```

---

## 📝 Step-by-Step Usage Guide

### Encoding to Base64
1. Type or paste your raw text into the **INPUT** panel on the left.
2. Click the **Encode** button.
3. The Base64 string will instantly appear in the **OUTPUT** panel on the right.
4. Click **Copy Output** to copy the generated string to your clipboard.

### Decoding from Base64
1. Paste a valid Base64 string into the **INPUT** panel.
2. Click the **Decode** button.
3. The decoded human-readable text will appear in the **OUTPUT** panel.
4. If the string is invalid or corrupted, an **Invalid Base64 String** banner will appear.

### Clearing Fields
- Click the **Clear** button at any time to wipe both textareas and dismiss any active error alerts.

---

## 🧪 Examples

### Example 1: Standard ASCII String
- **Input Text**: `Hello, World!`
- **Encoded Base64**: `SGVsbG8sIFdvcmxkIQ==`

### Example 2: Multi-byte Unicode & Symbols
- **Input Text**: `Information Security 🔐 & Cryptography 🛡️`
- **Encoded Base64**: `SW5mb3JtYXRpb24gU2VjdXJpdHkg8J+UqCAmIENyeXB0b2dyYXBoeSDwn5mw`

### Example 3: JSON Payload
- **Input Text**: `{"user":"admin","role":"analyst"}`
- **Encoded Base64**: `eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYW5hbHlzdCJ9`

---

## 🔒 Security Considerations

> [!IMPORTANT]
> **Base64 is an encoding mechanism, NOT encryption.**
> - Base64 provides **no confidentiality, secrecy, or cryptographic security**.
> - Anyone can trivially reverse a Base64 string back to plaintext without a key.
> - Never use Base64 alone to protect passwords, secrets, private keys, or sensitive personally identifiable information (PII).
> - In Information Security pipelines, Base64 should strictly be utilized for safe transport, serialization, and presentation of binary data.

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | Status |
|:---|:---:|:---:|
| Google Chrome | 66+ | Fully Supported |
| Mozilla Firefox | 63+ | Fully Supported |
| Apple Safari | 13.1+ | Fully Supported |
| Microsoft Edge | 79+ | Fully Supported |
| Opera | 53+ | Fully Supported |

---

## 🔮 Future Enhancements

- [ ] **File-to-Base64 Upload**: Drag-and-drop images, documents, or binaries and extract Data URI strings directly.
- [ ] **URL-Safe Base64**: Toggle switch for RFC 4648 §5 URL/filename-safe alphabet (replacing `+` and `/` with `-` and `_`).
- [ ] **Live / Instant Conversion**: Real-time encoding/decoding as the user types without pressing buttons.
- [ ] **Dark Mode Theme**: Toggleable dark theme for high-contrast viewing in low-light environments.
- [ ] **Hex & Binary Viewer**: Side-by-side view showing raw binary bits and hex equivalents.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
