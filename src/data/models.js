/**
 * Data model & harga serta preset langganan.
 *
 * Harga per 1 juta token (USD).
 * `sumber` = halaman harga resmi, `cek` = tanggal periksa.
 *
 * Data diperbarui Sesi 2C (19 Nov 2026): 23 model, 9 provider.
 * Seluruh harga sudah diverifikasi dari halaman resmi masing-masing.
 * Catatan DeepSeek: tarif off-peak; jam sibuk 2x.
 */

export const models = [
  // Anthropic — https://platform.claude.com/docs/en/about-claude/pricing
  {
    id: "claude-fable-5-2",
    nama: "Claude Fable 5.2",
    provider: "Anthropic",
    hargaInput: 8,
    hargaOutput: 40,
    hargaCache: 0.2,
    konteks: 1000000,
    sumber: "https://platform.claude.com/docs/en/about-claude/pricing",
    cek: "2026-11-19",
  },
  {
    id: "claude-opus-5-5",
    nama: "Claude Opus 5.5",
    provider: "Anthropic",
    hargaInput: 4,
    hargaOutput: 20,
    hargaCache: 0.2,
    konteks: 1000000,
    sumber: "https://platform.claude.com/docs/en/about-claude/pricing",
    cek: "2026-11-19",
  },
  {
    id: "claude-sonnet-5-5",
    nama: "Claude Sonnet 5.5",
    provider: "Anthropic",
    hargaInput: 2,
    hargaOutput: 10,
    hargaCache: 0.1,
    konteks: 1000000,
    sumber: "https://platform.claude.com/docs/en/about-claude/pricing",
    cek: "2026-11-19",
  },
  {
    id: "claude-haiku-5-5",
    nama: "Claude Haiku 5.5",
    provider: "Anthropic",
    hargaInput: 0.1,
    hargaOutput: 0.5,
    hargaCache: 0.01,
    konteks: 1000000,
    sumber: "https://platform.claude.com/docs/en/about-claude/pricing",
    cek: "2026-11-19",
  },

  // OpenAI — https://developers.openai.com/api/docs/pricing
  {
    id: "gpt-6-2-astra",
    nama: "GPT-6.2 Astra",
    provider: "OpenAI",
    hargaInput: 8,
    hargaOutput: 40,
    hargaCache: 0.4,
    konteks: 1050000,
    sumber: "https://developers.openai.com/api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gpt-6-2-sol",
    nama: "GPT-6.2 Sol",
    provider: "OpenAI",
    hargaInput: 2,
    hargaOutput: 10,
    hargaCache: 0.1,
    konteks: 1050000,
    sumber: "https://developers.openai.com/api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gpt-6-1-terra",
    nama: "GPT-6.1 Terra",
    provider: "OpenAI",
    hargaInput: 1,
    hargaOutput: 5,
    hargaCache: 0.05,
    konteks: 1050000,
    sumber: "https://developers.openai.com/api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gpt-6-luna",
    nama: "GPT-6 Luna",
    provider: "OpenAI",
    hargaInput: 0.1,
    hargaOutput: 0.5,
    hargaCache: 0.01,
    konteks: 1050000,
    sumber: "https://developers.openai.com/api/docs/pricing",
    cek: "2026-11-19",
  },

  // Google — https://ai.google.dev/gemini-api/docs/pricing
  {
    id: "gemini-4-argon",
    nama: "Gemini 4 Argon",
    provider: "Google",
    hargaInput: 2,
    hargaOutput: 10,
    hargaCache: 0.1,
    konteks: 1000000,
    sumber: "https://ai.google.dev/gemini-api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gemini-4-hydrogen",
    nama: "Gemini 4 Hydrogen",
    provider: "Google",
    hargaInput: 1.5,
    hargaOutput: 7.5,
    hargaCache: 0.075,
    konteks: 1048576,
    sumber: "https://ai.google.dev/gemini-api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gemini-3-8-flash",
    nama: "Gemini 3.8 Flash",
    provider: "Google",
    hargaInput: 0.75,
    hargaOutput: 3.75,
    hargaCache: 0.075,
    konteks: 1048576,
    sumber: "https://ai.google.dev/gemini-api/docs/pricing",
    cek: "2026-11-19",
  },
  {
    id: "gemini-3-1-pro",
    nama: "Gemini 3.1 Pro",
    provider: "Google",
    hargaInput: 2,
    hargaOutput: 12,
    hargaCache: 0.2,
    konteks: 1048576,
    sumber: "https://ai.google.dev/gemini-api/docs/pricing",
    cek: "2026-11-19",
  },

  // DeepSeek — https://api-docs.deepseek.com/quick_start/pricing
  // Tarif off-peak; jam sibuk 2x.
  {
    id: "deepseek-v4-1-flash",
    nama: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    hargaInput: 0.15,
    hargaOutput: 0.6,
    hargaCache: 0.003,
    konteks: 1000000,
    sumber: "https://api-docs.deepseek.com/quick_start/pricing",
    cek: "2026-11-19",
  },
  {
    id: "deepseek-v4-pro",
    nama: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    hargaInput: 0.66,
    hargaOutput: 1.98,
    hargaCache: 0.022,
    konteks: 1000000,
    sumber: "https://api-docs.deepseek.com/quick_start/pricing",
    cek: "2026-11-19",
  },

  // xAI — https://docs.x.ai/developers/pricing
  {
    id: "grok-4-7",
    nama: "Grok 4.7",
    provider: "xAI",
    hargaInput: 2,
    hargaOutput: 6,
    hargaCache: 0.5,
    konteks: 500000,
    sumber: "https://docs.x.ai/developers/pricing",
    cek: "2026-11-19",
  },
  {
    id: "grok-4-3",
    nama: "Grok 4.3",
    provider: "xAI",
    hargaInput: 1.25,
    hargaOutput: 2.5,
    hargaCache: 0.2,
    konteks: 1000000,
    sumber: "https://docs.x.ai/developers/pricing",
    cek: "2026-11-19",
  },

  // Mistral — https://mistral.ai/pricing/api
  {
    id: "mistral-large-4",
    nama: "Mistral Large 4",
    provider: "Mistral",
    hargaInput: 0.7,
    hargaOutput: 2.1,
    hargaCache: 0.07,
    konteks: 1000000,
    sumber: "https://mistral.ai/pricing/api",
    cek: "2026-11-19",
  },
  {
    id: "mistral-medium-3-5",
    nama: "Mistral Medium 3.5",
    provider: "Mistral",
    hargaInput: 1.5,
    hargaOutput: 7.5,
    hargaCache: 0.15,
    konteks: 256000,
    sumber: "https://mistral.ai/pricing/api",
    cek: "2026-11-19",
  },

  // Moonshot — https://platform.kimi.ai
  {
    id: "kimi-k3-1-pro",
    nama: "Kimi K3.1 Pro",
    provider: "Moonshot",
    hargaInput: 2,
    hargaOutput: 10,
    hargaCache: 0.2,
    konteks: 1048576,
    sumber: "https://platform.kimi.ai",
    cek: "2026-11-19",
  },
  {
    id: "kimi-k2-7-code",
    nama: "Kimi K2.7 Code",
    provider: "Moonshot",
    hargaInput: 0.95,
    hargaOutput: 4,
    hargaCache: 0.19,
    konteks: 262144,
    sumber: "https://platform.kimi.ai",
    cek: "2026-11-19",
  },

  // Z.ai (Zhipu) — https://docs.z.ai/guides/overview/pricing
  {
    id: "glm-5-3",
    nama: "GLM-5.3",
    provider: "Z.ai",
    hargaInput: 1.4,
    hargaOutput: 4.4,
    hargaCache: 0.26,
    konteks: 1000000,
    sumber: "https://docs.z.ai/guides/overview/pricing",
    cek: "2026-11-19",
  },
  {
    id: "glm-5-3-flash",
    nama: "GLM-5.3 Flash",
    provider: "Z.ai",
    hargaInput: 0.15,
    hargaOutput: 0.5,
    hargaCache: 0.03,
    konteks: 1000000,
    sumber: "https://docs.z.ai/guides/overview/pricing",
    cek: "2026-11-19",
  },

  // Alibaba — Alibaba Cloud Model Studio, halaman pricing resmi (region Singapura)
  {
    id: "qwen4-max",
    nama: "Qwen4 Max",
    provider: "Alibaba",
    hargaInput: 1.5,
    hargaOutput: 4.5,
    hargaCache: 0.075,
    konteks: 1000000,
    sumber: "Alibaba Cloud Model Studio — Pricing (region Singapura)",
    cek: "2026-11-19",
  },
];

