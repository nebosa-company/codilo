// A small inline icon set. Everything is drawn with strokes on a 24x24 grid and
// inherits `currentColor`, so a single sprite works in both themes and needs no
// network request (the app runs from file:// inside the webview).
// Exported so a test can check that every name a source file uses is defined
// here. `iconMarkup` throws on an unknown one, at menu-render time, which is a
// bad moment to find out.
export const PATHS = {
  file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
  saveAs:
    '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M12 9v7"/><path d="m9 13 3 3 3-3"/>',
  close: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  zoomIn:
    '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/><path d="M11 8.5v5"/><path d="M8.5 11h5"/>',
  zoomOut: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/><path d="M8.5 11h5"/>',
  zoomReset: '<path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 3.5V9h5.5"/>',
  sidebar:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M5.4 8.2h2.2"/><path d="M5.4 11h2.2"/>',
  folderOpen:
    '<path d="M3 8V6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1"/><path d="M3 9h18l-2.1 8.3A2 2 0 0 1 17 19H5a2 2 0 0 1-2-2z"/>',
  toolbar: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.5h18"/>',
  statusbar: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 15.5h18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  bold: '<path d="M7 4v16"/><path d="M7 4h6a4 4 0 0 1 0 8H7"/><path d="M7 12h7a4 4 0 0 1 0 8H7"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.9.5c0 1.5-2.4 2-2.4 3.5"/><path d="M12 17h.01"/>',
  warning: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4"/><path d="M12 17.2h.01"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  // An arrow up against a wall: the tab goes all the way to the front.
  moveToStart: '<path d="M5 5v14"/><path d="M20 12H9"/><path d="m14 7-5 5 5 5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/>',
  cut: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  paste: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  selectAll: '<path d="M4 8V6a2 2 0 0 1 2-2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M20 16v2a2 2 0 0 1-2 2h-2"/><path d="M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M8 9h8"/><path d="M8 13h6"/>',
  comment: '<path d="M4 5h16"/><path d="M4 12h10"/><path d="M4 19h16"/><path d="M17 10l3 2-3 2"/>',
  exit: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  // The bar every title-bar minimise button uses, over the window it drops to.
  minimize: '<path d="M6 6h12"/><rect x="4" y="12" width="16" height="8" rx="2"/>',
  upper: '<path d="M4 18 8 6l4 12"/><path d="M5.2 14h5.6"/><path d="M16 8h5"/><path d="M18.5 8v10"/>',
  lower: '<path d="M4 18 7 9l3 9"/><path d="M4.9 15h4.2"/><path d="M20 11a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/><path d="M20 11v5"/>',
  guid: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10v4"/><path d="M11 10v4"/><path d="M15 10v4"/><path d="M19 10v4"/>',
  deleteLine: '<path d="M4 7h11"/><path d="M4 12h9"/><path d="M4 17h7"/><path d="m17 10 5 5"/><path d="m22 10-5 5"/>',
  spellcheck: '<path d="m3 15 4.5-10L12 15"/><path d="M4.6 11.5h5.8"/><path d="m14 17 2.5 2.5L22 14"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01"/><path d="M10 10h.01"/><path d="M14 10h.01"/><path d="M18 10h.01"/><path d="M7 14h10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  symbol: '<path d="M9 4H7a3 3 0 0 0-3 3v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a3 3 0 0 0 3 3h2"/><path d="M15 4h2a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a3 3 0 0 1-3 3h-2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1L11.5 4.5"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.4-1.4"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>',
  terminalAdd: '<path d="M4 6h16"/><path d="m7 11 3 3-3 3"/><path d="M13 17h3"/><path d="M18 9h4"/><path d="M20 7v4"/>',
  shield: '<path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-0.8 7-4.6 7-9V6z"/><path d="m9.5 12 2 2 3.5-4"/>',
  sort: '<path d="M4 7h9"/><path d="M4 12h6"/><path d="M4 17h3"/><path d="M17 5v14"/><path d="m14 16 3 3 3-3"/>',
  undo: '<path d="M3 7v6h6"/><path d="M3.5 13a9 9 0 1 0 2.1-6.4L3 9"/>',
  redo: '<path d="M21 7v6h-6"/><path d="M20.5 13a9 9 0 1 1-2.1-6.4L21 9"/>',
  wordWrap: '<path d="M4 6h16"/><path d="M4 12h13a3 3 0 0 1 0 6h-3"/><path d="m16 15-2.5 3 2.5 3"/><path d="M4 18h4"/>',
  // The four splits share a frame; the filled half shows where the pane lands.
  splitUp: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/><path d="M6 8h12" opacity=".55"/>',
  splitDown: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 12h18"/><path d="M6 16h12" opacity=".55"/>',
  splitLeft: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/><path d="M7 8v8" opacity=".55"/>',
  splitRight: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/><path d="M17 8v8" opacity=".55"/>',
  // The Harness menu and the panel's own tabs. Two lobes and a stem, drawn as a
  // pair of mirrored curves so it reads at 16px rather than turning to mush.
  brain: '<path d="M12 5.5A3 3 0 0 0 6.5 7a3 3 0 0 0-1.4 5.6A3 3 0 0 0 7 18a2.5 2.5 0 0 0 5 .5z"/><path d="M12 5.5A3 3 0 0 1 17.5 7a3 3 0 0 1 1.4 5.6A3 3 0 0 1 17 18a2.5 2.5 0 0 1-5 .5z"/><path d="M12 5.5v13"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
  timeline: '<path d="M5 4v16"/><circle cx="5" cy="8" r="1.6"/><circle cx="5" cy="16" r="1.6"/><path d="M9 8h10"/><path d="M9 16h6"/>',
  chat: '<path d="M20 12a7 7 0 0 1-7 7H9l-4 3v-4.6A7 7 0 0 1 13 5a7 7 0 0 1 7 7z"/>',
  requirements:
    '<path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 10h8"/><path d="M8 14h8"/><path d="M8 18h5"/>',
  approvals: '<path d="M4 7a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="m8.5 13 2.5 2.5 4.5-5"/>',
  diff: '<path d="M6 4v10a3 3 0 0 0 3 3h6"/><path d="m12 14 3 3-3 3"/><circle cx="6" cy="4" r="1.6"/><path d="M18 6v6"/><path d="M15 9h6"/>',
  btw: '<path d="M5 5h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-7l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M12 8v3"/><path d="M12 13h.01"/>',
  artifacts: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5"/><path d="M12 12v9"/><path d="m12 12-8-4.5"/>',
};

