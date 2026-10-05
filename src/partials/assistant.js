function renderAssistant() {
  return `
<div data-assistant>
  <button type="button" data-assistant-toggle aria-expanded="false" aria-controls="assistant-panel"
    class="assistant-toggle fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-goldglow"
    aria-label="Ask 2S — open assistant">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B0D0E" stroke-width="2" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  </button>

  <div id="assistant-panel" data-assistant-panel data-open="false" role="dialog" aria-label="2S Assistant" aria-hidden="true"
    class="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-charcoal border border-gold/20 rounded-xl overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-gold/10">
      <div class="flex items-center gap-2">
        <span class="status-dot" style="background-color:#10B981" aria-hidden="true"></span>
        <p class="font-head font-bold text-ink text-sm">2S Assistant</p>
      </div>
      <button type="button" data-assistant-close aria-label="Close assistant" class="text-muted hover:text-gold p-2 -mr-2 min-w-11 min-h-11 inline-flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div data-assistant-thread aria-live="polite" class="p-4 space-y-3 overflow-y-auto" style="max-height:320px"></div>
    <div data-assistant-options class="p-4 pt-0 flex flex-col gap-2"></div>
  </div>
</div>`;
}

module.exports = { renderAssistant };