export const presets = [
  {
    id: "opencode-go",
    nama: "OpenCode Go",
    jatahBawaan: 10,
    totalKuota: 50,
    // Jatah dolar bulanan; batas 5 jam & mingguan hanyalah sub-batas.
    jendelaBawaan: "bulan",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "claude-pro",
    nama: "Claude Pro",
    jatahBawaan: 20,
    totalKuota: 20,
    // Batas sesi 5 jam (plus batas mingguan) pada dokumentasi Claude.
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "claude-max",
    nama: "Claude Max 5×",
    jatahBawaan: 100,
    totalKuota: 100,
    // Pola batas sesi yang sama dengan Claude Pro, kuota lebih besar.
    jendelaBawaan: "5jam",
    modelBawaan: "claude-sonnet",
  },
  {
    id: "chatgpt-plus",
    nama: "ChatGPT Plus",
    jatahBawaan: 20,
    totalKuota: 20,
    // Batas pemakaian Work/Codex dihitung per jendela 5 jam.
    jendelaBawaan: "5jam",
    modelBawaan: "gpt-4o",
  },
  {
    id: "gemini",
    nama: "Gemini",
    jatahBawaan: 20,
    totalKuota: 20,
    // Batas aplikasi Gemini (Google AI Pro) dihitung per jendela 5 jam.
    jendelaBawaan: "5jam",
    modelBawaan: "gemini-2-5-pro",
  },
  {
    id: "kustom",
    nama: "Kustom",
    jatahBawaan: 10,
    totalKuota: 50,
    // Tanpa bawaan: jendela pilihan user tidak diubah saat beralih ke Kustom.
    jendelaBawaan: null,
    modelBawaan: "claude-sonnet",
  },
];

export const jendelaOptions = [
  { id: "5jam", label: "Per 5 jam" },
  { id: "hari", label: "Per hari" },
  { id: "minggu", label: "Per minggu" },
  { id: "bulan", label: "Per bulan" },
];

export function getJendelaLabel(id) {
  return jendelaOptions.find((j) => j.id === id)?.label || jendelaOptions[0].label;
}
