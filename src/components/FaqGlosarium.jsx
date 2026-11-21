import { useState } from "react";

/**
 * Bagian bacaan "FAQ & Glosarium" (Sesi 6) — duduk sesudah modul F1–F4,
 * sebelum footer. Murni bacaan: tanpa masukan, tanpa hitungan baru, tanpa
 * item dock baru. Tautan footer menuju #faq-glosarium.
 */

const SERING_TERTUKAR = [
  {
    a: "Konteks",
    b: "kuota",
    beda: "Konteks = ruang kerja model dalam satu sesi; bisa menyusut lagi lewat compaction atau sesi baru. Kuota = jatah dari paket; TIDAK ikut ter-reset oleh compaction maupun sesi baru.",
  },
  {
    a: "Request",
    b: "token",
    beda: "Free tier menghitung REQUEST; API menghitung TOKEN. Satu request agen bisa menyeret 100 ribu token lebih.",
  },
  {
    a: "Token input segar",
    b: "cache",
    beda: "Konteks berulang yang terbaca dari cache jauh lebih murah. Inilah alasan sesi agen panjang tidak semahal kelihatannya.",
    contoh:
      "DeepSeek cache $0,003 vs input segar $0,15 per 1 jt token = 50× lipat.",
  },
  {
    a: "Batas konteks model",
    b: "batas pemakaian paket",
    beda: "“Konteks 1 jt token” adalah KAPASITAS satu sesi, bukan jatah. Jatah ditentukan paketmu.",
  },
  {
    a: "Jendela 5 jam",
    b: "batas mingguan & jatah bulanan",
    beda: "Ketiganya bisa berjalan bersamaan (OpenCode Go, Claude, ChatGPT, Gemini). Yang habis duluan, dialah yang menghentikanmu.",
  },
  {
    a: "Jendela 5 jam",
    b: "tengah malam",
    beda: "Jendela mulai dari pesan pertama — bukan tengah malam, bukan jam bulat.",
    contoh: "Kirim pesan pertama 21.10, jendela berakhir 02.10.",
  },
  {
    a: "Compaction",
    b: "hapus sesi",
    beda: "Compaction MERANGKUM riwayat, bukan menghapusnya: intisari & keputusan bertahan, detail kata-per-kata bisa hilang. Angka token konteks turun, riwayat catatan tidak.",
  },
  {
    a: "Token reasoning",
    b: "token output",
    penghubung: "=",
    beda: "Rantai pikir model dihitung dan dihargai sebagai output, bukan gratis.",
  },
  {
    a: "Harga langganan",
    b: "harga API",
    beda: "Model yang sama hidup di dua dunia: flat per bulan (dengan jendela batas) vs per token persis. Keduanya tidak bisa dibandingkan mentah-mentah.",
  },
  {
    a: "“Gratis” pada free tier",
    b: "tanpa batas",
    beda: "Free tier ditopang batas request dalam jendela geser (±24 jam pada OpenCode Free), bukan jatah token; dan sebagian free tier memakai prompt untuk pelatihan (syarat tiap provider).",
  },
];

