# SafeCompress PWA update

इस पैकेज में `index.html`, `manifest.json`, `sw.js`, ऐप आइकन और मौजूदा favicon शामिल हैं।

## GitHub पर लगाना
1. Repository के root (जहाँ अभी `index.html` है) में जाएँ।
2. `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `favicon.png` अपलोड करें। `index.html` को नई वाली फाइल से replace करें।
3. Commit changes करें और Cloudflare Pages deployment पूरा होने दें।
4. वेबसाइट खोलकर hard refresh करें। DevTools → Application में Manifest और Service Worker जाँचें।

## ऑफलाइन सीमा
Service Worker ऐप shell को cache करता है। PDF.js और pdf-lib अभी CDN से लोड होते हैं; Service Worker उन्हें ऑनलाइन सफल fetch होने के बाद cache करने की कोशिश करता है। इसलिए पहली बार बिना इंटरनेट के सभी PDF tools चलने की गारंटी नहीं है। पूर्ण विश्वसनीय offline support के लिए CDN libraries को repository में स्थानीय files के रूप में शामिल करना और script paths बदलना बाकी है।

## सावधानी
यह अपडेट मौजूदा टूल का कोड हटाने के बजाय रखा गया है। फिर भी production से पहले PDF/photo workflows को मोबाइल और PC पर जाँचें। यह वेबसाइट अभी USB ProxKey DSC signing प्रदान नहीं करती।
