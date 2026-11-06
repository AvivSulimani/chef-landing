/** Where the accessibility menu keeps the visitor's choices (in this browser only; nothing is sent anywhere). */
export const A11Y_KEY = "soil-a11y";

/**
 * A few lines that run inside <head> before the first paint. They copy a saved choice onto <html> as data-a11y-*
 * attributes, which the styles in globals.css react to, so a larger text size or a dark background never flashes
 * the default look first. Storage can be blocked: everything is wrapped, and a failure only means "no saved choice".
 * Keep this file free of any browser or React import: the root layout (a server component) reads it.
 */
export const a11yBootScript = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(A11Y_KEY)})||"null");if(!p||typeof p!=="object")return;var d=document.documentElement;
if([-1,1,2,3].indexOf(p.text)>-1)d.setAttribute("data-a11y-text",String(p.text));
if(p.contrast==="high"||p.contrast==="dark")d.setAttribute("data-a11y-contrast",p.contrast);
if(p.links===true)d.setAttribute("data-a11y-links","on");
if(p.font===true)d.setAttribute("data-a11y-font","readable");
if(p.spacing===true)d.setAttribute("data-a11y-spacing","on");
if(p.motion===true)d.setAttribute("data-a11y-motion","off");
}catch(e){}})();`;