const FAQ = [
  {
    tanya: "Kenapa request-ku habis padahal pemakaian tokenku masih sedikit?",
    jawab:
      "Banyak paket menghitung request, bukan token. Satu pesan pendek tetap dihitung satu request penuh, jadi request bisa habis walau token yang terpakai sedikit.",
    contoh:
      "Sepuluh pesan pendek = sepuluh request, walau total tokennya jauh di bawah jatah token paket.",
  },
  {
    tanya:
      "Kenapa sesi baru terasa lebih murah daripada melanjutkan sesi lama?",
    jawab:
      "Sesi lama membawa seluruh riwayat sebagai konteks, sehingga setiap putaran membaca ulang konteks yang besar. Sesi baru mulai dari konteks kecil, jadi biaya input per request ikut kecil.",
    contoh:
      "Melanjutkan sesi 100.000 token jauh lebih mahal per request daripada sesi baru 5.000 token, walau pertanyaannya sama.",
  },
  {
    tanya: "Kenapa angka kalkulator ini bisa berbeda dari tagihan aslinya?",
    jawab:
      "Semua angka di sini adalah perkiraan terbuka dari asumsi yang ditampilkan — harga per 1 juta token dan faktor karakter-per-token. Tagihan resmi memakai tokenizer provider, pembulatan, pajak, dan aturan yang tidak selalu dipublikasikan. Itulah alasan lencana ESTIMASI: ini perkiraan terbuka, bukan billing.",
    contoh:
      "Teks 207 karakter dihitung 60 token dengan faktor 3,5; tokenizer resmi bisa memberi angka sedikit berbeda.",
  },
  {
    tanya: "Kenapa batas paketku tidak reset tengah malam?",
    jawab:
      "Jendela paket umumnya mulai dari pemakaian pertamamu, bukan mengikuti jam kalender. Karena itu batas 5 jam, mingguan, atau bulanan bisa bergeser mengikuti kapan kamu mulai.",
    contoh:
      "Pesan pertama pukul 21.10 membuat jendela 5 jam berakhir pukul 02.10, bukan pukul 00.00.",
  },
  {
    tanya:
      "Apa itu cache, dan kenapa request lanjutan dalam sesi agen jauh lebih murah dari request pertama?",
    jawab:
      "Cache adalah salinan konteks yang sudah pernah diproses server, sehingga request berikutnya tidak perlu memproses ulang dari nol. Membaca dari cache jauh lebih murah daripada input segar.",
    contoh:
      "DeepSeek: cache $0,003 vs input segar $0,15 per 1 juta token — sekitar 50× lipat.",
  },
  {
    tanya: "Model yang sama, kenapa harganya bisa beda jauh antar-provider?",
    jawab:
      "Provider resmi dan perantara seperti relay menetapkan margin, jalur, dan tarif sendiri, jadi model yang sama bisa dijual dengan harga berbeda. Bagaimana tepatnya sebuah perantara menentukan harganya tidak dipublikasikan.",
    contoh:
      "Model yang sama bisa tampil $2/$10 per 1 juta token di satu tempat dan lebih mahal di relay lain.",
  },
  {
    tanya:
      "Apa yang terjadi pada konteks & kuotaku saat compaction berjalan?",
    jawab:
      "Compaction merangkum riwayat saat sesi terlalu panjang: konteks menyusut karena detail diganti rangkuman, sementara intisari dan keputusan bertahan. Kuota tidak ikut berubah — compaction bukan pengembalian jatah.",
    contoh:
      "Sesi 150.000 token bisa menjadi rangkuman beberapa ribu token, tetapi pemakaian kuota paket tetap seperti sebelumnya.",
  },
  {
    tanya: "Kenapa paketku menyebut “5 jam” DAN “mingguan” sekaligus?",
    jawab:
      "Paket besar biasanya punya beberapa batas berlapis yang aktif bersamaan: jendela 5 jam, batas mingguan, kadang jatah bulanan. Yang lebih dulu habis, dialah yang menghentikan pemakaian. Besar tiap batas tidak dipublikasikan dengan angka pasti oleh semua provider.",
    contoh:
      "Jendela 5 jam masih longgar, tetapi batas mingguan sudah 100% — pemakaian tetap terhenti.",
  },
];

