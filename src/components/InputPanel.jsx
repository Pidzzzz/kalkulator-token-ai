export default function InputPanel() {
  return (
    <article className="card input-panel">
      <header className="card__header">
        <div className="card__badge-title">
          <span className="badge-dot" aria-hidden="true"></span>
          <h2 className="input-panel__title">Parameter Masukan</h2>
        </div>
        <p className="card__subtitle">Tentukan paket dan batas penggunaan AI Anda</p>
      </header>

      <form className="input-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="paket">
            Paket langganan
          </label>
          <div className="select-wrapper">
            <select
              className="form-select"
              id="paket"
              name="paket"
              defaultValue="opencode-go"
            >
              <option value="opencode-go">OpenCode Go</option>
              <option value="claude-pro">Claude Pro ($20/bln)</option>
              <option value="claude-max">Claude Max 5× ($100/bln)</option>
              <option value="chatgpt-plus">ChatGPT Plus ($20/bln)</option>
              <option value="kustom">Kustom / API Key Sendiri</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="model">
            Model default
          </label>
          <div className="select-wrapper">
            <select
              className="form-select"
              id="model"
              name="model"
              defaultValue="claude-sonnet"
            >
              <option value="claude-sonnet">Claude 4 Sonnet (Anthropic)</option>
              <option value="claude-opus">Claude Opus 4 (Anthropic)</option>
              <option value="gpt-4o">GPT-4o (OpenAI)</option>
              <option value="gemini-pro">Gemini 2.5 Pro (Google)</option>
              <option value="deepseek-v3">DeepSeek V3 (DeepSeek)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jatah">
            Jatah / Batas Anggaran
          </label>
          <div className="input-affix-group">
            <span className="input-affix input-affix--prefix" aria-hidden="true">$</span>
            <input
              className="form-input form-input--has-prefix"
              id="jatah"
              name="jatah"
              type="text"
              inputMode="decimal"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              aria-describedby="jatah-hint"
              defaultValue="10.00"
            />
            <span className="input-affix input-affix--suffix">USD</span>
          </div>
          <p id="jatah-hint" className="form-hint">
            Contoh: 20% dari paket $50/bulan = <strong>$10.00</strong>
          </p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jendela">
            Jendela Waktu Batas
          </label>
          <div className="select-wrapper">
            <select
              className="form-select"
              id="jendela"
              name="jendela"
              defaultValue="5jam"
            >
              <option value="5jam">Per 5 jam (Rolling session)</option>
              <option value="minggu">Per minggu (Weekly cap)</option>
              <option value="bulan">Per bulan (Monthly billing cycle)</option>
            </select>
          </div>
        </div>
      </form>
    </article>
  );
}
