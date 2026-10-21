# SafeCompress — starter project

A privacy-first, bilingual (English/Hindi) PDF and photo tools prototype. It is a static website: no backend, no database, no file-upload endpoint, no accounts, no analytics.

## Run on Windows for free

1. Extract this ZIP to a folder such as `C:\SafeCompress`.
2. Open `index.html` in Chrome or Edge.
3. Choose a tool and select test files. For best results, keep the internet connection enabled because this prototype loads PDF libraries from public CDNs.

For a local web server (optional), open PowerShell in this folder and run:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000`.

## Implemented in this prototype

- Bilingual interface (Hindi/English)
- Photo compression, resize, format conversion, center crop and basic black-and-white scan
- Multiple images to PDF
- Merge PDFs
- Split/extract selected PDF pages
- Delete selected PDF pages
- Rotate PDF pages
- Add page numbers, watermark text, or text notes
- PDF pages to PNG images

## Important limitations

- This is a starter prototype, not a fully audited production website.
- PDF compression here rasterizes pages into JPEG images. This can remove selectable/searchable text, links, forms, accessibility information and vector sharpness. It may not always produce a smaller file. Always compare output before relying on it.
- PDF-to-image downloads one PNG per page.
- Password-protect/encrypt PDF, OCR, true PDF text editing, drag-reorder UI, advanced scan cleanup, signatures with certificate verification, and batch ZIP downloads are not implemented yet.
- Some operations may not preserve every PDF feature. Test with copies of non-sensitive files.
- PDF libraries are loaded from CDNs, which means library code is downloaded when the page opens. The selected document data is processed locally by the browser code; still inspect network traffic before making privacy claims. For stronger assurance, download and self-host audited library files and add a restrictive Content Security Policy.
- No website can guarantee legal or security risk is zero. Do not use for sensitive documents until independently reviewed and tested.

## Privacy promise — use only after verification

Suggested wording:
"Your selected files are processed in your browser. SafeCompress does not upload your file contents to a SafeCompress server."

Avoid claiming that all data is deleted from servers if files are never uploaded. Do not claim "100% secure" or "zero risk".

## Next development steps

1. Test all tools with sample PDFs and images.
2. Add local/self-hosted library files and network inspection.
3. Improve error handling, file size limits, progress display and accessibility.
4. Add drag-and-drop page reordering and preview.
5. Implement password encryption using a vetted local library, then test thoroughly.
6. Add OCR and advanced scan tools as separate modules.
7. Perform privacy/security review before publishing.
8. Check domain availability and platform requirements before deployment.
