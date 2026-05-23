type SuccessPageOptions = {
  eyebrow: string;
  title: string;
  message: string;
  detail: string;
  accent: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderSuccessPage({
  eyebrow,
  title,
  message,
  detail,
  accent,
}: SuccessPageOptions) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #06080f;
        --bg-2: #0b1020;
        --card: rgba(14, 18, 31, 0.82);
        --border: rgba(255, 255, 255, 0.1);
        --text: #edf2ff;
        --muted: #98a2c3;
        --accent: ${accent};
      }

      * { box-sizing: border-box; }

      html, body {
        margin: 0;
        width: 100%;
        min-height: 100%;
      }

      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(86, 214, 194, 0.16), transparent 30%),
          radial-gradient(circle at top right, rgba(103, 126, 234, 0.16), transparent 28%),
          linear-gradient(180deg, var(--bg), var(--bg-2));
        color: var(--text);
        padding: 24px;
      }

      .panel {
        width: min(100%, 720px);
        border: 1px solid var(--border);
        border-radius: 28px;
        background: var(--card);
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(18px);
        padding: clamp(24px, 4vw, 40px);
      }

      .top {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        margin-bottom: 28px;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
        font-size: 12px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 70%, transparent);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 12px;
        font-weight: 700;
      }

      h1 {
        margin: 14px 0 12px;
        font-size: clamp(30px, 6vw, 54px);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: clamp(15px, 2vw, 18px);
        line-height: 1.6;
      }

      .message {
        margin-top: 14px;
        color: var(--text);
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-top: 30px;
      }

      .card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        border-radius: 20px;
        padding: 16px 18px;
      }

      .card-title {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--muted);
        margin-bottom: 8px;
      }

      .card-body {
        color: var(--text);
        font-size: 15px;
        line-height: 1.5;
      }

      .footer {
        margin-top: 28px;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        align-items: center;
        color: var(--muted);
        font-size: 14px;
      }

      .kbd {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.04);
      }

      @media (max-width: 640px) {
        body {
          padding: 16px;
        }

        .panel {
          border-radius: 22px;
        }

        .top, .footer {
          flex-direction: column;
          align-items: flex-start;
        }

        .grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="panel">
      <div class="top">
        <div class="brand"><span class="dot"></span> ArenaCode</div>
        <div class="eyebrow">${escapeHtml(eyebrow)}</div>
      </div>

      <section>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(detail)}</p>
        <p class="message">${escapeHtml(message)}</p>

        <div class="grid">
          <div class="card">
            <div class="card-title">Next step</div>
            <div class="card-body">Return to the terminal and continue where you left off.</div>
          </div>
          <div class="card">
            <div class="card-title">Status</div>
            <div class="card-body">This session is complete and ready to dismiss.</div>
          </div>
        </div>
      </section>

      <div class="footer">
        <span>${escapeHtml(eyebrow)}</span>
        <span class="kbd">Close this tab to go back to ArenaCode</span>
      </div>
    </main>
  </body>
</html>`;
}