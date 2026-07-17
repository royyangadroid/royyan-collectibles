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
  readingTime: string;
  publishedDate: string;
  author: string;
  content: ContentBlock[];
}

export const DUMMY_ARTICLES: Article[] = [
  {
    slug: 'tintin-history',
    title: 'Mengenal Dunia Koleksi Pernak-Pernik dan Die-Cast Tintin',
    excerpt: 'Petualangan Tintin tidak hanya hidup melalui komik legendaris karya Hergé, tetapi juga melalui berbagai merchandise resmi seperti die-cast kendaraan, figur karakter, dan koleksi eksklusif yang menjadi incaran kolektor di seluruh dunia.',
    coverImage: 'https://wallpapercave.com/wp/OVh2Uuu.png',
    category: 'Collectibles',
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
  {
    slug: 'diecast-care-guide',
    title: 'Panduan Merawat dan Menyimpan Koleksi Die-Cast Agar Tetap Awet',
    excerpt: 'Perawatan dan penyimpanan yang tepat merupakan kunci untuk menjaga kondisi fisik serta nilai koleksi die-cast. Pelajari cara merawat koleksi agar tetap awet dan bernilai dalam jangka panjang.',
    coverImage: 'https://as1.ftcdn.net/v2/jpg/03/10/26/46/1000_F_310264628_bGEtsCw9JLunbwVHQBdpGQyZyjv0xmwO.jpg',
    category: 'Collecting Guide',
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
    slug: 'history-of-tintin-universe',
    title: 'Mengenal Sejarah dan Semesta Cerita Tintin, Karya Klasik yang Melahirkan Ribuan Kolektor',
    excerpt: 'Sebelum menjadi salah satu franchise merchandise dan die-cast paling dicari di dunia, Tintin lahir sebagai karya komik legendaris Hergé yang telah menginspirasi jutaan pembaca sekaligus melahirkan komunitas kolektor lintas generasi.',
    coverImage: 'https://cdn.dribbble.com/userupload/15962267/file/original-e316ac34bae569369d0482f11ca51688.jpg?crop=0x0-3201x2401&resize=1600x1200',
    category: 'History',
    readingTime: '6 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Mengenal Sejarah dan Semesta Cerita Tintin, Karya Klasik yang Melahirkan Ribuan Kolektor' },
      { type: 'p', text: 'Sebelum menjadi salah satu franchise merchandise dan koleksi die-cast paling dicari di dunia, Tintin lahir sebagai karya komik ciptaan Hergé (Georges Remi), kartunis asal Belgia, yang pertama kali diterbitkan pada akhir tahun 1920-an. Hingga kini, kisah petualangan Tintin terus menginspirasi pembaca sekaligus menjadi fondasi lahirnya berbagai produk koleksi resmi yang diminati di seluruh dunia.' },
      { type: 'h2', text: 'Perjalanan Tintin sebagai Karya Komik' },
      { type: 'p', text: 'Tintin dikenal sebagai seorang jurnalis muda yang menjelajahi berbagai belahan dunia bersama anjing setianya, Snowy (Milo). Dalam setiap petualangannya, ia ditemani karakter-karakter ikonik seperti Kapten Haddock, Profesor Lakmus, dan Dupond & Dupont. Cerita-cerita tersebut membawa pembaca ke berbagai latar geografis, mulai dari Tiongkok, Amerika Selatan, Timur Tengah, hingga eksplorasi luar angkasa yang sangat visioner untuk zamannya.' },
      { type: 'h2', text: 'Mengapa Latar Belakang Cerita Penting bagi Kolektor?' },
      { type: 'ul', items: ['Konteks edisi: Beberapa judul memiliki lebih dari satu versi ilustrasi sehingga cetakan awal sering memiliki nilai historis yang lebih tinggi.', 'Karakter dan kendaraan ikonik: Kendaraan, pesawat, kapal, dan berbagai objek dalam komik menjadi inspirasi utama bagi produsen resmi saat membuat die-cast dan figur koleksi.', 'Nilai edukatif dan nostalgia: Merchandise Tintin tidak hanya menjadi benda koleksi, tetapi juga menghadirkan kembali kenangan terhadap kisah-kisah petualangan klasik yang telah dinikmati selama puluhan tahun.'] },
      { type: 'quote', text: 'Every Tintin collectible carries a story that began long before it became a collectible.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Beberapa merchandise resmi dibuat berdasarkan adegan atau kendaraan yang hanya muncul dalam judul tertentu, sehingga memahami alur cerita dapat membantu mengenali asal-usul sebuah koleksi.' },
      { type: 'image', src: 'https://cdn.dribbble.com/userupload/15962267/file/original-e316ac34bae569369d0482f11ca51688.jpg?crop=0x0-3201x2401&resize=1600x1200', caption: 'The timeless adventures of Tintin continue to inspire collectors around the world.' },
      { type: 'h2', text: 'Tips bagi Kolektor yang Ingin Memperdalam Wawasan' },
      { type: 'ol', items: ['Pelajari urutan rilis album komik Tintin agar memahami konteks setiap merchandise.', 'Ikuti sumber resmi dan komunitas penggemar untuk memperoleh informasi mengenai edisi dan tahun cetak.', 'Bandingkan ilustrasi pada kemasan produk dengan panel komik aslinya untuk membantu memverifikasi kesesuaian tema koleksi.'] },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Memahami sejarah dan semesta cerita Tintin memberikan nilai apresiasi yang lebih mendalam terhadap setiap koleksi. Setiap merchandise bukan hanya sekadar pajangan, melainkan representasi dari salah satu karya sastra bergambar paling berpengaruh yang terus dikenang dan diwariskan dari generasi ke generasi.' }
    ]
  },
  {
    slug: 'hotwheels-treasure-hunt-guide',
    title: 'Cara Membedakan Hot Wheels Treasure Hunt Asli dan Palsu',
    excerpt: 'Treasure Hunt dan Super Treasure Hunt merupakan seri paling dicari oleh kolektor Hot Wheels. Kenali ciri-ciri unit asli agar terhindar dari produk palsu maupun hasil modifikasi yang beredar di pasaran.',
    coverImage: 'https://plus.unsplash.com/premium_photo-1736291279761-e7b402ffc1ce?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D',
    category: 'Collecting Guide',
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
      { type: 'image', src: 'https://plus.unsplash.com/premium_photo-1736291279761-e7b402ffc1ce?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D', caption: 'Authentic Treasure Hunt models feature unique details that distinguish them from regular releases.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Ketelitian dalam memeriksa detail-detail kecil akan membantu kolektor menghindari produk palsu maupun hasil modifikasi yang menyesatkan. Dengan memahami ciri-ciri Treasure Hunt asli serta membeli dari sumber terpercaya, Anda dapat membangun koleksi Hot Wheels yang autentik dan memiliki nilai koleksi yang tetap terjaga seiring waktu.' }
    ]
  },
  {
    slug: 'indonesian-classic-diecast',
    title: 'Mobil Klasik Indonesia yang Menjadi Incaran Kolektor Die-Cast',
    excerpt: 'Replika mobil klasik Indonesia menawarkan nilai nostalgia dan sejarah yang unik. Dari Bemo hingga Toyota Kijang generasi awal, model-model ini menjadi incaran kolektor karena kelangkaan dan nilai budayanya.',
    coverImage: 'https://scontent-cgk2-1.xx.fbcdn.net/v/t39.30808-6/307463811_428135496083182_8976639038396682291_n.jpg?stp=dst-jpg_tt6&cstp=mx780x520&ctp=s780x520&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=_LFDWy5NNIIQ7kNvwFmrvJ_&_nc_oc=Adq3a35sngo59FKFFyDHiZaxr0CmEMpKhBFv6jTM0fZ58p9PQoQJ_KG3hrQJj3BZVpI&_nc_zt=23&_nc_ht=scontent-cgk2-1.xx&_nc_gid=Y0sV0GP6oKdqrrXvXu6JnA&_nc_ss=7b289&oh=00_AQAtd_K4WDrDHMnvDu0E_yhSGhP8YkHegbNJAJqflIDupw&oe=6A5FA290',
    category: 'Collecting Guide',
    readingTime: '5 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Mobil Klasik Indonesia yang Menjadi Incaran Kolektor Die-Cast' },
      { type: 'p', text: 'Selain Hot Wheels dan berbagai merek internasional lainnya, dunia koleksi Indonesia memiliki daya tarik tersendiri melalui replika mobil-mobil klasik yang pernah menjadi bagian dari sejarah transportasi nasional. Model-model ini tidak hanya menghadirkan nostalgia, tetapi juga memiliki nilai historis yang menjadikannya incaran para kolektor die-cast.' },
      { type: 'h2', text: 'Ikon Transportasi yang Sering Direplikakan' },
      { type: 'p', text: 'Beberapa kendaraan legendaris Indonesia telah diabadikan dalam bentuk miniatur oleh produsen lokal maupun independen. Replika ini menjadi simbol perkembangan transportasi Indonesia dari masa ke masa.' },
      {
        type: 'ul',
        items: [
          'Bemo, kendaraan roda tiga yang menjadi ikon transportasi umum Jakarta pada era 1960–1970-an.',
          'Oplet, angkutan umum klasik yang identik dengan kehidupan perkotaan Indonesia sebelum hadirnya angkot modern.',
          'Toyota Kijang generasi awal, kendaraan keluarga legendaris yang banyak dirilis sebagai die-cast edisi terbatas.'
        ]
      },
      { type: 'h2', text: 'Mengapa Mobil Klasik Indonesia Bernilai bagi Kolektor?' },
      { type: 'p', text: 'Replika mobil klasik Indonesia memiliki daya tarik yang berbeda dibandingkan die-cast produksi massal. Selain jumlah produksinya yang terbatas, setiap model juga menyimpan cerita mengenai perkembangan transportasi dan budaya masyarakat Indonesia.' },
      {
        type: 'ol',
        items: [
          'Kelangkaan produksi karena umumnya dibuat dalam jumlah terbatas oleh produsen independen atau hasil kolaborasi komunitas.',
          'Nilai historis dan budaya yang merepresentasikan perjalanan transportasi Indonesia.',
          'Komunitas kolektor yang lebih eksklusif sehingga pertukaran informasi dan transaksi lebih terarah.'
        ]
      },
      { type: 'quote', text: 'Every miniature tells the story of a nation’s journey through its roads and its people.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Replika mobil klasik Indonesia yang masih lengkap dengan kemasan asli dan sertifikat keaslian umumnya memiliki nilai koleksi yang lebih tinggi.' },
      { type: 'image', src: 'https://scontent-cgk2-1.xx.fbcdn.net/v/t39.30808-6/307463811_428135496083182_8976639038396682291_n.jpg?stp=dst-jpg_tt6&cstp=mx780x520&ctp=s780x520&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=_LFDWy5NNIIQ7kNvwFmrvJ_&_nc_oc=Adq3a35sngo59FKFFyDHiZaxr0CmEMpKhBFv6jTM0fZ58p9PQoQJ_KG3hrQJj3BZVpI&_nc_zt=23&_nc_ht=scontent-cgk2-1.xx&_nc_gid=Y0sV0GP6oKdqrrXvXu6JnA&_nc_ss=7b289&oh=00_AQAtd_K4WDrDHMnvDu0E_yhSGhP8YkHegbNJAJqflIDupw&oe=6A5FA290', caption: 'Classic Indonesian vehicles have become unique and highly sought-after die-cast collectibles.' },
      { type: 'h2', text: 'Tips bagi Kolektor Pemula' },
      { type: 'p', text: 'Jika Anda ingin mulai mengoleksi replika mobil klasik Indonesia, bergabunglah dengan komunitas kolektor lokal untuk memperoleh informasi mengenai rilisan terbaru sekaligus memverifikasi keaslian produk. Perhatikan detail cetakan, proporsi bodi, dan kualitas finishing karena setiap produsen independen memiliki standar produksi yang berbeda. Selain itu, simpan dokumentasi pembelian sebagai bukti keaslian, terutama untuk produk edisi terbatas.' },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi replika mobil klasik Indonesia bukan sekadar memiliki miniatur kendaraan. Hobi ini juga menjadi bentuk apresiasi terhadap sejarah transportasi Indonesia sekaligus cara melestarikan warisan otomotif nasional. Dengan memilih produk berkualitas dan merawatnya dengan baik, koleksi tersebut dapat menjadi kebanggaan sekaligus memiliki nilai koleksi yang terus berkembang seiring waktu.' }
    ]
  },
  {
    slug: 'indonesian-classic-comics-history',
    title: 'Menelusuri Jejak Komik Klasik Indonesia yang Menjadi Incaran Kolektor',
    excerpt: 'Komik klasik Indonesia menyimpan nilai sejarah, budaya, dan nostalgia yang tinggi. Dari kisah wayang hingga silat, karya-karya legendaris ini terus menjadi incaran para kolektor di seluruh Indonesia.',
    coverImage: 'https://cdn.antaranews.com/cache/1200x800/2017/03/20170329P_20170329_124620_1.jpg.webp',
    category: 'History',
    readingTime: '6 Min Read',
    publishedDate: 'Jul 17, 2026',
    author: 'Royyanga',
    content: [
      { type: 'h1', text: 'Menelusuri Jejak Komik Klasik Indonesia yang Menjadi Incaran Kolektor' },
      { type: 'p', text: 'Sebelum era komik digital dan novel grafis modern, Indonesia pernah mengalami masa keemasan komik cetak yang melahirkan banyak karya legendaris. Bagi para kolektor buku dan memorabilia, komik-komik klasik Indonesia tidak hanya memiliki nilai nostalgia, tetapi juga menjadi bagian penting dari sejarah literasi visual dan perkembangan industri kreatif nasional.' },
      { type: 'h2', text: 'Era Keemasan Komik Indonesia' },
      { type: 'p', text: 'Pada periode sekitar tahun 1950-an hingga 1980-an, industri komik Indonesia berkembang pesat dengan hadirnya berbagai genre, mulai dari cerita wayang, silat, petualangan, hingga superhero lokal. Banyak karya pada masa tersebut terinspirasi oleh budaya Nusantara dan menjadi bacaan favorit lintas generasi.' },
      { type: 'ul', items: ['Cerita wayang yang mengadaptasi kisah Mahabharata dan Ramayana dalam gaya ilustrasi khas Indonesia.', 'Komik silat dengan tokoh-tokoh pendekar Nusantara yang menjadi ikon pada masanya.', 'Karya-karya ilustrator lokal yang membentuk identitas visual komik Indonesia sebelum era modern.'] },
      { type: 'h2', text: 'Mengapa Komik Klasik Indonesia Layak Dikoleksi?' },
      { type: 'ol', items: ['Kelangkaan fisik karena banyak cetakan asli sudah tidak diproduksi ulang.', 'Gaya ilustrasi khas yang mencerminkan perkembangan seni gambar Indonesia pada zamannya.', 'Nilai budaya lokal yang mengangkat legenda, cerita rakyat, dan nilai-nilai tradisional Indonesia.'] },
      { type: 'quote', text: 'Classic comics preserve not only stories, but also the artistic and cultural identity of their era.', author: 'Journal Collectibles' },
      { type: 'note', text: 'Komik dengan cetakan pertama, kondisi lengkap, dan sampul asli umumnya memiliki nilai koleksi yang lebih tinggi dibandingkan cetakan ulang.' },
      { type: 'image', src: 'https://cdn.antaranews.com/cache/1200x800/2017/03/20170329P_20170329_124620_1.jpg.webp', caption: 'Classic Indonesian comics remain an important part of the nation’s literary and artistic heritage.' },
      { type: 'h2', text: 'Tantangan dalam Mengoleksi Komik Klasik' },
      { type: 'p', text: 'Mengoleksi komik lawas memiliki tantangan tersendiri. Kondisi kertas yang mudah menguning, sulitnya membedakan cetakan pertama dengan cetakan ulang, serta terbatasnya dokumentasi resmi membuat kolektor perlu lebih teliti sebelum membeli sebuah koleksi.' },
      { type: 'h2', text: 'Tips Memulai Koleksi Komik Klasik Indonesia' },
      { type: 'ul', items: ['Bergabung dengan komunitas kolektor komik lawas untuk memperoleh informasi mengenai judul, penerbit, dan tahun cetak.', 'Gunakan plastik pelindung bebas asam (acid-free) agar kondisi kertas tetap terjaga.', 'Prioritaskan komik dengan halaman lengkap dan kondisi fisik yang masih baik karena sangat memengaruhi nilai koleksi.'] },
      { type: 'h2', text: 'Kesimpulan' },
      { type: 'p', text: 'Mengoleksi komik klasik Indonesia bukan sekadar mengumpulkan buku lama, tetapi juga menjadi cara melestarikan sejarah literasi visual bangsa. Setiap komik menyimpan kisah, nilai budaya, dan jejak perkembangan seni ilustrasi Indonesia yang patut diwariskan kepada generasi mendatang.' }
    ]
  }
];