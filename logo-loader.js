/* Use the exact supplied 358×198-pixel WRHA logo.
   The image was losslessly PNG-optimised and its RGB pixels verified
   identical to the original uploaded logo. No filters, tints or recolouring.
 */
(function(){
  "use strict";
  const parts=window.WRHA_EXACT_LOGO_PARTS;
  if(!Array.isArray(parts) || parts.length!==5) {
    console.warn("Original WRHA logo data missing — retaining fallback logo.");
    return;
  }
  const encoded=parts.join("");
  if(encoded.length!==16796 || !/^iVBORw0KGgo/.test(encoded)) {
    console.warn("Original WRHA logo data did not pass validation.");
    return;
  }
  const src="data:image/png;base64,"+encoded;
  window.WRHA_OFFICIAL_LOGO_SRC=src;
  document.querySelectorAll('img[src="assets/wrha-logo.svg"]').forEach(img=>{
    img.src=src;
    img.removeAttribute("srcset");
    img.style.filter="none";
    img.style.mixBlendMode="normal";
  });
})();