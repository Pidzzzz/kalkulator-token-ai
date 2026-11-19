export default function InputPanel() {
  return (
    <div className="card">
      <h2 className="input-panel__title">Masukan</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="paket">
          Paket langganan
        </label>
        <select className="form-select" id="paket" defaultValue="opencode-go">
          <option value="opencode-go">OpenCode Go</option>
          <option value="claude-pro">Claude Pro</option>
          <option value="claude-max">Claude Max 5×</option>
          <option value="chatgpt-plus">ChatGPT Plus</option>
          <option value="kustom">Kustom</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="model">
          Model
        </label>
        <select className="form-select" id="model" defaultValue="claude-sonnet">
          <option value="claude-sonnet">Claude 4 Sonnet</option>
          <option value="claude-opus">Claude Opus 4</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gemini-pro">Gemini 2.5 Pro</option>
          <option value="deepseek-v3">DeepSeek V3</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="jatah">
          Jatah (USD)
        </label>
        <input
          className="form-input"
          id="jatah"
          type="text"
          inputMode="decimal"
          defaultValue="10.00"
        />
        <p className="form-hint">Contoh: 20% dari $50/bulan = $10</p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="jendela">
          Jendela waktu
        </label>
        <select className="form-select" id="jendela" defaultValue="5jam">
          <option value="5jam">Per 5 jam</option>
          <option value="minggu">Per minggu</option>
          <option value="bulan">Per bulan</option>
        </select>
      </div>
    </div>
  );
}