/** Returns the markup for an icon, sized in `em` so it tracks the button text. */
export function iconMarkup(name, { size = "1em" } = {}) {
  const paths = PATHS[name];
  if (!paths) throw new Error(`Unknown icon: ${name}`);
  const filled = name === "play";
  return (
    `<svg class="icon" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" ` +
    `fill="${filled ? "currentColor" : "none"}" stroke="${filled ? "none" : "currentColor"}" ` +
    `stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
  );
}

/** Builds a detached <svg> element for the same icon. */
export function iconElement(name, options) {
  const holder = document.createElement("span");
  holder.innerHTML = iconMarkup(name, options);
  return holder.firstElementChild;
}

// The application mark, the same artwork the packaged icons are rendered from,
// inlined so the About box needs no request. Regenerate both together with
// `python tools/make-icon.py`.
const APP_LOGO =
  "data:image/svg+xml;base64,PCEtLSBUaGUgQ29kaWxvIG1hcms6IGEgYmx1ZSByb3VuZGVkIHRpbGUgY2FycnlpbmcgYSB3aGl0ZSBpdGFsaWMgQyBpbiBuZXBlcidzCiAgICAgaWNvbiBsYW5ndWFnZS4gVGhlIEMncyBsb3dlciB0ZXJtaW5hbCBydW5zIG9uIGFzIGEgcmlzaW5nIHRhaWwsIHdoaWNoIGtlZXBzCiAgICAgdGhlIGdseXBoIHJlYWRhYmxlIGF0IDE2cHggd2l0aG91dCByZWx5aW5nIG9uIGEgc2Vjb25kIGxldHRlci4gRXZlcnkgZWRnZSBpcwogICAgIGEgY3VydmU6IHRoZSBzdHJva2UgZW5kcyBhcmUgcm91bmRlZCwgc28gbm8gcG9pbnQgb3IgY29ybmVyIHN1cnZpdmVzLgogICAgIFNvdXJjZSBvZiB0cnV0aCBmb3IgdGhlIGJyYW5kOiByYXN0ZXJpc2UgdGhlIHRpbGUgdG8gUE5HIGFuZCBmZWVkIHRoYXQgdG8KICAgICBgbnB4IHRhdXJpIGljb25gIGRpcmVjdGx5LiBUaGUgZXhpc3RpbmcgbWFrZS1pY29uLnB5IGFkZHMgYSB3aGl0ZSBwbGF0ZSBvZgogICAgIGl0cyBvd24sIHNvIGl0IGV4cGVjdHMgYSB0cmFuc3BhcmVudCBtYXJrLCBub3QgdGhpcyB0aWxlLiAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJDb2RpbG8iPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyLjY0IiByeT0iMTEyLjY0IiBmaWxsPSIjMUIzQTZCIi8+CiAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMwMC4xIDg5LjZDMzEzIDkwLjMgMzMwIDkyLjcgMzQyLjMgOTUuNUMzNTQuNyA5OC4zIDM2Mi4zIDEwMS43IDM2OSAxMDUuNEMzNzUuNyAxMDkuMiAzODEuMyAxMTMuMyAzODYuMiAxMTcuOEMzOTEgMTIyLjIgMzk1IDEyNi44IDM5OC41IDEzMi4yQzQwMiAxMzcuNSA0MDUgMTQzLjUgNDA3LjEgMTQ4LjhDNDA5LjIgMTU0IDQxMC4zIDE1OC41IDQxMC45IDE2My44QzQxMS41IDE2OS4yIDQxMS41IDE3NS4zIDM5OC40IDE4Mi43QzM4NS4zIDE5MCAzNTkuMiAxOTguNSAzNDYuNSAyMDAuNkMzMzMuOCAyMDIuNyAzMzQuNyAxOTguMyAzMzQuNCAxOTEuM0MzMzQuMiAxODQuMiAzMzIuOCAxNzQuMyAzMzAuOCAxNjdDMzI4LjggMTU5LjcgMzI2LjIgMTU0LjggMzIyLjQgMTUwLjVDMzE4LjcgMTQ2LjIgMzEzLjggMTQyLjMgMzA1LjkgMTM5LjNDMjk4IDEzNi4zIDI4NyAxMzQuMiAyNzcuNCAxMzMuOEMyNjcuOCAxMzMuMyAyNTkuNyAxMzQuNyAyNTEuNyAxMzYuOUMyNDMuNyAxMzkuMiAyMzUuOCAxNDIuMyAyMjcuNiAxNDcuM0MyMTkuMyAxNTIuMiAyMTAuNyAxNTguOCAyMDIuOSAxNjYuM0MxOTUuMiAxNzMuNyAxODguMyAxODEuOCAxODAuOSAxOTQuM0MxNzMuNSAyMDYuOCAxNjUuNSAyMjMuNyAxNjAuNCAyMzcuMkMxNTUuMyAyNTAuNyAxNTMuMiAyNjAuOCAxNTIgMjcwLjNDMTUwLjggMjc5LjcgMTUwLjcgMjg4LjMgMTUxLjMgMjk2LjlDMTUxLjggMzA1LjUgMTUzLjIgMzE0IDE1NS4yIDMyMS4zQzE1Ny4yIDMyOC41IDE1OS44IDMzNC41IDE2My41IDM0MC41QzE2Ny4yIDM0Ni41IDE3MS44IDM1Mi41IDE3OCAzNThDMTg0LjIgMzYzLjUgMTkxLjggMzY4LjUgMTk5LjYgMzcyQzIwNy4zIDM3NS41IDIxNS4yIDM3Ny41IDIyMy45IDM3OC42QzIzMi43IDM3OS43IDI0Mi4zIDM3OS44IDI1NC4zIDM3OC4xQzI2Ni4yIDM3Ni4zIDI4MC4zIDM3Mi43IDMwMS41IDM2My45QzMyMi43IDM1NS4yIDM1MC44IDM0MS4zIDM3MS43IDMzMi4zQzM5Mi41IDMyMy4yIDQwNiAzMTguOCA0MTQuMSAzMTYuOEM0MjIuMiAzMTQuNyA0MjQuOCAzMTQuOCA0MjAuMiAzMTcuMUM0MTUuNSAzMTkuMyA0MDMuNSAzMjMuNyAzODUuNCAzMzMuOUMzNjcuMyAzNDQuMiAzNDMuMiAzNjAuMyAzMTcuOCAzNzQuOUMyOTIuNSAzODkuNSAyNjYgNDAyLjUgMjQ4LjcgNDEwQzIzMS4zIDQxNy41IDIyMy4yIDQxOS41IDIxNC43IDQyMC44QzIwNi4yIDQyMiAxOTcuMyA0MjIuNSAxODguOCA0MjIuMkMxODAuMyA0MjEuOCAxNzIuMiA0MjAuNyAxNjQuOCA0MTlDMTU3LjUgNDE3LjMgMTUxIDQxNS4yIDE0NC44IDQxMi41QzEzOC41IDQwOS44IDEzMi41IDQwNi43IDEyNiA0MDIuM0MxMTkuNSAzOTcuOCAxMTIuNSAzOTIuMiAxMDYuMSAzODUuNUM5OS43IDM3OC44IDkzLjggMzcxLjIgODkuMSAzNjMuMkM4NC4zIDM1NS4yIDgwLjcgMzQ2LjggNzguMSAzMzkuM0M3NS41IDMzMS43IDc0IDMyNC44IDczLjEgMzE2LjNDNzIuMiAzMDcuOCA3MS44IDI5Ny43IDcyLjMgMjg4LjZDNzIuNyAyNzkuNSA3My44IDI3MS41IDc1LjkgMjYyLjlDNzggMjU0LjMgODEgMjQ1LjIgODUuOCAyMzQuNkM5MC43IDIyNCA5Ny4zIDIxMiAxMDQuNiAyMDEuM0MxMTEuOCAxOTAuNyAxMTkuNyAxODEuMyAxMzQuMiAxNjguNUMxNDguNyAxNTUuNyAxNjkuOCAxMzkuMyAxODguMyAxMjcuMUMyMDYuNyAxMTQuOCAyMjIuMyAxMDYuNyAyMzUuNCAxMDEuM0MyNDguNSA5NS44IDI1OSA5My4yIDI2OC43IDkxLjRDMjc4LjMgODkuNyAyODcuMiA4OC44IDMwMC4xIDg5LjZaIi8+Cjwvc3ZnPgo=";

/**
 * The application mark, the same artwork the packaged icons are rendered from.
 * Inlined rather than loaded from a file so the About box needs no request and
 * stays sharp at any size. Unlike the icons above this one keeps its own
 * colours — it is a logo, not a glyph that should follow the text.
 */
export function appLogoElement(size = 64) {
  const image = document.createElement("img");
  image.className = "app-logo";
  image.width = size;
  image.height = size;
  image.alt = "";
  image.src = APP_LOGO;
  return image;
}
