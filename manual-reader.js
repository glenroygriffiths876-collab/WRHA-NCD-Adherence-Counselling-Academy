/* HSTU-inspired, same-origin MOHW PDF reader for the WRHA NCD Academy.
 * Authentically rendered first-page covers. No remote iframe/gview.
 * Ministry PDF source links remain the authoritative fallback.
 */
(function(){
  "use strict";
  const byId=id=>document.getElementById(id);
  const allowed=id=>/^[a-z][a-z0-9-]{2,40}$/.test(String(id||""));
  let current=null, pdfDoc=null, pageNum=1, zoom=1, renderTask=null, version=0, opened=false;
  if(window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions){
    window.pdfjsLib.GlobalWorkerOptions.workerSrc="vendor/pdfjs/pdf.worker.min.js";
  }

  function localFor(id){
    if(!allowed(id))return null;
    const raw=(window.WRHA_LOCAL_MANUALS||{})[id];
    if(!raw || !/^documents\/pdf-library\/[a-z0-9-]+\.pdf$/.test(raw.pdf||"")
      || !/^media\/pdf-covers\/[a-z0-9-]+\.webp$/.test(raw.cover||""))return null;
    return raw;
  }
  function status(message,isError){
    const target=byId("manual-reader-status");
    if(target){target.textContent=message;target.classList.toggle("error",!!isError);}
  }
  function showFallbackCover(doc){
    const cover=byId("manual-cover-fallback");
    if(!cover)return;
    cover.hidden=false;
    byId("manual-fallback-title").textContent=doc.title||"NCD guideline";
    byId("manual-fallback-date").textContent=doc.edition||"MOHW document";
  }
  function hideCanvas(){
    byId("manual-reader-canvas").hidden=true;
  }
  function updateButtons(){
    byId("manual-page-counter").textContent=pdfDoc?"Page "+pageNum+" of "+pdfDoc.numPages:"Cover preview";
    byId("manual-page-prev").disabled=!pdfDoc||pageNum<=1;
    byId("manual-page-next").disabled=!pdfDoc||pageNum>=pdfDoc.numPages;
    byId("manual-zoom-out").disabled=!pdfDoc||zoom<=.65;
    byId("manual-zoom-in").disabled=!pdfDoc||zoom>=2.2;
  }
  function select(doc){
    if(!doc)return;
    const token=++version;
    if(renderTask){try{renderTask.cancel()}catch(_){ }}
    renderTask=null;pdfDoc=null;pageNum=1;zoom=1;opened=false;current=doc;
    hideCanvas();
    const img=byId("manual-reader-cover");
    img.hidden=true;img.removeAttribute("src");
    const local=localFor(doc.id);
    showFallbackCover(doc);
    byId("manual-reader-stage").setAttribute("aria-label","Document cover and pages: "+doc.title);
    const original=doc.url;
    byId("manual-reader-source").href=original;
    const download=byId("manual-reader-download");
    download.href=local?local.pdf:original;
    if(local)download.setAttribute("download",doc.id+".pdf");
    else download.removeAttribute("download");
    const button=byId("manual-preview-start");
    button.hidden=!local;
    button.textContent=local?"Read complete PDF →":"Open official Ministry source ↗";
    byId("manual-reader-overlay").hidden=false;
    if(local){
      img.onload=()=>{
        if(token!==version)return;
        img.hidden=false;
        byId("manual-cover-fallback").hidden=true;
      };
      img.onerror=()=>{
        if(token!==version)return;
        img.hidden=true;
        showFallbackCover(doc);
      };
      img.src=local.cover;
      status("Authentic first-page preview. Choose Read complete PDF to turn pages.",false);
    } else {
      status("The Ministry PDF is not stored locally yet. The original source and download links remain available.",false);
      button.hidden=false;
    }
    updateButtons();
  }

  async function drawPage(){
    if(!pdfDoc)return;
    const requested=++version;
    if(renderTask){try{renderTask.cancel()}catch(_){ }}
    renderTask=null;
    try{
      const page=await pdfDoc.getPage(pageNum);
      if(requested!==version)return;
      const stage=byId("manual-reader-stage");
      const viewportBase=page.getViewport({scale:1});
      const width=Math.max(200,stage.clientWidth-32);
      const viewport=page.getViewport({scale:width/viewportBase.width*zoom});
      const canvas=byId("manual-reader-canvas");
      const dpr=Math.min(window.devicePixelRatio||1,1.8);
      canvas.width=Math.ceil(viewport.width*dpr);
      canvas.height=Math.ceil(viewport.height*dpr);
      canvas.style.width=Math.ceil(viewport.width)+"px";
      canvas.style.height=Math.ceil(viewport.height)+"px";
      const context=canvas.getContext("2d",{alpha:false});
      renderTask=page.render({canvasContext:context,viewport,transform:dpr===1?null:[dpr,0,0,dpr,0,0]});
      await renderTask.promise;
      if(requested!==version)return;
      canvas.hidden=false;
      byId("manual-reader-cover").hidden=true;
      byId("manual-cover-fallback").hidden=true;
      byId("manual-reader-overlay").hidden=true;
      status("Reading page "+pageNum+" of "+pdfDoc.numPages,false);
      updateButtons();
      stage.scrollTo({top:0,left:0,behavior:"instant"});
    }catch(e){
      if((e&&e.name)==="RenderingCancelledException")return;
      status("This page could not be displayed. Use Open at MOHW or Download instead.",true);
      console.warn("WRHA NCD PDF drawing error",e);
    }
  }
  async function load(){
    if(!current)return;
    const local=localFor(current.id);
    if(!local){
      const original=current.url;
      window.open(original,"_blank","noopener,noreferrer");
      return;
    }
    if(opened && pdfDoc){drawPage();return}
    opened=true;
    status("Loading the full PDF from the academy's local document library…",false);
    byId("manual-preview-start").disabled=true;
    const token=version;
    try{
      if(!window.pdfjsLib)throw new Error("PDF.js reader library is unavailable");
      let doc;
      try{
        doc=await pdfjsLib.getDocument({url:local.pdf,disableAutoFetch:false,rangeChunkSize:65536}).promise;
      }catch(streamError){
        const response=await fetch(local.pdf,{cache:"no-store"});
        if(!response.ok)throw new Error("Document HTTP "+response.status);
        const bytes=new Uint8Array(await response.arrayBuffer());
        if(bytes.length<5 || String.fromCharCode(...bytes.slice(0,5))!=="%PDF-")
          throw new Error("Local document response is not a PDF");
        doc=await pdfjsLib.getDocument({data:bytes}).promise;
      }
      if(token!==version){doc.destroy();return}
      pdfDoc=doc;pageNum=1;zoom=1;
      await drawPage();
    }catch(e){
      console.warn("WRHA PDF reader could not open document",e);
      opened=false;pdfDoc=null;
      status("The full reader could not load this document. Its cover is still available; select Download or Open at MOHW.",true);
      byId("manual-reader-overlay").hidden=false;
    }finally{byId("manual-preview-start").disabled=false;updateButtons()}
  }
  function move(delta){
    if(!pdfDoc)return;
    const next=pageNum+delta;
    if(next<1||next>pdfDoc.numPages)return;
    pageNum=next;drawPage();
  }
  function scale(multiplier){
    if(!pdfDoc)return;
    zoom=Math.max(.65,Math.min(2.2,zoom*multiplier));
    drawPage();
  }
  const safeBind=(id,callback)=>{
    const node=byId(id);if(node)node.addEventListener("click",callback);
  };
  safeBind("manual-preview-start",load);
  safeBind("manual-page-prev",()=>move(-1));
  safeBind("manual-page-next",()=>move(1));
  safeBind("manual-zoom-out",()=>scale(.8));
  safeBind("manual-zoom-in",()=>scale(1.25));
  const stage=byId("manual-reader-stage");
  if(stage)stage.addEventListener("keydown",e=>{
    if(!pdfDoc)return;
    if(["ArrowRight","PageDown"].includes(e.key)){e.preventDefault();move(1)}
    else if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();move(-1)}
  });
  window.WRHA_DOCUMENT_READER={select,load,localFor};
})();