/**
 * Data model & harga serta preset langganan.
 *
 * Harga per 1 juta token (USD).
 * `sumber` = nama halaman harga resmi, `cek` = tanggal periksa.
 *
 * PENTING: seluruh baris harga di versi ini masih PLACEHOLDER.
 * Verifikasi resmi (termasuk URL & tanggal) adalah tugas sesi F4.
 * Jangan menganggap angka di sini sebagai angka tagihan final.
 */

export const models = [
  // Anthropic
  {
    id: "claude-sonnet",
    nama: "Claude 4 Sonnet",
    provider: "Anthropic",
    hargaInput: 3.0,
    hargaOutput: 15.0,
    hargaCache: 0.3,
    konteks: 200000,
    sumber: "Anthropic Pricing",
    cek: "2026-11-19",
  },
  {
    id: "claude-haiku",
    nama: "Claude 3.5 Haiku",
    provider: "Anthropic",
    hargaInput: 0.8,
    hargaOutput: 4.0,
    hargaCache: 0.08,
    konteks: 200000,
    sumber: "Anthropic Pricing",
    cek: "2026-11-19",
  },
  {
    id: "claude-opus",
    nama: "Claude Opus 4",
    provider: "Anthropic",
    hargaInput: 15.0,
    hargaOutput: 75.0,
    hargaCache: 1.5,
    konteks: 200000,
    sumber: "Anthropic Pricing",
    cek: "2026-11-19",
  },

  // OpenAI
  {
    id: "gpt-4o",
    nama: "GPT-4o",
    provider: "OpenAI",
    hargaInput: 2.5,
    hargaOutput: 10.0,
    hargaCache: 1.25,
    konteks: 128000,
    sumber: "OpenAI Pricing",
    cek: "2026-11-19",
  },
  {
    id: "gpt-4o-mini",
    nama: "GPT-4o mini",
    provider: "OpenAI",
    hargaInput: 0.15,
    hargaOutput: 0.6,
    hargaCache: 0.075,
    konteks: 128000,
    sumber: "OpenAI Pricing",
    cek: "2026-11-19",
  },
  {
    id: "o1",
    nama: "o1",
    provider: "OpenAI",
    hargaInput: 15.0,
    hargaOutput: 60.0,
    hargaCache: 7.5,
    konteks: 200000,
    sumber: "OpenAI Pricing",
    cek: "2026-11-19",
  },
  {
    id: "o3-mini",
    nama: "o3-mini",
    provider: "OpenAI",
    hargaInput: 1.1,
    hargaOutput: 4.4,
    hargaCache: 0.55,
    konteks: 200000,
    sumber: "OpenAI Pricing",
    cek: "2026-11-19",
  },

  // Google
  {
    id: "gemini-2-5-pro",
    nama: "Gemini 2.5 Pro",
    provider: "Google",
    hargaInput: 1.25,
    hargaOutput: 5.0,
    hargaCache: 0.3125,
    konteks: 2000000,
    sumber: "Google Gemini API Pricing",
    cek: "2026-11-19",
  },
  {
    id: "gemini-2-flash",
    nama: "Gemini 2.0 Flash",
    provider: "Google",
    hargaInput: 0.1,
    hargaOutput: 0.4,
    hargaCache: 0.025,
    konteks: 1000000,
    sumber: "Google Gemini API Pricing",
    cek: "2026-11-19",
  },

  // DeepSeek
  {
    id: "deepseek-v3",
    nama: "DeepSeek V3",
    provider: "DeepSeek",
    hargaInput: 0.14,
    hargaOutput: 0.28,
    hargaCache: 0.014,
    konteks: 64000,
    sumber: "DeepSeek API Pricing",
    cek: "2026-11-19",
  },
  {
    id: "deepseek-r1",
    nama: "DeepSeek R1",
    provider: "DeepSeek",
    hargaInput: 0.55,
    hargaOutput: 2.19,
    hargaCache: 0.14,
    konteks: 64000,
    sumber: "DeepSeek API Pricing",
    cek: "2026-11-19",
  },

  // Meta (model terbuka lewat penyedia terkelola)
  {
    id: "llama-3-3-70b",
    nama: "Llama 3.3 70B",
    provider: "Meta",
    hargaInput: 0.6,
    hargaOutput: 0.8,
    hargaCache: 0.3,
    konteks: 128000,
    sumber: "OpenRouter Pricing",
    cek: "2026-11-19",
  },

  // Mistral
  {
    id: "mistral-large",
    nama: "Mistral Large",
    provider: "Mistral",
    hargaInput: 2.0,
    hargaOutput: 6.0,
    hargaCache: 0.5,
    konteks: 128000,
    sumber: "Mistral Pricing",
    cek: "2026-11-19",
  },
  {
    id: "codestral",
    nama: "Codestral",
    provider: "Mistral",
    hargaInput: 0.2,
    hargaOutput: 0.6,
    hargaCache: 0.1,
    konteks: 256000,
    sumber: "Mistral Pricing",
    cek: "2026-11-19",
  },

  // xAI
  {
    id: "grok-2",
    nama: "Grok 2",
    provider: "xAI",
    hargaInput: 2.0,
    hargaOutput: 10.0,
    hargaCache: 0.5,
    konteks: 131072,
    sumber: "xAI Pricing",
    cek: "2026-11-19",
  },
];

export const presets = [
  {
    id: "opencode-go",
    nama: "OpenCode Go",
    jatahBawaan: 10,
    totalKuota: 50,
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "claude-pro",
    nama: "Claude Pro",
    jatahBawaan: 20,
    totalKuota: 20,
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "claude-max",
    nama: "Claude Max 5×",
    jatahBawaan: 100,
    totalKuota: 100,
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "chatgpt-plus",
    nama: "ChatGPT Plus",
    jatahBawaan: 20,
    totalKuota: 20,
    jendelaBawaan: "bulan",
    modelBawaan: "gpt-4o",
  },
  {
    id: "gemini",
    nama: "Gemini",
    jatahBawaan: 20,
    totalKuota: 20,
    jendelaBawaan: "bulan",
    modelBawaan: "gemini-2-5-pro",
  },
  {
    id: "kustom",
    nama: "Kustom",
    jatahBawaan: 10,
    totalKuota: 50,
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
];

export const jendelaOptions = [
  { id: "5jam", label: "Per 5 jam" },
  { id: "minggu", label: "Per minggu" },
  { id: "bulan", label: "Per bulan" },
];

export function getJendelaLabel(id) {
  return jendelaOptions.find((j) => j.id === id)?.label || jendelaOptions[0].label;
}