const GLOSARIUM = [
  {
    istilah: "Cache",
    arti: "Salinan konteks yang sudah pernah diproses, disimpan sementara oleh server agar tidak dihitung ulang dari nol. Membaca dari cache jauh lebih murah daripada memproses ulang.",
  },
  {
    istilah: "Compaction",
    arti: "Perangkuman otomatis saat riwayat sesi terlalu panjang: konteks menyusut karena diganti rangkuman, intisari bertahan, detail bisa hilang. Kuota tidak ikut berubah.",
  },
  {
    istilah: "Jendela (window)",
    arti: "Rentang waktu tempat kuota dihitung, misalnya 5 jam, seminggu, sebulan. Umumnya mulai dari pemakaian pertamamu, bukan mengikuti jam kalender.",
  },
  {
    istilah: "Konteks",
    arti: "Seluruh isi yang “diingat” model saat menjawab: instruksi awal, riwayat percakapan, dan berkas yang ikut dikirim. Batas konteks = kapasitas maksimum ingatan satu sesi.",
  },
  {
    istilah: "Kuota / jatah",
    arti: "Batas pemakaian yang diberikan paketmu dalam satu periode: bisa berupa jumlah request, jumlah token, atau nilai dolar.",
  },
  {
    istilah: "Model",
    arti: "Mesin AI yang menjawab (mis. Claude Sonnet 5.5, DeepSeek V4.1 Flash). Tiap model punya harga, kecepatan, dan batas konteks sendiri-sendiri.",
  },
  {
    istilah: "Perkiraan (estimasi)",
    arti: "Hasil hitung pendekatan dari asumsi yang ditampilkan terbuka. Berguna untuk merencanakan, bukan angka tagihan resmi — itulah alasan lencana ESTIMASI di aplikasi ini.",
  },
  {
    istilah: "Preset / paket",
    arti: "Pilihan langganan siap pakai (Claude Pro, ChatGPT Plus, OpenCode Go) lengkap dengan jatah dan jendela bawaannya.",
  },
  {
    istilah: "Provider",
    arti: "Penyedia yang menyajikan model (Anthropic, OpenAI, Google, DeepSeek, dan perantara seperti OpenCode Go). Model yang sama bisa dijual banyak provider dengan harga berbeda.",
  },
  {
    istilah: "Reasoning",
    arti: "Token “berpikir” model sebelum menulis jawaban akhir. Dihitung dan dihargai sebagai token output.",
  },
  {
    istilah: "Request (permintaan)",
    arti: "Satu kali kamu mengirim pesan ke model dan menerima jawabannya. Satu request bisa berisi sedikit token atau ratusan ribu token sekaligus.",
  },
  {
    istilah: "Sesi",
    arti: "Satu rangkaian percakapan/pekerjaan yang berkelanjutan, dengan konteksnya sendiri. Sesi baru = konteks mulai dari nol.",
  },
  {
    istilah: "Token",
    arti: "Potongan terkecil teks yang dibaca dan dihasilkan model (kira-kira 3–4 karakter). Semua harga AI dihitung per token, biasanya per 1 juta token.",
  },
  {
    istilah: "Token input / output",
    arti: "Input = semua yang dikirim ke model; output = yang dihasilkan model. Harga output hampir selalu beberapa kali lebih mahal daripada input.",
  },
];

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqGlosarium() {
  // Akordeon tertutup bawaan; tiap pertanyaan bisa dibuka/ditutup sendiri.
  const [terbuka, setTerbuka] = useState(() => FAQ.map(() => false));

  const toggleFaq = (index) => {
    setTerbuka((prev) =>
      prev.map((nilai, i) => (i === index ? !nilai : nilai))
    );
  };

  return (
    <section
      className="bacaan"
      id="faq-glosarium"
      aria-labelledby="bacaan-judul"
    >
      <header className="bacaan__header">
        <p className="bacaan__label">Bacaan</p>
        <h2 className="bacaan__judul" id="bacaan-judul">
          FAQ &amp; Glosarium
        </h2>
      </header>

      {/* ---- A. Sering Tertukar ---- */}
      <div className="bacaan__blok">
        <h3 className="bacaan__subjudul">Sering Tertukar</h3>
        <div className="tertukar-grid">
          {SERING_TERTUKAR.map((item, index) => (
            <article className="tertukar" key={`${item.a}-${item.b}-${index}`}>
              <p className="tertukar__istilah">
                <span className="tertukar__istilah-teks">{item.a}</span>
                <span className="tertukar__vs" aria-hidden="true">
                  {item.penghubung || "vs"}
                </span>
                <span className="tertukar__istilah-teks">{item.b}</span>
              </p>
              <p className="tertukar__beda">{item.beda}</p>
              {item.contoh ? (
                <p className="tertukar__contoh">
                  <span className="tertukar__contoh-label">Contoh:</span>{" "}
                  {item.contoh}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      {/* ---- B. FAQ (akordeon) ---- */}
      <div className="bacaan__blok">
        <h3 className="bacaan__subjudul">FAQ</h3>
        <div className="faq">
          {FAQ.map((item, index) => {
            const idJawab = `faq-jawab-${index + 1}`;
            const idTombol = `faq-tanya-${index + 1}`;
            const isOpen = terbuka[index];

            return (
              <div className="faq__item" key={item.tanya}>
                <h4 className="faq__judul">
                  <button
                    type="button"
                    id={idTombol}
                    className="faq__tombol"
                    aria-expanded={isOpen}
                    aria-controls={idJawab}
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="faq__tanya">{item.tanya}</span>
                    <span className="faq__chevron" aria-hidden="true">
                      <ChevronIcon />
                    </span>
                  </button>
                </h4>
                <div
                  className="faq__jawab"
                  id={idJawab}
                  role="region"
                  aria-labelledby={idTombol}
                  hidden={!isOpen}
                >
                  <p>{item.jawab}</p>
                  <p className="faq__contoh">
                    <span className="faq__contoh-label">Contoh:</span>{" "}
                    {item.contoh}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- C. Glosarium ---- */}
      <div className="bacaan__blok">
        <h3 className="bacaan__subjudul">Glosarium</h3>
        <dl className="glosarium">
          {GLOSARIUM.map((item) => (
            <div className="glosarium__item" key={item.istilah}>
              <dt className="glosarium__istilah">{item.istilah}</dt>
              <dd className="glosarium__arti">{item.arti}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
