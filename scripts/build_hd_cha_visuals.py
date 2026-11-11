#!/usr/bin/env python3
"""Build sharp, retina-ready illustrations from the approved WRHA collage crops.

Progressive enhancement: if the pretrained FSRCNN model cannot be loaded,
high-quality Pillow resampling still produces consistent assets. The script
does not modify source images, clinical content, or official WRHA branding.
"""
from __future__ import annotations
from pathlib import Path
import hashlib, json, urllib.request

from PIL import Image, ImageOps, ImageFilter
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
IN=ROOT/"assets"/"cha-scenes"
OUT=ROOT/"assets"/"cha-hd"
OUT.mkdir(parents=True,exist_ok=True)
MODEL_URL="https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x4.pb"
TARGET=(1448,1086)
sr=None
try:
    import cv2
    model=Path("/tmp/FSRCNN_x4.pb")
    with urllib.request.urlopen(MODEL_URL,timeout=25) as response:
        data=response.read()
    if not (10_000<len(data)<3_000_000): raise ValueError("Unexpected super-resolution model length")
    model.write_bytes(data)
    sr=cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(str(model))
    sr.setModel("fsrcnn",4)
    print("FSRCNN x4 enhancement enabled")
except Exception as exc:
    print("Using high-quality resampling fallback:",exc)
    sr=None

report=[]
for source in sorted(IN.glob("cha-*.webp")):
    source_img=Image.open(source).convert("RGB")
    if sr is not None:
        try:
            bgr=cv2.cvtColor(np.asarray(source_img),cv2.COLOR_RGB2BGR)
            result=sr.upsample(bgr)
            enhanced=Image.fromarray(cv2.cvtColor(result,cv2.COLOR_BGR2RGB))
            method="FSRCNN x4 + calibrated high-resolution output"
        except Exception as exc:
            print(source.name,"super-resolution failed, fallback:",exc)
            enhanced=source_img
            method="Lanczos enhanced"
    else:
        enhanced=source_img
        method="Lanczos enhanced"
    # Preserve human proportions; crop only if required by the target ratio.
    canvas=ImageOps.fit(enhanced,TARGET,method=Image.Resampling.LANCZOS,centering=(.5,.48))
    canvas=canvas.filter(ImageFilter.UnsharpMask(radius=1.2,percent=80,threshold=3))
    destination=OUT/source.name
    canvas.save(destination,"WEBP",quality=84,method=6)
    report.append({"file":destination.relative_to(ROOT).as_posix(),
                   "width":TARGET[0],"height":TARGET[1],
                   "source":source.relative_to(ROOT).as_posix(),
                   "method":method,
                   "sha256":hashlib.sha256(destination.read_bytes()).hexdigest()})
    print("Built",destination.name,TARGET,method)
assert len(report)>=12,f"Expected 12 distinct WRHA scenes, got {len(report)}"
(OUT/"quality-report.json").write_text(json.dumps(report,indent=2)+"\n")
