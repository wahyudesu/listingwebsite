import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — openjobs",
  description: "Kebijakan privasi dan pengelolaan data pengguna openjobs.",
};

export default function PrivacyPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Kebijakan Privasi
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Terakhir diperbarui: 27 Agustus 2026
      </p>

      <Section title="1. Pendahuluan">
        <p>
          openjobs menghargai privasi penggunanya. Kebijakan ini menjelaskan
          informasi apa yang kami kumpulkan, bagaimana kami menggunakannya, dan
          hak-hak yang kamu miliki atas data tersebut. Dengan menggunakan layanan
          ini, kamu menyetujui praktik yang dijelaskan di sini.
        </p>
      </Section>

      <Section title="2. Informasi yang Kami Kumpulkan">
        <p>
          Saat ini openjobs adalah layanan yang dapat digunakan tanpa membuat
          akun. Data yang kami kumpulkan terbatas pada:
        </p>
        <ul>
          <li>
            <strong className="text-foreground">Log akses server</strong> — alamat
            IP, browser, halaman yang dikunjungi, dan waktu akses. Ini adalah
            standar operasi server web dan digunakan untuk keamanan dan analisis
            performa.
          </li>
          <li>
            <strong className="text-foreground">Query pencarian</strong> — kata
            kunci yang kamu masukkan di kotak pencarian, diproses di server untuk
            menyaring hasil. Kami tidak menyimpan riwayat pencarian secara
            permanen atau menghubungkannya dengan identitas pribadimu.
          </li>
          <li>
            <strong className="text-foreground">URL pratinjau</strong> — saat kamu
            membuka pratinjau lowongan, URL situs sumber dikirimkan ke server kami
            untuk di-render melalui proxy. URL ini tidak disimpan secara permanen.
          </li>
        </ul>
        <p>
          Kami <strong className="text-foreground">tidak</strong> mengumpulkan
          nama, email, nomor telepon, atau informasi identitas pribadi lainnya
          selama kamu menggunakan layanan tanpa akun.
        </p>
      </Section>

      <Section title="3. Cookie dan Penyimpanan Lokal">
        <p>
          openjobs menggunakan <strong className="text-foreground">localStorage</strong>{" "}
          browser untuk menyimpan preferensi tampilan (misalnya tema terang/gelap).
          Data ini tersimpan hanya di perangkatmu dan tidak pernah dikirimkan ke
          server kami.
        </p>
        <p>
          Kami tidak menggunakan cookie untuk pelacakan, iklan, atau analitik pihak
          ketiga.
        </p>
      </Section>

      <Section title="4. Penggunaan Data">
        <p>Data yang kami kumpulkan digunakan semata-mata untuk:</p>
        <ul>
          <li>Menjalankan dan meningkatkan performa layanan.</li>
          <li>Mendeteksi dan mencegah penyalahgunaan atau serangan keamanan.</li>
          <li>Menganalisis pola penggunaan secara agregat dan anonim.</li>
        </ul>
        <p>
          Kami tidak menjual, menyewakan, atau membagikan data kepada pihak ketiga
          untuk tujuan pemasaran.
        </p>
      </Section>

      <Section title="5. Layanan Pihak Ketiga">
        <p>
          openjobs menggunakan beberapa layanan infrastruktur pihak ketiga:
        </p>
        <ul>
          <li>
            <strong className="text-foreground">Cloudflare Browser Rendering</strong>{" "}
            — digunakan untuk me-render pratinjau situs yang tidak dapat di-embed
            secara langsung. URL yang kamu lihat dikirim ke Cloudflare untuk
            dirender. Kebijakan privasi Cloudflare berlaku:{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              cloudflare.com/privacypolicy
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">Situs sumber lowongan</strong>{" "}
            (JobStreet, LinkedIn, Glints, dll.) — saat kamu membuka lowongan di tab
            baru, kamu langsung mengakses situs tersebut dan tunduk pada kebijakan
            privasi mereka masing-masing.
          </li>
        </ul>
      </Section>

      <Section title="6. Keamanan Data">
        <p>
          Kami menerapkan praktik keamanan yang wajar untuk melindungi data dari
          akses yang tidak sah, termasuk penggunaan HTTPS untuk semua koneksi.
          Namun, tidak ada sistem yang sepenuhnya aman — kami tidak dapat menjamin
          keamanan absolut atas informasi yang ditransmisikan melalui internet.
        </p>
      </Section>

      <Section title="7. Retensi Data">
        <p>
          Log akses server disimpan selama maksimal <strong className="text-foreground">30 hari</strong>{" "}
          dan kemudian dihapus secara otomatis. Cache pratinjau situs disimpan di
          memori server selama maksimal <strong className="text-foreground">1 jam</strong> untuk
          alasan performa.
        </p>
      </Section>

      <Section title="8. Hak Penggunamu">
        <p>
          Sesuai dengan prinsip perlindungan data yang berlaku, kamu berhak untuk:
        </p>
        <ul>
          <li>Mengetahui data apa yang kami miliki tentangmu.</li>
          <li>
            Meminta penghapusan data yang berkaitan denganmu (misalnya log dengan
            IP-mu).
          </li>
          <li>Mengajukan pertanyaan atau keberatan atas praktik data kami.</li>
        </ul>
        <p>
          Untuk menggunakan hak-hak ini, hubungi kami melalui alamat email di
          bawah.
        </p>
      </Section>

      <Section title="9. Perubahan Kebijakan">
        <p>
          Kebijakan ini dapat diperbarui sewaktu-waktu. Kami akan mencantumkan
          tanggal pembaruan di bagian atas halaman ini. Perubahan signifikan akan
          kami informasikan melalui pengumuman di platform.
        </p>
      </Section>

      <Section title="10. Hubungi Kami">
        <p>
          Pertanyaan, permintaan, atau laporan terkait privasi dapat dikirimkan ke:
        </p>
        <p>
          <a
            href="mailto:hello@openjobs.id"
            className="text-foreground underline underline-offset-4"
          >
            hello@openjobs.id
          </a>
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
