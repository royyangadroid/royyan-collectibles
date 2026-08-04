export type ContentBlock =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'note'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'image'; src: string; caption: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  isFeatured?: boolean;
  readingTime: string;
  publishedDate: string;
  author: string;
  content: ContentBlock[];
}

export const DUMMY_ARTICLES: Article[] = [
  // ─── FEATURED STORIES ──────────────────────────────────────────────────────
  {
    slug: 'collector-story-royyanga',
    title: 'Perjalanan 10 Tahun Mengoleksi: Dari Hot Wheels Pertama Hingga Koleksi Ratusan Piece',
    excerpt: 'Setiap kolektor memiliki cerita pertamanya. Di sini, pendiri Royyan Collectibles berbagi perjalanan personal membangun koleksi selama satu dekade — penuh pelajaran, kejutan, dan kebanggaan.',
    coverImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1200&q=80&auto=format&fit=crop',
    category: 'Featured Stories',
    categorySlug: 'featured',
    isFeatured: true,
    readingTime: '8 Min Read',
    publishedDate: 'Aug 3, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Perjalanan 10 Tahun Mengoleksi: Dari Hot Wheels Pertama Hingga Koleksi Ratusan Piece' },
      { type: 'p', text: 'Saya tidak pernah menyangka bahwa sebuah Hot Wheels yang saya beli dengan uang jajan ketika duduk di bangku SMP akan menjadi awal dari sebuah perjalanan panjang yang mengubah hidup saya. Itu adalah sebuah Chevrolet Camaro merah dengan ban Real Riders. Harganya tidak seberapa, tetapi perasaan memegangnya untuk pertama kali terasa luar biasa.' },
      { type: 'h2', text: 'Tahun Pertama: Belajar dari Kesalahan' },
      { type: 'p', text: 'Seperti kebanyakan kolektor pemula, saya membeli segalanya tanpa fokus. Die-cast berbagai merek, action figure, komik — semua saya beli tanpa strategi yang jelas. Akibatnya, anggaran sering jebol dan koleksi terasa berantakan tanpa identitas.' },
      { type: 'h2', text: 'Menemukan Fokus di Tahun Ketiga' },
      { type: 'p', text: 'Di tahun ketiga, saya memutuskan untuk fokus hanya pada dua kategori: Hot Wheels Treasure Hunt dan uang kertas kuno Indonesia. Keputusan ini mengubah segalanya. Koleksi menjadi lebih kohesif, pengetahuan saya semakin mendalam, dan kepuasan setiap pembelian terasa jauh lebih bermakna.' },
      { type: 'quote', text: 'A focused collection tells a story. A scattered collection is just stuff.', author: 'Royyanga' },
      { type: 'h2', text: 'Pembelian yang Paling Berkesan' },
      {
        type: 'ul',
        items: [
          'Super Treasure Hunt Porsche 993 GT2 yang saya temukan di rak ritel setelah 3 jam hunting.',
          'Uang 5 Gulden Belanda 1933 dalam kondisi UNC yang saya dapatkan dari pameran numismatik Jakarta.',
          'Set Tintin die-cast komplit yang saya peroleh langsung dari kolektor veteran di Bandung.'
        ]
      },
      { type: 'note', text: 'Beberapa pembelian terbaik saya tidak pernah saya rencanakan. Mereka hadir ketika saya sudah cukup berpengetahuan untuk mengenali nilainya dalam sekejap.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=1200&q=80&auto=format&fit=crop', caption: 'A decade of collecting — each piece carries a memory and a story of its own.' },
      { type: 'h2', text: 'Pelajaran Paling Berharga' },
      {
        type: 'ol',
        items: [
          'Pengetahuan adalah investasi terbaik sebelum uang. Beli buku, ikuti komunitas, dan terus belajar.',
          'Sabar mengalahkan FOMO. Koleksi terbaik saya sebagian besar datang dari menunggu momen yang tepat.',
          'Komunitas adalah segalanya. Tanpa sesama kolektor, hobi ini akan jauh lebih sepi dan sulit.'
        ]
      },
      { type: 'h2', text: 'Apa Selanjutnya?' },
      { type: 'p', text: 'Setelah 10 tahun, semangat mengoleksi saya justru semakin besar. Royyan Collectibles hadir sebagai cara berbagi pengetahuan dan menyambungkan sesama kolektor di Indonesia. Perjalanan ini baru saja dimulai.' }
    ]
  },
  {
    slug: 'rare-finds-2026',
    title: 'Temuan Langka 2026: Koleksi Die-Cast dan Numismatik yang Mengguncang Pasar',
    excerpt: 'Editor Royyan Collectibles merangkum temuan-temuan koleksi paling mengesankan di tahun 2026 — dari Super Treasure Hunt ultralangka hingga uang kertas kolonial yang muncul kembali ke pasar setelah puluhan tahun.',
    coverImage: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80&auto=format&fit=crop',
    category: 'Featured Stories',
    categorySlug: 'featured',
    isFeatured: true,
    readingTime: '6 Min Read',
    publishedDate: 'Aug 4, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Temuan Langka 2026: Koleksi Die-Cast dan Numismatik yang Mengguncang Pasar' },
      { type: 'p', text: '2026 menjadi tahun yang luar biasa bagi komunitas kolektor Indonesia. Beberapa temuan yang benar-benar tidak terduga muncul ke permukaan, mengejutkan pasar dan menetapkan rekor harga baru yang belum pernah tercapai sebelumnya.' },
      { type: 'h2', text: 'Temuan Die-Cast Terbesar Tahun Ini' },
      { type: 'p', text: 'Sebuah koleksi Hot Wheels Redline Era dalam kondisi Near Mint ditemukan di sebuah garasi lama di Surabaya. Terdiri dari 47 model berbeda termasuk beberapa casting langka yang selama ini hanya dikenal secara online, koleksi ini langsung menarik perhatian komunitas kolektor nasional.' },
      {
        type: 'ul',
        items: [
          'Custom Camaro 1968 dalam warna Python Blue — salah satu warna Spectraflame paling langka.',
          'Deora Original 1968 dengan kondisi ban Redline yang masih sempurna.',
          'Twin Mill 1969 prototype yang belum pernah tercatat dalam database komunitas manapun.'
        ]
      },
      { type: 'h2', text: 'Rekor Numismatik yang Memecahkan Ekspektasi' },
      { type: 'p', text: 'Di sisi numismatik, sebuah uang kertas 10 Rupiah seri Soekarno 1964 dalam kondisi Gem Uncirculated terjual di platform lelang dengan harga yang jauh melampaui estimasi awal. Ini menjadi bukti bahwa pasar koleksi uang kertas Indonesia semakin matang dan diakui.' },
      { type: 'quote', text: 'The rarest finds always come to those who have the patience to wait and the knowledge to recognize them.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Jika Anda menemukan koleksi lama di rumah atau garasi keluarga, jangan terburu-buru menjual. Konsultasikan dulu dengan komunitas atau appraiser terpercaya untuk mengetahui nilai sebenarnya.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80&auto=format&fit=crop', caption: 'Rare discoveries remind us that extraordinary collectibles can still be found in unexpected places.' },
      { type: 'h2', text: 'Prediksi untuk Sisa 2026' },
      { type: 'p', text: 'Dengan semakin berkembangnya komunitas kolektor Indonesia dan meningkatnya akses ke pasar internasional, kami memprediksi akan ada lebih banyak temuan luar biasa yang muncul sebelum akhir tahun. Tetap terhubung dengan Royyan Collectibles untuk mendapatkan update terbaru.' }
    ]
  },
  {
    slug: 'tintin-history',
    title: 'Mengenal Dunia Koleksi Pernak-Pernik dan Die-Cast Tintin',
    excerpt: 'Petualangan Tintin tidak hanya hidup melalui komik legendaris karya Hergé, tetapi juga melalui berbagai merchandise resmi seperti die-cast kendaraan, figur karakter, dan koleksi eksklusif yang menjadi incaran kolektor di seluruh dunia.',
    coverImage: 'https://wallpapercave.com/wp/OVh2Uuu.png',
    category: 'Featured Stories',
    categorySlug: 'featured',
    isFeatured: true,
    readingTime: '5 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Mengenal Dunia Koleksi Pernak-Pernik dan Die-Cast Tintin' },
      { type: 'p', text: 'Petualangan Tintin, karya legendaris Hergé asal Belgia, tidak hanya dikenal melalui komiknya yang mendunia, tetapi juga melalui berbagai merchandise resmi yang menjadi bagian penting dalam dunia koleksi. Salah satu yang paling populer adalah seri die-cast kendaraan yang mereplikasi berbagai kendaraan ikonik yang muncul dalam petualangan Tintin. Koleksi ini menghadirkan detail tinggi, kualitas produksi yang baik, dan menjadi simbol nostalgia bagi para penggemar komik klasik.' },
      { type: 'h2', text: 'Jenis Koleksi Tintin yang Populer' },
      { type: 'p', text: 'Selain album komik, terdapat beragam merchandise resmi yang diproduksi dengan lisensi resmi dan memiliki nilai koleksi tinggi di kalangan penggemar.' },
      { type: 'h3', text: 'Die-Cast Kendaraan Ikonik' },
      {
        type: 'ul',
        items: [
          'Miniatur mobil klasik yang muncul dalam berbagai petualangan Tintin.',
          'Replika pesawat, kapal, dan kendaraan unik dengan detail yang akurat.',
          'Diproduksi dalam berbagai skala oleh produsen resmi berlisensi.'
        ]
      },
      { type: 'h3', text: 'Figur dan Merchandise Resmi' },
      {
        type: 'ol',
        items: [
          'Figur resin dan PVC karakter seperti Tintin, Snowy (Milo), Kapten Haddock, dan Profesor Lakmus.',
          'Poster, buku edisi khusus, hingga replika benda-benda ikonik dari cerita.',
          'Produk koleksi eksklusif yang dirilis dalam jumlah terbatas.'
        ]
      },
      { type: 'quote', text: 'Collecting Tintin is not only about owning memorabilia, but also preserving one of the greatest comic legacies in the world.', author: 'Journal Collectibles' },
      { type: 'h3', text: 'Mengapa Koleksi Tintin Sangat Diminati?' },
      { type: 'p', text: 'Tintin merupakan salah satu karakter komik Eropa paling berpengaruh sepanjang sejarah. Merchandise resminya memiliki daya tarik karena kualitas produksinya yang tinggi, akurasi desain terhadap ilustrasi asli karya Hergé, serta banyaknya edisi terbatas yang nilainya terus meningkat seiring waktu.' },
      { type: 'note', text: 'Produk edisi terbatas yang masih memiliki box asli dan sertifikat keaslian umumnya memiliki nilai koleksi lebih tinggi di pasar kolektor.' },
      { type: 'image', src: 'https://wallpapercave.com/wp/OVh2Uuu.png', caption: 'Official Tintin die-cast and collectible merchandise.' },
      { type: 'h2', text: 'Panduan Memulai Koleksi Tintin' },
      { type: 'p', text: 'Bagi kolektor pemula, memilih produk resmi merupakan langkah terbaik untuk membangun koleksi yang bernilai. Pastikan setiap produk berasal dari lisensi resmi, periksa nomor seri atau sertifikat keaslian apabila tersedia, serta simpan kemasan asli karena kondisi box menjadi salah satu faktor penting dalam menentukan nilai jual sebuah koleksi.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi pernak-pernik dan die-cast Tintin bukan hanya sekadar hobi, tetapi juga bentuk apresiasi terhadap salah satu karya sastra bergambar paling berpengaruh dalam sejarah komik dunia. Dengan perawatan yang baik dan memilih produk resmi, koleksi Tintin dapat menjadi aset koleksi yang bernilai sekaligus menghadirkan kembali semangat petualangan yang telah menginspirasi jutaan pembaca selama hampir satu abad.' }
    ]
  },

  // ─── GUIDE ─────────────────────────────────────────────────────────────────
  {
    slug: 'diecast-care-guide',
    title: 'Panduan Merawat dan Menyimpan Koleksi Die-Cast Agar Tetap Awet',
    excerpt: 'Perawatan dan penyimpanan yang tepat merupakan kunci untuk menjaga kondisi fisik serta nilai koleksi die-cast. Pelajari cara merawat koleksi agar tetap awet dan bernilai dalam jangka panjang.',
    coverImage: 'https://as1.ftcdn.net/v2/jpg/03/10/26/46/1000_F_310264628_bGEtsCw9JLunbwVHQBdpGQyZyjv0xmwO.jpg',
    category: 'Guide',
    categorySlug: 'guide',
    readingTime: '5 Min Read',
    publishedDate: 'Jul 1, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Panduan Merawat dan Menyimpan Koleksi Die-Cast Agar Tetap Awet' },
      { type: 'p', text: 'Memiliki koleksi die-cast yang indah tidak cukup hanya dengan membeli produk berkualitas. Perawatan dan penyimpanan yang tepat sama pentingnya untuk menjaga kondisi fisik, tampilan visual, serta nilai jual koleksi dalam jangka panjang. Dengan beberapa langkah sederhana, koleksi dapat tetap terlihat seperti baru meskipun telah disimpan selama bertahun-tahun.' },
      { type: 'h2', text: 'Faktor Lingkungan yang Perlu Diperhatikan' },
      { type: 'p', text: 'Lingkungan penyimpanan memiliki pengaruh besar terhadap kondisi die-cast maupun kemasannya. Mengontrol kelembapan, suhu, dan paparan cahaya dapat membantu memperpanjang usia koleksi.' },
      {
        type: 'ul',
        items: [
          'Kelembapan: Gunakan silica gel di dalam lemari pajangan untuk membantu mencegah korosi pada bagian logam dan komponen aksial.',
          'Paparan sinar matahari langsung: Hindari sinar UV karena dapat menyebabkan warna cat memudar, terutama pada model dengan finishing khusus seperti Spectraflame.',
          'Suhu ruangan: Simpan koleksi pada suhu yang stabil agar blister plastik dan ban karet tidak cepat mengalami kerusakan.'
        ]
      },
      { type: 'h2', text: 'Cara Membersihkan Die-Cast dengan Aman' },
      { type: 'p', text: 'Membersihkan die-cast secara rutin akan menjaga tampilannya tetap menarik. Namun, proses pembersihan harus dilakukan dengan hati-hati agar tidak merusak detail maupun lapisan cat.' },
      {
        type: 'ol',
        items: [
          'Gunakan kuas berbulu halus untuk mengangkat debu pada bagian-bagian kecil.',
          'Bersihkan menggunakan kain microfiber yang sedikit lembap tanpa bahan kimia keras.',
          'Untuk koleksi Mint on Card (MOC), sebaiknya tetap biarkan dalam kemasan apabila tujuan utamanya adalah investasi.'
        ]
      },
      { type: 'quote', text: 'Proper care today preserves both the beauty and the value of every collectible tomorrow.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Jangan menggunakan cairan pembersih berbahan alkohol atau pelarut kuat karena dapat merusak lapisan cat dan komponen plastik pada die-cast.' },
      { type: 'image', src: 'https://as1.ftcdn.net/v2/jpg/03/10/26/46/1000_F_310264628_bGEtsCw9JLunbwVHQBdpGQyZyjv0xmwO.jpg', caption: 'Proper storage helps preserve the appearance and value of die-cast collections.' },
      { type: 'h2', text: 'Penyimpanan yang Direkomendasikan' },
      { type: 'p', text: 'Gunakan display case dengan pintu tertutup untuk mengurangi paparan debu. Susun koleksi berdasarkan kategori seperti seri, tahun rilis, atau tema agar lebih mudah dipantau kondisinya. Untuk koleksi bernilai tinggi, pertimbangkan penggunaan acrylic case individual sebagai perlindungan tambahan terhadap benturan maupun goresan.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Dengan perawatan yang konsisten dan metode penyimpanan yang tepat, koleksi die-cast tidak hanya akan bertahan lama secara fisik, tetapi juga tetap menarik secara visual serta mempertahankan nilai jualnya di mata sesama kolektor. Merawat koleksi merupakan bagian penting dari hobi yang memberikan manfaat dalam jangka panjang.' }
    ]
  },
  {
    slug: 'starting-your-first-collection',
    title: 'Panduan Lengkap Memulai Koleksi Pertama: Dari Nol Hingga Koleksi Bernilai',
    excerpt: 'Memulai hobi mengoleksi bisa terasa membingungkan di awal. Panduan ini memandu Anda dari menentukan fokus koleksi, anggaran, hingga membangun koleksi pertama yang bernilai dan berkelanjutan.',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
    category: 'Guide',
    categorySlug: 'guide',
    readingTime: '7 Min Read',
    publishedDate: 'Jul 28, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Panduan Lengkap Memulai Koleksi Pertama: Dari Nol Hingga Koleksi Bernilai' },
      { type: 'p', text: 'Banyak orang yang ingin mulai mengoleksi tetapi bingung harus mulai dari mana. Apakah die-cast, komik, uang kuno, atau action figure? Artikel ini hadir untuk membantu Anda membangun fondasi koleksi yang solid sejak hari pertama.' },
      { type: 'h2', text: 'Langkah 1 — Tentukan Fokus Koleksi Anda' },
      { type: 'p', text: 'Kolektor terbaik selalu memiliki fokus yang jelas. Tanpa fokus, Anda akan mudah tergoda membeli semua hal dan akhirnya tidak memiliki koleksi yang kohesif maupun bernilai tinggi.' },
      {
        type: 'ul',
        items: [
          'Pilih tema atau kategori yang benar-benar Anda sukai, bukan sekadar tren pasar.',
          'Pertimbangkan seberapa mudah item tersebut ditemukan di pasar lokal maupun internasional.',
          'Riset komunitas yang ada agar Anda tidak berjalan sendirian.'
        ]
      },
      { type: 'h2', text: 'Langkah 2 — Tetapkan Anggaran Realistis' },
      { type: 'p', text: 'Koleksi adalah hobi jangka panjang. Menetapkan anggaran bulanan yang konsisten jauh lebih baik daripada membelanjakan semua uang sekaligus di awal.' },
      {
        type: 'ol',
        items: [
          'Pisahkan anggaran koleksi dari kebutuhan primer Anda.',
          'Sisihkan dana darurat khusus untuk pembelian edisi terbatas yang tiba-tiba muncul.',
          'Lacak setiap pengeluaran untuk mengetahui ROI koleksi Anda dari waktu ke waktu.'
        ]
      },
      { type: 'quote', text: 'A great collection is not built in a day. It is built over years of patience, knowledge, and passion.', author: 'Journal Collectibles' },
      { type: 'h2', text: 'Langkah 3 — Verifikasi Keaslian Sebelum Membeli' },
      { type: 'p', text: 'Keaslian adalah segalanya dalam dunia koleksi. Satu kesalahan membeli barang palsu bisa merusak kepercayaan diri dan menguras anggaran.' },
      { type: 'note', text: 'Selalu minta dokumentasi, foto detail, dan riwayat kepemilikan sebelum mentransfer uang kepada penjual yang tidak Anda kenal.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop', caption: 'Building a focused collection starts with choosing the right category and setting a clear goal.' },
      { type: 'h2', text: 'Langkah 4 — Bergabung dengan Komunitas' },
      { type: 'p', text: 'Komunitas kolektor adalah aset terbesar Anda. Di sana Anda bisa mendapatkan informasi harga pasar, tips keaslian, info pre-order, hingga jaringan jual-beli terpercaya.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Memulai koleksi pertama Anda adalah perjalanan yang menyenangkan apabila dilakukan dengan perencanaan yang tepat. Fokus pada apa yang Anda cintai, kelola anggaran dengan bijak, dan terus belajar dari komunitas.' }
    ]
  },
  {
    slug: 'display-setup-guide',
    title: 'Cara Membangun Display Koleksi yang Estetik dan Aman di Rumah',
    excerpt: 'Display koleksi yang baik bukan hanya soal keindahan visual. Ada aspek keamanan, pencahayaan, dan tata letak yang perlu diperhatikan agar koleksi tetap aman sekaligus tampil memukau.',
    coverImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop',
    category: 'Guide',
    categorySlug: 'guide',
    readingTime: '6 Min Read',
    publishedDate: 'Aug 1, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Cara Membangun Display Koleksi yang Estetik dan Aman di Rumah' },
      { type: 'p', text: 'Setelah susah payah mengumpulkan koleksi, memajangnya dengan cara yang tepat adalah langkah selanjutnya yang tidak boleh diabaikan. Display yang baik bukan hanya memperindah ruangan, tetapi juga melindungi koleksi dari debu, benturan, dan kerusakan akibat lingkungan.' },
      { type: 'h2', text: 'Memilih Lemari dan Rak yang Tepat' },
      {
        type: 'ul',
        items: [
          'Gunakan lemari kaca dengan pintu berpengunci untuk koleksi bernilai tinggi.',
          'Pastikan rak memiliki kapasitas berat yang memadai terutama untuk koleksi die-cast atau patung berat.',
          'Pilih material yang tidak mudah menguap bahan kimia yang dapat merusak permukaan koleksi.'
        ]
      },
      { type: 'h2', text: 'Pencahayaan yang Ideal' },
      { type: 'p', text: 'Pencahayaan adalah kunci utama dalam menciptakan tampilan display yang dramatis dan premium. Namun pencahayaan yang salah juga bisa merusak koleksi.' },
      {
        type: 'ol',
        items: [
          'Gunakan LED strip dengan warna warm white (3000K) untuk efek premium.',
          'Hindari lampu UV yang dapat memudarkan warna pada resin, plastik, dan komik.',
          'Posisikan cahaya dari atas atau samping untuk menciptakan bayangan dramatis pada figur dan die-cast.'
        ]
      },
      { type: 'quote', text: 'How you display your collection tells the story of who you are as a collector.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Tambahkan silica gel di dalam lemari display tertutup dan ganti setiap 3 bulan untuk menjaga kelembapan tetap stabil.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop', caption: 'A well-lit, organized display case transforms any room into a collector\'s gallery.' },
      { type: 'h2', text: 'Tata Letak dan Estetika' },
      { type: 'p', text: 'Susun koleksi berdasarkan tema, warna, atau skala untuk menciptakan tampilan yang kohesif. Berikan ruang antar item agar setiap piece dapat dinikmati secara individual.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Display yang baik adalah investasi terakhir yang melengkapi perjalanan mengoleksi Anda. Dengan pencahayaan yang tepat, lemari yang sesuai, dan tata letak yang estetik, koleksi Anda akan menjadi kebanggaan yang bisa dinikmati setiap hari.' }
    ]
  },

  // ─── COLLECTING TIPS ───────────────────────────────────────────────────────
  {
    slug: 'hotwheels-treasure-hunt-guide',
    title: 'Cara Membedakan Hot Wheels Treasure Hunt Asli dan Palsu',
    excerpt: 'Treasure Hunt dan Super Treasure Hunt merupakan seri paling dicari oleh kolektor Hot Wheels. Kenali ciri-ciri unit asli agar terhindar dari produk palsu maupun hasil modifikasi yang beredar di pasaran.',
    coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80&auto=format&fit=crop',
    category: 'Collecting Tips',
    categorySlug: 'tips',
    readingTime: '5 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Cara Membedakan Hot Wheels Treasure Hunt Asli dan Palsu' },
      { type: 'p', text: 'Bagi para kolektor Hot Wheels, seri Treasure Hunt (TH) dan Super Treasure Hunt (STH) selalu menjadi buruan utama. Kelangkaan, detail eksklusif, dan jumlah produksi yang terbatas membuat kedua seri ini memiliki nilai jual jauh lebih tinggi dibandingkan produk reguler. Namun tingginya permintaan juga memunculkan produk palsu maupun hasil modifikasi yang mengaku sebagai Treasure Hunt asli.' },
      { type: 'h2', text: 'Ciri-Ciri Treasure Hunt Asli' },
      { type: 'p', text: 'Sebelum membeli, pastikan Anda memeriksa beberapa karakteristik penting yang menjadi pembeda antara Treasure Hunt asli dan produk tiruan.' },
      { type: 'ul', items: ['Simbol resmi dicetak permanen pada bodi mobil, bukan berupa stiker tempel.', 'Sebagian besar Super Treasure Hunt menggunakan ban Real Riders dengan pelek premium.', 'Kemasan asli mencantumkan identitas seri, nomor casting, dan tahun rilis yang dapat dicocokkan dengan referensi resmi.', 'Finishing Spectraflame menjadi salah satu ciri khas yang sulit ditiru produk palsu.'] },
      { type: 'h2', text: 'Tips Praktis Sebelum Membeli' },
      { type: 'ol', items: ['Bandingkan foto produk dengan referensi dari komunitas atau database resmi Hot Wheels.', 'Periksa berat, tekstur bodi, dan kualitas finishing karena produk palsu sering menggunakan material yang berbeda.', 'Belilah dari penjual yang memiliki reputasi baik dan riwayat transaksi yang jelas.', 'Waspadai harga yang jauh di bawah harga pasar karena dapat menjadi indikasi produk tidak orisinal.'] },
      { type: 'quote', text: 'The smallest details often separate a genuine collectible from an imitation.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Jangan hanya berpatokan pada logo Treasure Hunt. Selalu periksa detail casting, kemasan, roda, dan finishing sebelum memutuskan membeli.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80&auto=format&fit=crop', caption: 'Authentic Treasure Hunt models feature unique details that distinguish them from regular releases.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Ketelitian dalam memeriksa detail-detail kecil akan membantu kolektor menghindari produk palsu maupun hasil modifikasi yang menyesatkan. Dengan memahami ciri-ciri Treasure Hunt asli serta membeli dari sumber terpercaya, Anda dapat membangun koleksi Hot Wheels yang autentik dan memiliki nilai koleksi yang tetap terjaga seiring waktu.' }
    ]
  },
  {
    slug: 'budgeting-for-collectors',
    title: 'Strategi Anggaran Cerdas untuk Kolektor: Tetap Konsisten Tanpa Boncos',
    excerpt: 'Salah satu tantangan terbesar kolektor adalah mengelola anggaran. Temukan strategi praktis agar hobi koleksi Anda tetap menyenangkan, konsisten, dan tidak menguras kantong.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80&auto=format&fit=crop',
    category: 'Collecting Tips',
    categorySlug: 'tips',
    readingTime: '5 Min Read',
    publishedDate: 'Jul 25, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Strategi Anggaran Cerdas untuk Kolektor: Tetap Konsisten Tanpa Boncos' },
      { type: 'p', text: 'Mengoleksi adalah hobi yang bisa sangat menguras kantong jika tidak dikelola dengan baik. Banyak kolektor pemula yang semangat di awal tetapi menyerah di tengah jalan karena anggaran yang tidak terkontrol. Berikut adalah strategi yang terbukti membantu kolektor tetap konsisten tanpa kehilangan kesenangan.' },
      { type: 'h2', text: 'Sistem Alokasi Tiga Keranjang' },
      { type: 'p', text: 'Strategi ini membagi anggaran koleksi bulanan Anda ke dalam tiga kategori dengan proporsi yang jelas.' },
      {
        type: 'ol',
        items: [
          '60% untuk pembelian rutin — item yang sudah ada dalam watchlist Anda.',
          '30% untuk tabungan koleksi — ditujukan untuk edisi terbatas atau item bernilai tinggi.',
          '10% untuk pengetahuan — buku referensi, komunitas premium, atau acara kolektor.'
        ]
      },
      { type: 'h2', text: 'Hindari FOMO (Fear of Missing Out)' },
      {
        type: 'ul',
        items: [
          'Buat daftar prioritas koleksi dan patuhi daftar tersebut saat berbelanja.',
          'Tunggu setidaknya 24 jam sebelum memutuskan membeli item yang tidak ada dalam rencana.',
          'Ingat bahwa selalu ada item koleksi berikutnya — tidak semua harus dimiliki.'
        ]
      },
      { type: 'quote', text: 'The best collection is the one you can afford to keep forever, not the one you buy in a moment of impulse.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Catat setiap pembelian dalam spreadsheet sederhana. Melihat total pengeluaran secara visual adalah cara terbaik untuk tetap disiplin.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80&auto=format&fit=crop', caption: 'Smart budgeting keeps the joy of collecting alive without the financial stress.' },
      { type: 'h2', text: 'Monetisasi Koleksi yang Tidak Lagi Relevan' },
      { type: 'p', text: 'Jual koleksi yang tidak lagi sejalan dengan fokus Anda. Hasil penjualan bisa dialokasikan kembali untuk item yang lebih relevan dengan arah koleksi saat ini.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengelola anggaran koleksi adalah keterampilan yang bisa dipelajari. Dengan sistem yang konsisten dan disiplin yang kuat, hobi ini tidak hanya tetap menyenangkan tetapi juga bisa menjadi investasi jangka panjang yang menguntungkan.' }
    ]
  },
  {
    slug: 'spotting-fakes-banknotes',
    title: 'Tips Mengenali Uang Kertas Kuno Asli vs Replika: Panduan Kolektor Numismatik',
    excerpt: 'Uang kertas kuno adalah salah satu koleksi yang paling sering dipalsukan. Pelajari cara membedakan uang asli dari replika menggunakan teknik pemeriksaan visual dan fisik yang digunakan para numismatis profesional.',
    coverImage: 'https://images.unsplash.com/photo-1554672408-730436b60dde?w=1200&q=80&auto=format&fit=crop',
    category: 'Collecting Tips',
    categorySlug: 'tips',
    readingTime: '6 Min Read',
    publishedDate: 'Aug 2, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Tips Mengenali Uang Kertas Kuno Asli vs Replika: Panduan Kolektor Numismatik' },
      { type: 'p', text: 'Pasar uang kertas kuno adalah salah satu segmen koleksi yang paling rentan terhadap pemalsuan. Dari uang Belanda era kolonial hingga seri Soekarno, banyak replika beredar dengan kualitas cetak yang semakin canggih. Panduan ini akan membantu Anda mengidentifikasi keaslian uang kertas kuno menggunakan teknik yang digunakan para profesional.' },
      { type: 'h2', text: 'Pemeriksaan Kertas (Substrat)' },
      {
        type: 'ul',
        items: [
          'Uang asli menggunakan kertas berbahan serat kapas yang terasa berbeda dari kertas biasa — lebih kaku namun fleksibel.',
          'Periksa ketebalan kertas. Replika sering menggunakan kertas yang terlalu tipis atau terlalu tebal.',
          'Cek watermark dengan menerawang kertas terhadap cahaya. Watermark asli menyatu dengan serat kertas, bukan dicetak di atasnya.'
        ]
      },
      { type: 'h2', text: 'Pemeriksaan Detail Cetak' },
      {
        type: 'ol',
        items: [
          'Gunakan kaca pembesar untuk memeriksa presisi garis-garis halus pada desain.',
          'Warna asli memiliki gradasi yang sangat halus — sulit direproduksi dengan printer biasa.',
          'Perhatikan nomor seri: font, jarak antar karakter, dan ketebalan tinta harus konsisten.'
        ]
      },
      { type: 'quote', text: 'In numismatics, knowledge is your most valuable tool for authentication.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Untuk uang kuno bernilai sangat tinggi, pertimbangkan sertifikasi dari lembaga grading terpercaya seperti PMG (Paper Money Guaranty) sebelum membeli.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1554672408-730436b60dde?w=1200&q=80&auto=format&fit=crop', caption: 'Careful examination under magnification reveals the authenticity markers of vintage banknotes.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi uang kertas kuno membutuhkan pengetahuan yang mendalam mengenai teknik cetak, material kertas, dan karakteristik historis setiap seri. Dengan membangun pengetahuan ini secara bertahap dan selalu membeli dari sumber terpercaya, koleksi numismatik Anda akan semakin bernilai dari waktu ke waktu.' }
    ]
  },

  // ─── HISTORY ───────────────────────────────────────────────────────────────
  {
    slug: 'history-of-tintin-universe',
    title: 'Mengenal Sejarah dan Semesta Cerita Tintin, Karya Klasik yang Melahirkan Ribuan Kolektor',
    excerpt: 'Sebelum menjadi salah satu franchise merchandise dan die-cast paling dicari di dunia, Tintin lahir sebagai karya komik legendaris Hergé yang telah menginspirasi jutaan pembaca sekaligus melahirkan komunitas kolektor lintas generasi.',
    coverImage: 'https://cdn.dribbble.com/userupload/15962267/file/original-e316ac34bae569369d0482f11ca51688.jpg?crop=0x0-3201x2401&resize=1600x1200',
    category: 'History',
    categorySlug: 'history',
    readingTime: '6 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Mengenal Sejarah dan Semesta Cerita Tintin, Karya Klasik yang Melahirkan Ribuan Kolektor' },
      { type: 'p', text: 'Sebelum menjadi salah satu franchise merchandise dan koleksi die-cast paling dicari di dunia, Tintin lahir sebagai karya komik ciptaan Hergé (Georges Remi), kartunis asal Belgia, yang pertama kali diterbitkan pada akhir tahun 1920-an. Hingga kini, kisah petualangan Tintin terus menginspirasi pembaca sekaligus menjadi fondasi lahirnya berbagai produk koleksi resmi yang diminati di seluruh dunia.' },
      { type: 'h2', text: 'Perjalanan Tintin sebagai Karya Komik' },
      { type: 'p', text: 'Tintin dikenal sebagai seorang jurnalis muda yang menjelajahi berbagai belahan dunia bersama anjing setianya, Snowy (Milo). Dalam setiap petualangannya, ia ditemani karakter-karakter ikonik seperti Kapten Haddock, Profesor Lakmus, dan Dupond & Dupont.' },
      { type: 'h2', text: 'Mengapa Latar Belakang Cerita Penting bagi Kolektor?' },
      { type: 'ul', items: ['Konteks edisi: Beberapa judul memiliki lebih dari satu versi ilustrasi sehingga cetakan awal sering memiliki nilai historis yang lebih tinggi.', 'Karakter dan kendaraan ikonik menjadi inspirasi utama bagi produsen resmi saat membuat die-cast dan figur koleksi.', 'Nilai edukatif dan nostalgia: Merchandise Tintin tidak hanya menjadi benda koleksi, tetapi juga menghadirkan kembali kenangan terhadap kisah-kisah petualangan klasik.'] },
      { type: 'quote', text: 'Every Tintin collectible carries a story that began long before it became a collectible.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Beberapa merchandise resmi dibuat berdasarkan adegan atau kendaraan yang hanya muncul dalam judul tertentu, sehingga memahami alur cerita dapat membantu mengenali asal-usul sebuah koleksi.' },
      { type: 'image', src: 'https://cdn.dribbble.com/userupload/15962267/file/original-e316ac34bae569369d0482f11ca51688.jpg?crop=0x0-3201x2401&resize=1600x1200', caption: 'The timeless adventures of Tintin continue to inspire collectors around the world.' },
      { type: 'h2', text: 'Tips bagi Kolektor yang Ingin Memperdalam Wawasan' },
      { type: 'ol', items: ['Pelajari urutan rilis album komik Tintin agar memahami konteks setiap merchandise.', 'Ikuti sumber resmi dan komunitas penggemar untuk memperoleh informasi mengenai edisi dan tahun cetak.', 'Bandingkan ilustrasi pada kemasan produk dengan panel komik aslinya untuk membantu memverifikasi kesesuaian tema koleksi.'] },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Memahami sejarah dan semesta cerita Tintin memberikan nilai apresiasi yang lebih mendalam terhadap setiap koleksi. Setiap merchandise bukan hanya sekadar pajangan, melainkan representasi dari salah satu karya sastra bergambar paling berpengaruh yang terus dikenang.' }
    ]
  },
  {
    slug: 'indonesian-classic-diecast',
    title: 'Mobil Klasik Indonesia yang Menjadi Incaran Kolektor Die-Cast',
    excerpt: 'Replika mobil klasik Indonesia menawarkan nilai nostalgia dan sejarah yang unik. Dari Bemo hingga Toyota Kijang generasi awal, model-model ini menjadi incaran kolektor karena kelangkaan dan nilai budayanya.',
    coverImage: 'https://i.pinimg.com/vwebp/1200x/9b/80/e7/9b80e79cd4ff7649eeea907bcc0e77c2.webp',
    category: 'History',
    categorySlug: 'history',
    readingTime: '5 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Mobil Klasik Indonesia yang Menjadi Incaran Kolektor Die-Cast' },
      { type: 'p', text: 'Selain Hot Wheels dan berbagai merek internasional lainnya, dunia koleksi Indonesia memiliki daya tarik tersendiri melalui replika mobil-mobil klasik yang pernah menjadi bagian dari sejarah transportasi nasional. Model-model ini tidak hanya menghadirkan nostalgia, tetapi juga memiliki nilai historis yang menjadikannya incaran para kolektor die-cast.' },
      { type: 'h2', text: 'Ikon Transportasi yang Sering Direplikakan' },
      {
        type: 'ul',
        items: [
          'Bemo, kendaraan roda tiga yang menjadi ikon transportasi umum Jakarta pada era 1960–1970-an.',
          'Oplet, angkutan umum klasik yang identik dengan kehidupan perkotaan Indonesia.',
          'Toyota Kijang generasi awal, kendaraan keluarga legendaris yang banyak dirilis sebagai die-cast edisi terbatas.'
        ]
      },
      { type: 'h2', text: 'Mengapa Mobil Klasik Indonesia Bernilai bagi Kolektor?' },
      {
        type: 'ol',
        items: [
          'Kelangkaan produksi karena umumnya dibuat dalam jumlah terbatas oleh produsen independen.',
          'Nilai historis dan budaya yang merepresentasikan perjalanan transportasi Indonesia.',
          'Komunitas kolektor yang lebih eksklusif sehingga pertukaran informasi dan transaksi lebih terarah.'
        ]
      },
      { type: 'quote', text: 'Every miniature tells the story of a nation\'s journey through its roads and its people.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Replika mobil klasik Indonesia yang masih lengkap dengan kemasan asli dan sertifikat keaslian umumnya memiliki nilai koleksi yang lebih tinggi.' },
      { type: 'image', src: 'https://i.pinimg.com/vwebp/1200x/9b/80/e7/9b80e79cd4ff7649eeea907bcc0e77c2.webp', caption: 'Classic Indonesian vehicles have become unique and highly sought-after die-cast collectibles.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi replika mobil klasik Indonesia bukan sekadar memiliki miniatur kendaraan. Hobi ini juga menjadi bentuk apresiasi terhadap sejarah transportasi Indonesia sekaligus cara melestarikan warisan otomotif nasional.' }
    ]
  },
  {
    slug: 'indonesian-classic-comics-history',
    title: 'Menelusuri Jejak Komik Klasik Indonesia yang Menjadi Incaran Kolektor',
    excerpt: 'Komik klasik Indonesia menyimpan nilai sejarah, budaya, dan nostalgia yang tinggi. Dari kisah wayang hingga silat, karya-karya legendaris ini terus menjadi incaran para kolektor di seluruh Indonesia.',
    coverImage: 'https://cdn.antaranews.com/cache/1200x800/2017/03/20170329P_20170329_124620_1.jpg.webp',
    category: 'History',
    categorySlug: 'history',
    readingTime: '6 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Menelusuri Jejak Komik Klasik Indonesia yang Menjadi Incaran Kolektor' },
      { type: 'p', text: 'Sebelum era komik digital dan novel grafis modern, Indonesia pernah mengalami masa keemasan komik cetak yang melahirkan banyak karya legendaris. Bagi para kolektor buku dan memorabilia, komik-komik klasik Indonesia tidak hanya memiliki nilai nostalgia, tetapi juga menjadi bagian penting dari sejarah literasi visual dan perkembangan industri kreatif nasional.' },
      { type: 'h2', text: 'Era Keemasan Komik Indonesia' },
      { type: 'p', text: 'Pada periode sekitar tahun 1950-an hingga 1980-an, industri komik Indonesia berkembang pesat dengan hadirnya berbagai genre, mulai dari cerita wayang, silat, petualangan, hingga superhero lokal.' },
      { type: 'ul', items: ['Cerita wayang yang mengadaptasi kisah Mahabharata dan Ramayana dalam gaya ilustrasi khas Indonesia.', 'Komik silat dengan tokoh-tokoh pendekar Nusantara yang menjadi ikon pada masanya.', 'Karya-karya ilustrator lokal yang membentuk identitas visual komik Indonesia sebelum era modern.'] },
      { type: 'h2', text: 'Mengapa Komik Klasik Indonesia Layak Dikoleksi?' },
      { type: 'ol', items: ['Kelangkaan fisik karena banyak cetakan asli sudah tidak diproduksi ulang.', 'Gaya ilustrasi khas yang mencerminkan perkembangan seni gambar Indonesia pada zamannya.', 'Nilai budaya lokal yang mengangkat legenda, cerita rakyat, dan nilai-nilai tradisional Indonesia.'] },
      { type: 'quote', text: 'Classic comics preserve not only stories, but also the artistic and cultural identity of their era.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Komik dengan cetakan pertama, kondisi lengkap, dan sampul asli umumnya memiliki nilai koleksi yang lebih tinggi dibandingkan cetakan ulang.' },
      { type: 'image', src: 'https://cdn.antaranews.com/cache/1200x800/2017/03/20170329P_20170329_124620_1.jpg.webp', caption: 'Classic Indonesian comics remain an important part of the nation\'s literary and artistic heritage.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi komik klasik Indonesia bukan sekadar mengumpulkan buku lama, tetapi juga menjadi cara melestarikan sejarah literasi visual bangsa.' }
    ]
  },
  {
    slug: 'history-of-hot-wheels',
    title: 'Sejarah Hot Wheels: Dari Mainan Anak-Anak Hingga Koleksi Bernilai Jutaan Dolar',
    excerpt: 'Sejak pertama kali diluncurkan oleh Mattel pada tahun 1968, Hot Wheels telah berevolusi dari mainan jalanan menjadi salah satu koleksi die-cast paling bergengsi di dunia dengan komunitas kolektor yang tersebar di lebih dari 150 negara.',
    coverImage: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&q=80&auto=format&fit=crop',
    category: 'History',
    categorySlug: 'history',
    readingTime: '7 Min Read',
    publishedDate: 'Jul 30, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Sejarah Hot Wheels: Dari Mainan Anak-Anak Hingga Koleksi Bernilai Jutaan Dolar' },
      { type: 'p', text: 'Pada tahun 1968, Elliot Handler, salah satu pendiri Mattel, memiliki visi sederhana: membuat mobil-mobilan yang lebih cepat dan lebih keren dari produk yang ada di pasar. Lahirlah Hot Wheels, sebuah lini mainan yang tidak pernah terbayangkan sebelumnya akan menjadi fenomena global dan koleksi bernilai miliaran dolar.' },
      { type: 'h2', text: 'Era Awal: 1968–1977 (The Redline Era)' },
      { type: 'p', text: 'Generasi pertama Hot Wheels, yang dikenal dengan sebutan Redlines karena garis merah pada ban-bannya, menjadi yang paling dicari kolektor hingga hari ini. Casting-casting dari era ini diproduksi dengan logam berkualitas tinggi dan warna Spectraflame yang sangat khas.' },
      {
        type: 'ul',
        items: [
          'Custom Camaro (1968) menjadi salah satu mobil pertama yang dirilis dan kini bernilai ribuan dolar.',
          'Warna Spectraflame yang mengkilap menjadi ciri khas Redline Era yang tidak pernah berhasil direproduksi sempurna.',
          'Original Sixteen — 16 model peluncuran pertama Hot Wheels yang kini sangat langka.'
        ]
      },
      { type: 'h2', text: 'Evolusi Menuju Koleksi Premium' },
      { type: 'p', text: 'Memasuki tahun 1990-an, Hot Wheels mulai mengembangkan lini khusus untuk kolektor dewasa. Peluncuran seri Treasure Hunt pada 1995 menjadi titik balik yang mengubah Hot Wheels dari sekadar mainan menjadi objek investasi.' },
      { type: 'quote', text: 'What began as a toy for children became a passion for millions of adults who never grew up.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Beberapa casting Redline Era dalam kondisi sempurna dengan warna langka pernah terjual seharga lebih dari $150.000 USD di lelang internasional.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&q=80&auto=format&fit=crop', caption: 'From humble toy cars to prized collector items, Hot Wheels has defined die-cast culture for over 55 years.' },
      { type: 'h2', text: 'Hot Wheels di Indonesia' },
      { type: 'p', text: 'Komunitas kolektor Hot Wheels Indonesia tumbuh pesat sejak era 2000-an. Kini Indonesia memiliki salah satu komunitas kolektor die-cast terbesar di Asia Tenggara dengan ribuan anggota aktif dan puluhan event tahunan.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Perjalanan Hot Wheels dari mainan anak-anak sederhana menjadi koleksi premium bernilai miliaran dolar adalah bukti bahwa passion dan kualitas selalu menemukan jalannya sendiri. Setiap die-cast Hot Wheels menyimpan sepotong sejarah yang layak untuk diwariskan.' }
    ]
  }
];