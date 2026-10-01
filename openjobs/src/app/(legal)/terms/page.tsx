import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — openjobs",
  description: "Syarat dan ketentuan penggunaan layanan openjobs.",
};

export default function TermsPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Syarat &amp; Ketentuan
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Terakhir diperbarui: 27 Agustus 2026
      </p>

      <Section title="1. Tentang Layanan">
        <p>
          openjobs adalah platform agregator lowongan kerja yang mengumpulkan dan
          menampilkan informasi dari berbagai sumber pihak ketiga (JobStreet,
          LinkedIn, Glints, Indeed, dan lainnya). Kami tidak menerbitkan atau
          memverifikasi lowongan secara langsung. Kami hanya menyediakan antarmuka
          untuk menemukan dan melihat pratinjau lowongan yang tersedia di internet.
        </p>
      </Section>

      <Section title="2. Penggunaan yang Diizinkan">
        <p>
          Dengan mengakses openjobs, kamu setuju untuk menggunakan layanan ini
          hanya untuk keperluan pencarian kerja yang sah. Kamu dilarang:
        </p>
        <ul>
          <li>
            Melakukan scraping, crawling, atau pengambilan data otomatis dari
            platform ini tanpa izin tertulis.
          </li>
          <li>
            Menggunakan layanan untuk tujuan yang melanggar hukum yang berlaku di
            Indonesia.
          </li>
          <li>
            Mengganggu atau merusak infrastruktur atau layanan yang kami gunakan.
          </li>
          <li>
            Menyalin, mendistribusikan ulang, atau mengklaim konten dari sumber
            ketiga yang ditampilkan di platform ini sebagai milikmu sendiri.
          </li>
        </ul>
      </Section>

      <Section title="3. Konten Pihak Ketiga">
        <p>
          Lowongan kerja yang ditampilkan di openjobs bersumber dari situs-situs
          eksternal. Kami tidak bertanggung jawab atas keakuratan, kelengkapan,
          atau ketersediaan informasi tersebut. Pratinjau situs (iframe atau proxy)
          hanya disediakan untuk kenyamanan — semua tindakan seperti melamar kerja
          dilakukan langsung di situs sumber.
        </p>
        <p>
          Tautan ke situs eksternal bukan merupakan endorsement dari openjobs
          terhadap perusahaan atau lowongan tersebut. Selalu verifikasi informasi
          langsung di situs resmi penyedia lowongan.
        </p>
      </Section>

      <Section title="4. Tidak Ada Jaminan">
        <p>
          Layanan ini disediakan sebagaimana adanya (<em>as is</em>) tanpa jaminan
          apa pun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa:
        </p>
        <ul>
          <li>Layanan akan selalu tersedia tanpa gangguan.</li>
          <li>Informasi lowongan yang ditampilkan selalu terkini atau akurat.</li>
          <li>
            Melamar melalui sumber yang ditautkan akan menghasilkan panggilan kerja.
          </li>
        </ul>
      </Section>

      <Section title="5. Batasan Tanggung Jawab">
        <p>
          Sejauh diizinkan oleh hukum yang berlaku, openjobs tidak bertanggung
          jawab atas kerugian langsung, tidak langsung, insidental, atau
          konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan
          layanan ini, termasuk kerugian akibat keputusan yang diambil berdasarkan
          informasi yang ditampilkan di platform ini.
        </p>
      </Section>

      <Section title="6. Hak Kekayaan Intelektual">
        <p>
          Desain antarmuka, kode sumber, dan nama "openjobs" adalah milik tim
          pengembang. Konten lowongan kerja yang ditampilkan tetap menjadi milik
          sumber aslinya masing-masing. Tidak ada bagian dari platform ini yang
          boleh direproduksi tanpa izin.
        </p>
      </Section>

      <Section title="7. Perubahan Syarat">
        <p>
          Kami dapat memperbarui syarat ini sewaktu-waktu. Perubahan akan berlaku
          segera setelah diterbitkan di halaman ini. Melanjutkan penggunaan layanan
          setelah perubahan diterbitkan berarti kamu menyetujui syarat yang baru.
        </p>
      </Section>

      <Section title="8. Hukum yang Berlaku">
        <p>
          Syarat dan ketentuan ini tunduk pada dan ditafsirkan berdasarkan hukum
          Republik Indonesia. Segala sengketa diselesaikan melalui jalur yang
          disepakati bersama, dengan yurisdiksi di pengadilan yang berwenang di
          Indonesia.
        </p>
      </Section>

      <Section title="9. Hubungi Kami">
        <p>
          Jika ada pertanyaan terkait syarat ini, hubungi kami melalui email di{" "}
          <a
            href="mailto:hello@openjobs.id"
            className="text-foreground underline underline-offset-4"
          >
            hello@openjobs.id
          </a>
          .
        </p>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_li]:list-disc [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-2 space-y-3">
        {children}
      </div>
    </section>
  );
}
