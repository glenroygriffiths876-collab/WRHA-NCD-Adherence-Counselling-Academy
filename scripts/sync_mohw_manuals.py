#!/usr/bin/env python3
"""Sync publicly downloadable Ministry of Health & Wellness NCD PDFs.

This is a build-time importer, not an open HTTP proxy. It validates PDF magic and
renders the *actual first page* as a cover preview. Never syncs internal WRHA
facilitator or participant materials into this public repository.

Run from repository root with Python 3 and dependencies requests/PyMuPDF.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import random
import time
from urllib.parse import urlparse, urlencode, urlunparse, parse_qsl

import fitz
import requests

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "documents" / "pdf-library"
COVER_DIR = ROOT / "media" / "pdf-covers"
MANIFEST = ROOT / "manual-assets.js"
MAX_SIZE = 35 * 1024 * 1024
TIMEOUT = (20, 100)

# IDs must match guideline-library.js. Only public Ministry download endpoints.
PUBLIC_MOHW_DOCUMENTS = {
    "htn2024": 4262,
    "dm2024": 4259,
    "screen2024": 4283,
    "asthma2025": 4291,
    "screenpocket": 4288,
    "asthmaaction": 4279,
    "exercise2025": 4297,
    "nutrition2019": 2374,
    "physicalbible": 2367,
    "eatingwork": 2376,
    "htnpoints": 2689,
    "nicotineold": 4248,
}

def download_pdf(doc_id: str, source_id: int) -> bytes:
    base = f"https://ncdip.moh.gov.jm/download/{source_id}/"
    sess = requests.Session()
    sess.headers.update({
        "User-Agent": "Mozilla/5.0 (compatible; WRHA-NCD-Document-Archive/1.0; public educational use)",
        "Accept": "application/pdf,application/octet-stream;q=0.9,*/*;q=0.7",
        "Referer": "https://ncdip.moh.gov.jm/resources/",
    })
    last_error = "No response"
    for attempt in range(4):
        try:
            url = base + "?tmstv=" + str(int(time.time()) + attempt)
            with sess.get(url, timeout=TIMEOUT, stream=True, allow_redirects=True) as resp:
                resp.raise_for_status()
                host = (urlparse(resp.url).hostname or "").lower()
                if not (host == "moh.gov.jm" or host.endswith(".moh.gov.jm")):
                    raise ValueError(f"Unexpected final host {host}")
                chunks, count = [], 0
                for block in resp.iter_content(chunk_size=128 * 1024):
                    if not block:
                        continue
                    count += len(block)
                    if count > MAX_SIZE:
                        raise ValueError(f"PDF over {MAX_SIZE // (1024 * 1024)} MB limit")
                    chunks.append(block)
                data = b"".join(chunks)
                if not data.startswith(b"%PDF-"):
                    raise ValueError(f"Response was not a PDF (first bytes: {data[:24]!r})")
                return data
        except (requests.RequestException, ValueError) as exc:
            last_error = str(exc)
            print(f"  {doc_id}: attempt {attempt+1} failed: {last_error}", flush=True)
            if attempt < 3:
                time.sleep(min(12, (attempt+1) * 3 + random.random()))
    raise RuntimeError(last_error)

def render_cover(pdf_bytes: bytes, path: Path) -> int:
    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        if len(doc) < 1:
            raise ValueError("No PDF pages")
        page = doc.load_page(0)
        # Authentic PDF first page, not AI-generated art; preserve aspect.
        scale = min(1.6, 660 / max(1, page.rect.width))
        pix = page.get_pixmap(matrix=fitz.Matrix(scale,scale), alpha=False)
        from PIL import Image
        import io
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        path.parent.mkdir(parents=True, exist_ok=True)
        img.save(path, format="WEBP", quality=86, method=6)
        return len(doc)

def main() -> None:
    PDF_DIR.mkdir(parents=True,exist_ok=True)
    COVER_DIR.mkdir(parents=True,exist_ok=True)
    synced = {}
    failed = []
    for doc_id, source_id in PUBLIC_MOHW_DOCUMENTS.items():
        pdf_path = PDF_DIR / (doc_id + ".pdf")
        cover_path = COVER_DIR / (doc_id + ".webp")
        print(f"Syncing {doc_id} from MOHW #{source_id}",flush=True)
        try:
            if pdf_path.exists() and cover_path.exists():
                data = pdf_path.read_bytes()
                if not data.startswith(b"%PDF-"):
                    raise ValueError("Existing file is not a PDF")
                with fitz.open(stream=data,filetype="pdf") as pdf:
                    pages = len(pdf)
            else:
                data = download_pdf(doc_id, source_id)
                pages = render_cover(data, cover_path)
                pdf_path.write_bytes(data)
            synced[doc_id] = {
                "pdf": pdf_path.relative_to(ROOT).as_posix(),
                "cover": cover_path.relative_to(ROOT).as_posix(),
                "pages": pages,
                "source": f"https://ncdip.moh.gov.jm/download/{source_id}/",
            }
            print(f"  OK: {pages} pages; {len(data):,} bytes",flush=True)
        except Exception as exc:
            failed.append((doc_id,str(exc)))
            print(f"  FAILED {doc_id}: {exc}",flush=True)
    if synced:
        MANIFEST.write_text(
            "// Imported public MOHW documents. No internal WRHA materials.\n"
            + "window.WRHA_LOCAL_MANUALS = "
            + json.dumps(synced,indent=2,sort_keys=True)
            + ";\n",encoding="utf-8")
    print(f"Success: {len(synced)} / {len(PUBLIC_MOHW_DOCUMENTS)}; failures: {failed}")
    if failed:
        (ROOT/"manual-import-report.txt").write_text(
            "\n".join(f"{x}: {reason}" for x,reason in failed),encoding="utf-8")
    if not synced:
        raise RuntimeError("No PDFs imported; keep official source links and fallbacks available.")

if __name__ == "__main__":
    main()
