import React, { useState, useEffect } from 'react';

// ==========================================
// IMAGE ASSETS
// ==========================================
const WORLD_BG = "/WORLD_BG.webp";
const CURTAIN_LEFT = "/curtain_left.webp";
const CURTAIN_RIGHT = "/curtain_right.webp";
const TREE_MIDDLE = "/tree.webp";

// ==========================================
// ANTIQUE APP DATA ARRAYS
// ==========================================

const CATEGORIES = [
  {
    id: 'places',
    title: 'PLACES',
    tagline: 'Explore scenic destinations',
    image: '/hub_places.webp',
    desc: 'From rolling hills and white sandbars to cascading waterfalls and kawa hot baths.',
  },
  {
    id: 'cuisine',
    title: 'CUISINE',
    tagline: 'Savor rich local flavors',
    image: '/hub_cuisine.webp',
    desc: 'Traditional dishes cooked with coconut milk, wild souring leaves, and local sugar.',
  },
  {
    id: 'culture',
    title: 'CULTURE',
    tagline: 'Immerse in local heritage',
    image: '/hub_culture.webp',
    desc: 'Centuries-old festivals, wooden handloom weaving, and rich folklore traditions.',
  },
  {
    id: 'history',
    title: 'HISTORY',
    tagline: 'Uncover ancient roots',
    image: '/hub_history.webp',
    desc: 'The historic sakups of Panay, population growth, municipalities, and Kinaray-a dialects.',
  },
  {
    id: 'economy',
    title: 'ECONOMY',
    tagline: 'Powered by land and sea',
    image: '/hub_economy.webp',
    desc: 'Abundant coconut farming, fisheries, mining, and rich mineral wealth.',
  },
  {
    id: 'religion',
    title: 'RELIGION & SPIRITUALITY',
    tagline: 'Faith, history, and folk beliefs',
    image: '/hub_religion.webp',
    desc: 'Colonial coral-stone churches, vibrant celebrations, and nature-spirit diwata traditions.',
  }
];

const PLACES_DATA = [
  {
    id: 'tibiao',
    title: 'Tibiao River & Kawa Baths',
    tagline: 'Extreme Tubing & Giant Hot Pots',
    desc: 'Soak in large metal cauldrons heated by firewood and filled with local herbs, or slide down the rushing waters of Tibiao River.',
    image: 'https://suroy.ph/wp-content/uploads/2024/07/tibiaokawa-5.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tibiao+Antique+Kawa+Hot+Bath',
    quickFacts: ['Location: Tibiao, Antique', 'Activity: Hot pot bath, River tubing, Bugtong Bato trekking', 'Best Time: October to May']
  },
  {
    id: 'malalison',
    title: 'Malalison Island',
    tagline: 'The Mountain Island of Culasi',
    desc: 'A spectacular landscape featuring a long white sandbar, crystal waters, and rolling hills with panoramic ocean views.',
    image: 'https://www.lamudi.com.ph/journal/wp-content/uploads/2022/08/MARARISON-ISLAND-2048x1536.jpg',
    mapsUrl: 'https://maps.app.goo.gl/fKACoTZGSbGZjLsf8',
    quickFacts: ['Location: Culasi, Antique', 'Activity: Island trekking, Snorkeling, Pitcher plant viewing', 'Boat ride: 15-20 mins from Culasi port']
  },
  {
    id: 'seco',
    title: 'Seco Island',
    tagline: 'Pristine Sandbar & Kitesurfing Haven',
    desc: 'An elbow-shaped, uninhabited white sandbar sitting in deep blue waters. Acclaimed as one of the best kitesurfing destinations in the Philippines.',
    image: 'https://islandhoppinginthephilippines.com/visayas/wp-content/uploads/2022/11/64660807_459912151475518_8598768162906832896_n.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seco+Island+Tiburcio+Lutao+Antique',
    quickFacts: ['Location: Tiburcio Lutao, Antique', 'Activity: Camping, Kitesurfing, Snorkeling', 'Travel time: 2.5 hours boat ride from Tibiao/Culasi']
  },
  {
    id: 'bugang',
    title: 'Bugang River & Malumpati Spring',
    tagline: 'Cleanest Inland Waterway',
    desc: 'Swim in the crystal-clear, refreshing waters of Malumpati Cold Spring, or tube down the Bugang River, awarded as the cleanest inland river in the Philippines.',
    image: 'https://gttp.images.tshiftcdn.com/389145/x/0/?crop=1.91%3A1&fit=crop&width=1200',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Malumpati+Cold+Spring+Pandan+Antique',
    quickFacts: ['Location: Pandan, Antique', 'Activity: Swimming, River tubing, Rafting', 'Water Source: Pure natural mountain springs']
  },
  {
    id: 'aniniy',
    title: 'Anini-y Coral Church',
    tagline: 'Spanish Era Colonial Heritage',
    desc: 'Built in the 19th century by Spanish Augustinian friars, this majestic historic parish church is constructed entirely from hand-carved coral stones.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/09/e4/0c/anini-y-church.jpg?w=1200&h=-1&s=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Anini-y+Church+Antique',
    quickFacts: ['Location: Anini-y, Antique', 'Built: 1845 - 1879', 'Material: Carved coral block and egg-mortar']
  },
  {
    id: 'nogas',
    title: 'Nogas Island',
    tagline: 'White Sand & Marine Sanctuary',
    desc: 'An uninhabited 24-hectare island famous for its white sand beach, lush mangrove forest, a historic lighthouse, and spectacular coral reef sanctuaries perfect for diving.',
    image: 'https://nojuanisanisland.com/wp-content/uploads/2015/03/dsc_5383.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nogas+Island+Anini-y+Antique',
    quickFacts: ['Location: Anini-y, Antique', 'Activity: Snorkeling, Diving, Lighthouse trekking', 'Travel: 15-min boat ride from Anini-y shoreline']
  },
  {
    id: 'aningalan',
    title: 'Aningalan Highland (Little Baguio)',
    tagline: 'Highland Strawberry Garden & Pine Trees',
    desc: 'Antique\'s summer capital, Aningalan offers cool mountain air, beautiful pine forests, organic strawberry farms, and fields of colorful flowers at 1,000 meters above sea level.',
    image: 'https://jontotheworld.com/wp-content/uploads/2024/06/Aningalans-Highland-Strawberry-Garden-3.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aningalan+San+Remigio+Antique',
    quickFacts: ['Location: San Remigio, Antique', 'Elevation: ~1,000 meters above sea level', 'Features: Pine trees, Strawberry picking, Caves']
  },
  {
    id: 'igbaclag',
    title: 'Igbaclag Cave',
    tagline: 'Stone Castle of San Remigio',
    desc: 'A unique limestone formation reminiscent of a stone castle. Visitors can climb its craggy walls to enjoy panoramic views of the surrounding mountains and forests.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/59/b1/4c/20190922-231158-largejpg.jpg?w=1200&h=-1&s=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Igbaclag+Cave+San+Remigio+Antique',
    quickFacts: ['Location: Brgy. Aningalan, San Remigio, Antique', 'Activity: Cave exploration, Rock climbing', 'Highlight: Scenic mountain views']
  },
  {
    id: 'bugtongbato',
    title: 'Bugtong Bato Falls',
    tagline: 'Three-Tiered Forest Cascade',
    desc: 'A beautiful multi-tiered waterfall hidden inside the lush forests of Tibiao. The first three tiers are accessible via a scenic trek along rivers and rice terraces.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cf/59/f0/the-first-tier-of-the.jpg?w=1200&h=1200&s=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bugtong+Bato+Falls+Tibiao+Antique',
    quickFacts: ['Location: Brgy. Tuno, Tibiao, Antique', 'Activity: Trekking, Swimming', 'Trek time: 20-30 mins from Tibiao eco-loop']
  },
  {
    id: 'sibalompark',
    title: 'Sibalom Natural Park',
    tagline: 'Biodiversity Sanctuary & Gemstone River',
    desc: 'A protected forest sanctuary home to rare species like the giant Rafflesia flower, Tarictic Hornbill, and Philippine Spotted Deer. The Sibalom River is also famous for its abundant semi-precious gemstones.',
    image: 'https://cf-images.assettype.com/sunstar%2F2024-05%2Fa820ed51-a341-40a4-a24d-872a6b88bc7f%2Filo.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sibalom+Natural+Park+Antique',
    quickFacts: ['Location: Sibalom, Antique', 'Key Species: Rafflesia speciosa, Walden\'s Hornbill', 'Area: 5,511 hectares of protected forest']
  },
  {
    id: 'igpasungaw',
    title: 'Igpasungaw Falls',
    tagline: 'Multi-tiered Adventure Cascades',
    desc: 'An off-the-beaten-path paradise in Sebaste featuring a series of cold, clear pools and natural stone slides surrounded by dense tropical foliage.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/99/09/4c/1st-falls.jpg?w=1200&h=-1&s=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Igpasungaw+Falls+Sebaste+Antique',
    quickFacts: ['Location: Sebaste, Antique', 'Activity: Trekking, Natural water slides, Canyoning', 'Best time: Rainy season to early dry season']
  },
  {
    id: 'sanjoseesplanade',
    title: 'San Jose Esplanade',
    tagline: 'Sunset Coastal Boardwalk',
    desc: 'A beautiful seaside boardwalk in the provincial capital, offering a picturesque view of the Sulu Sea sunset, perfect for evening walks, local street food dining, and community leisure.',
    image: 'https://static1.detourista.com/wp/wp-content/uploads/Unorganized/San-Jose-Esplanade-001.jpg?lossy=80&ssl=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=San+Jose+Esplanade+Antique',
    quickFacts: ['Location: San Jose de Buenavista, Antique', 'Best time: Late afternoon (Sunset)', 'Activity: Biking, Sunset viewing, Street food']
  },
  {
    id: 'maniguinisland',
    title: 'Maniguin Island',
    tagline: 'Isolated Marine & Lighthouse Sanctuary',
    desc: 'An isolated volcanic island in the Sulu Sea famous for its historic Spanish-era lighthouse, vertical coral walls, and crystal-clear waters populated by hammerhead sharks and sea turtles.',
    image: 'https://static1.detourista.com/wp/wp-content/uploads/Unorganized/Maniguin-Island-003.jpg?strip=all&lossy=80&ssl=1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maniguin+Island+Culasi+Antique',
    quickFacts: ['Location: Culasi (Offshore), Antique', 'Activity: Deep-sea diving, Historical lighthouse tour', 'Travel: 2-3 hours boat ride from Culasi port']
  }
];

const CUISINE_DATA = [
  {
    id: 'binabak',
    title: 'Binabak',
    tagline: 'River Shrimps in Banana Leaves',
    desc: 'A true Antiqueño specialty, Binabak is a savory shrimp delicacy featuring crushed river shrimp (patuyaw). The pounded shrimp is mixed with tender, young coconut meat and aromatic ginger, wrapped securely in fresh banana leaves, and steamed to perfection.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDR2lJPt4ApvkmHIIbqQg-icZ5mBoBHmYHw&s',
    ingredients: ['Fresh River Shrimps (Patuyaw)', 'Grated Young Coconut meat', 'Ginger, Garlic, & Onions', 'Coconut Milk (Gata)', 'Banana Leaves (for wrapping)'],
    heritage: 'Binabak is a specialty in the mountainous and riverine towns of Antique, showcasing the clever union of freshwater catch and abundant coconut trees.'
  },
  {
    id: 'dagmay',
    title: 'Ginat-an nga Dagmay',
    tagline: 'Creamy Taro & River Snails',
    desc: 'A rich, deeply comforting local dish combining taro (dagmay) leaves, stalks, and tubers with pigeon peas (kadyos) and river snails (bagongon), slow-simmered in coconut milk.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSethwZ15ztvC0wMmvNZ3Vz5bqIB5KxWXngcg&s',
    ingredients: ['Taro Leaves, Stalks, and Tubers (Dagmay)', 'Pigeon Peas (Kadyos)', 'River Snails (Bagongon)', 'Coconut milk (Gata)', 'Lemongrass'],
    heritage: 'Ginat-an nga Dagmay represents the forest and agricultural flavors of Antique, commonly paired with sun-dried fish (pinakas).'
  },
  {
    id: 'linapwahan',
    title: 'Linapwahan',
    tagline: 'Sweet Local Vegetable Broth',
    desc: 'A staple in Antiqueño households, Linapwahan is a wholesome, slightly sweet vegetable broth packed with fresh, local produce like malunggay, papaya, okra, and squash, boiled with dried fish or shrimp.',
    image: 'https://www.angsarap.net/wp-content/uploads/2018/11/Linapwahan-Wide.jpg',
    ingredients: ['Local vegetables (okra, squash, malunggay, alugbati, etc.)', 'Freshwater Shrimp or River Crab', 'Tomatoes & Onions', 'Ginamus (shrimp paste)'],
    heritage: 'Linapwahan represents Antique\'s home-style cooking and agricultural abundance, highlighting raw, clean ingredients.'
  },
  {
    id: 'bandi',
    title: 'Bandi',
    tagline: 'Classic Muscovado Peanut Brittle',
    desc: 'A sweet treat deeply loved by locals, Bandi is Antique’s signature peanut brittle. Toasted peanuts are cooked in caramelized raw local muscovado sugar and cooled into crunchy disks on banana leaves.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XpznvJco4doUnHNtSgQljeQza1q9BM67fw&s',
    ingredients: ['Toasted Peanuts', 'Raw Muscovado Sugar', 'Water'],
    heritage: 'Antique is a major producer of muscovado sugar. Bandi is the most prominent sweet delicacy representing this heritage, widely sold as pasalubong.'
  },
  {
    id: 'butongbutong',
    title: 'Butong-butong Nipa',
    tagline: 'Chewy Sugarcane Pulled Candy',
    desc: 'A delightfully soft, chewy, and elastic candy stick made by reducing sugarcane molasses until thick, adding a splash of calamansi juice, and stretching it before sesame seeds are added.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhrM-6EcsoiuGTpdn27A4OzEMyjAmT0qx4SP42h0z8Z-zP21ww9Qg0Ob6XVg1SmB1CDn9kwTqhxYpJVf-MXWeQzhzzY40xag047CO6VaPuvfyrNt8Sl2hLrBP4oKA60mVUMyrJfp4fYwyI/s400/butong2b.jpg',
    ingredients: ['Sugarcane Molasses', 'Calamansi Juice', 'Toasted Sesame Seeds'],
    heritage: 'This pulled candy serves as Antique’s unique version of Tira-tira, showcasing sugarcane crop heritage.'
  },
  {
    id: 'kalamayhati',
    title: 'Kalamay-hati',
    tagline: 'Sticky Rice & Coconut Cake',
    desc: 'A sweet, sticky native delicacy made of pure coconut milk, dark brown sugar, and ground sticky rice (malagkit) slow-cooked until glossy and dense.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShmP5YWUxtnvU-CD1uPZ6tVBW1LjM9FXCZQ&s',
    ingredients: ['Ground Sticky Rice (Malagkit)', 'Coconut Milk', 'Dark Brown Sugar'],
    heritage: 'A comforting cake commonly served on banana leaves during traditional gatherings and religious town fiestas.'
  },
  {
    id: 'ibos',
    title: 'Ibos',
    tagline: 'Sticky Rice in Woven Coconut Leaves',
    desc: 'A comforting rice cake made from sticky rice (pilit) packed into hand-woven young coconut leaf containers (janisa or palaspas) and boiled until tender. Best dipped in local muscovado sugar.',
    image: 'https://panlasangpinoy.com/wp-content/uploads/2013/04/Suman-sa-Ibos-Recipe.jpg',
    ingredients: ['Sticky Rice (Pilit)', 'Coconut Milk', 'Sea Salt', 'Young Coconut Leaves (for wrapping)'],
    heritage: 'This rice cake is the quintessential Filipino suman. The wrapping is a local craft skill passed down through families.'
  }
];

const FESTIVALS_DATA = [
  {
    id: 'tiringbanay',
    title: 'Tiringbanay Festival',
    tagline: '“Coming Together” in San Jose',
    desc: 'An annual celebration held from April 19 to May 1 to honor farmers and fisherfolk, recognizing their role in sustaining the local economy. It coincides with the Feast of St. Joseph the Worker.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4DaEkQO3Ntq7j4rAKXmr5huH8XiqLnnn6UXHKa6S_Jr6_O_jvjHhatqmE5r06DZMQ5oGvPuj7HaX1E_6-rkvwxuVeelza0tQIfKcYEP3Ki-E5YOcJsrqi9DlPYo6mNvy_VszMAvpIjBk/s1600/Antique-Tiringbanay-Festival.jpg',
    history: 'The festival emphasizes community solidarity (“tiringbanay”) and resilience. Highlights include Farmers & Fisherfolk Day, motocross competitions, street dancing, pageants, and food exhibits.',
    youtubeId: 'Guj_pgRs0j8'
  },
  {
    id: 'binirayan',
    title: 'Binirayan Festival',
    tagline: '“Where They Sailed To”',
    desc: 'Antique’s premier month-long cultural celebration held every December. It commemorates the legendary arrival of the ten Bornean datus on Panay Island, honoring the origins of Panay settlement.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Binirayan_Festival_of_Antique.jpg',
    history: 'Features a Fluvial Parade from Pantalan Port to Malandog Beach, a reenactment of the datus landing, Pasundayag trade exhibits, street dancing, and the Malay Ati Tribe competition.',
    youtubeId: 'ZN0l5I8P7S8'
  },
  {
    id: 'madjaas',
    title: 'Madja-as Festival',
    tagline: 'Honoring the Sacred Peak of Culasi',
    desc: 'A week-long cultural celebration held in Culasi in late February or early March, celebrating the founding of Culasi in 1735 and paying tribute to the sacred Mt. Madja-as.',
    image: 'https://i.ytimg.com/vi/spz9Jb8_pfo/maxresdefault.jpg',
    history: 'Reflects the mythological and historical identity of early Panay civilization. Features street dancing, historical reenactments, local beauty pageants, and product exhibitions.',
    youtubeId: 'spz9Jb8_pfo'
  },
  {
    id: 'banigan',
    title: 'Banigan Festival',
    tagline: 'Weaving Heritage in Libertad',
    desc: 'Held from March 14 to 16 in Libertad, this festival highlights the local handwoven “banig” mat weaving industry made from native pandan leaves.',
    image: 'https://jontotheworld.com/wp-content/uploads/2023/01/Banigan-Festival-.jpg',
    history: 'Celebrates the craftsmanship of local mat weavers. Activities include live mat weaving demonstrations, street dancing in banig-inspired costumes, and trade exhibitions.',
    youtubeId: 'nzeYWa9WaDI'
  },
  {
    id: 'tatusan',
    title: 'Tatusan Festival',
    tagline: 'Abundance of Caluya Islands',
    desc: 'Held from April 9 to 11 in Caluya, named after the famous “tatus” or coconut crab, celebrating the island\'s marine abundance and promoting ecological conservation.',
    image: 'https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/471048282_1818515518960596_3632436589579485277_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MRVA2VzNT68Q7kNvwHUkiyo&_nc_oc=AdqFE9Jf0MeixeQQdNnjGw8r9Gy7x1r8QUnMX2AFxAjgKnhCvVFQmoMJryVlklXWYRc&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=F0663hkVrk7b3-IzFfK9Bg&_nc_ss=7a289&oh=00_Af7zswZkLiKc7j_QKrxlc1xjBQsvZG-nOKZsXbMLKkVLZA&oe=6A1F4DF5',
    history: 'Raises awareness about protecting the vulnerable coconut crab. Features crab-themed street dancing, seafood fairs, float parades, and community presentations.',
    youtubeId: 'mpGhZ0-a5Xo'
  },
  {
    id: 'patuyaw',
    title: 'Patuyaw & Patnongon Festivals',
    tagline: 'Shrimps & Hospitality',
    desc: 'Celebrates Sebaste\'s abundance of freshwater shrimp (“patuyaw”) and Patnongon\'s week-long unity fiesta (February 22–26) under Saint Joseph.',
    image: 'https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/600296633_887447097398252_1269160612354558876_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=eIr4O7YcbV0Q7kNvwFfNUpX&_nc_oc=Adp7O7P3Cwjivea4Y6-47oFaW7DXFeXhH2nDDo4CGY-3nA0oIE6b1tyqjsc4ZxAkL2k&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=omlcKQ4EfTLbkfiy5Wl3hg&_nc_ss=7a289&oh=00_Af4yeEHGd2YhqS2YDLbcVDqVDsB2gVN0pwfK2P_qq5fHiA&oe=6A1F3E1D',
    history: 'Highlights local livelihoods, farming, and agricultural achievements. Events feature street dancing, parada kang karosa (float parade), and agricultural trade displays.',
    youtubeId: '92pnMrHU7IQ'
  },
  {
    id: 'batabat',
    title: 'Batabat Festival',
    tagline: 'Rural Livelihood in Barbaza',
    desc: 'Held in Barbaza from March 16 to 19, this festival celebrates agricultural life, rural traditions, and gives thanks for the harvest.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8aKAqhXQYAxNq39PXTUG-SJxshYW5baU5X5oiTsFrO5gJCwdWKqMFkiDaP8O17Eve31T4TEim55OD5Opx7eOUco61sigI53Y6ee8poA2hl-z9BxP2V8epY7vAA964cfaWbaAlFtoPVZY/s1600/batabat_festival_by_mizz_jiji_yume.jpg',
    history: 'Reflects the deep connection of Barbaza residents to farming and collective labor. Features street dancing with farm-inspired costumes and agricultural fairs.'
  },
  {
    id: 'pahinis',
    title: 'Pahinis Festival',
    tagline: 'Muscovado Sugar Renewal',
    desc: 'Celebrated in Laua-an in mid-January, named after the cleaning and preparing (“pahinis”) of tools needed for muscovado sugarcane crushing.',
    image: 'https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/597385170_887550594054569_5430833477548965257_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Jgqt7_3Zii0Q7kNvwFr4l4p&_nc_oc=Ado5npH0qzc_maZYnpqmujwGHivKJOpG-LnfGxDTi74GEqogak69J23IeUIaOAX9TOs&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=t860HbH_GV1zXmt_fakZtw&_nc_ss=7a289&oh=00_Af4yeEHGd2YhqS2YDLbcVDqVDsB2gVN0pwfK2P_qq5fHiA&oe=6A1F5B9F',
    history: 'Combines sugarcane harvest thanksgiving with Catholic devotions to Saint Joseph. Features traditional sugar boiling reenactments, beauty pageants, and cleansing rituals.',
    youtubeId: 'IPG1rAQPaeE'
  },
  {
    id: 'maninihon',
    title: 'Maninihon Festival',
    tagline: 'The Hardworking Spirit of Tibiao',
    desc: 'Held in Tibiao from February 17 to 21, celebrating the diligence, resilience, and hardworking character of the local people.',
    image: 'https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/598449129_887530647389897_6373119461634317243_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_Cwx0jpzeRUQ7kNvwEJZlZL&_nc_oc=Adq1CHja0BRjAy1iNkb2dSHsRqevy-nnAk45X7RJtfpCcz3oJpXPi6uGhnGJP2pqh3M&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=EN1AwUgCYez72UUt1PgEqw&_nc_ss=7a289&oh=00_Af5qPsA4ZAjkntYPXsKV6Qw2lcIQk4te7OgAFrxW53jaiw&oe=6A1F3325',
    history: 'Refers to individuals who persevere through life\'s trials. Features street dancing depicting daily livelihoods (fishing, farming, clay crafts) and trade exhibits.',
    youtubeId: 'UwPbMVXZjTU'
  }
];

const CRAFTS_DATA = [
  {
    id: 'buri',
    title: 'Buri Making',
    tagline: 'Corypha Palm Weaving',
    desc: 'A traditional craft using strong fibers from the buri palm leaves. Processed leaves are woven into durable hats, bags, baskets, and fans.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1ZaLgwhLDYk0JEkuH_wttZM5cKHOXKcr2dNRzI9HXp61mJ7NUan-DUAvZlbceE1-q2Od9UKI55uwEhDymtrqRZ95CRB5diTmlZpNCcMPzQWeMYcUDHpUtVh8kwwYBDnWHCIMf89VBz14/s1600/Buri+Handicraft+Making+Tobias+Fornier+Antique-1414.jpg',
    history: 'Provides essential eco-friendly livelihoods for upland rural communities, preserving ancestral Visayan weaving patterns.'
  },
  {
    id: 'patadyong',
    title: 'Traditional Patadyong',
    tagline: 'The Loom-Woven Pride of Bugasong',
    desc: 'Vibrant, handloom checkered wrap-around skirts and shawls woven using cotton or abaca fibers by the Bagtason Loom Weavers in Bugasong.',
    image: 'https://static1.detourista.com/wp/wp-content/uploads/Unorganized/Bagtason-Loom-Weaving-001-768x617.jpg',
    history: 'Patadyong is a historic clothing icon of Panay. It represents rural self-sufficiency and is worn proudly during cultural festivals.'
  },
  {
    id: 'pottery',
    title: 'Pottery Making',
    tagline: 'Earthen Cookware of Patnongon',
    desc: 'Antique\'s oldest clayware craft, centered on forming functional cooking pots (kuron/palayok), water jars, and clay stoves using local red clays.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwgYiXNTWKDX0Cle3eSl97OilXI5Of1qcTA&s',
    history: 'Sourced from natural clay beds, potters fire these items in open wood-pits, supplying raw, heat-retaining clay pots across Panay Island.'
  },
  {
    id: 'bamboo',
    title: 'Bamboo Craft',
    tagline: 'Flexible Woodwork Artistry',
    desc: 'A sustainable craft producing furniture (beds, chairs, tables), building fences, basketry, and traditional fishing traps using local bamboo stems.',
    image: 'https://files01.pna.gov.ph/ograph/2022/09/23/iloilo-antique-bamboo-crafters-1.jpg',
    history: 'Bamboo is widely grown in Antique\'s valleys. The craft showcases local resourcefulness in building eco-friendly houses and tools.'
  },
  {
    id: 'banig',
    title: 'Banig Mat Weaving',
    tagline: 'Libertad Pandan Weaves',
    desc: 'Weaving dried pandan leaves into mats (banig), bags, hats, and purses featuring colorful and complex geometric patterns.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Banig.JPG',
    history: 'A cultural symbol of patience. The craft is celebrated annually during Libertad\'s Banigan Festival, supporting rural household incomes.'
  }
];

const CHURCHES_DATA = [
  {
    id: 'aniniy_church',
    title: 'St. John Nepomucene Church (Anini-y)',
    tagline: 'Coral stone structure of southernmost Panay',
    desc: 'Built by Augustinian friars, this is the only surviving Spanish-era church in the province constructed completely of hand-carved coral blocks and egg-mortar.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/09/e4/0c/anini-y-church.jpg?w=1200&h=-1&s=1',
    history: 'Built between 1845 and 1879, it stands as a testament to colonial history and architectural resilience at the southern tip of the province.'
  },
  {
    id: 'sebaste_church',
    title: 'Sebaste Parish Church',
    tagline: 'Shrine of the Miraculous Saint Blaise',
    desc: 'A highly visited pilgrimage site in northern Antique, housing a miraculous centuries-old wooden image of Saint Blaise.',
    image: 'https://static1.detourista.com/wp/wp-content/uploads/Unorganized/Sebaste-001.jpg?lossy=80&w=384&ssl=1',
    history: 'Known for spiritual healing, thousands of devotees visit Sebaste annually to pay respect and pray for protection against throat ailments and physical illness.'
  }
];

// ==========================================
// HELPER MATH FUNCTIONS
// ==========================================
const easeInOut = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

const clamp = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};

const smoothScrollTo = (targetY: number, duration: number) => {
  const startY = window.scrollY;
  const difference = targetY - startY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1);
    
    // easeInOutCubic easing function
    const ease = percent < 0.5 
      ? 4 * percent * percent * percent 
      : 1 - Math.pow(-2 * percent + 2, 3) / 2;

    window.scrollTo(0, startY + difference * ease);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

// ==========================================
// CUSTOM HOOKS
// ==========================================
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return isMobile;
}

// ==========================================
// INLINE COMPONENTS
// ==========================================
const StarLogo: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 2l2.09 6.42H23l-5.45 3.96 2.09 6.42L14 14.84l-5.64 4.06 2.09-6.42L4.96 8.42h6.95L14 2z" fill="white" opacity="0.9" />
    <circle cx="14" cy="24" r="1.5" fill="white" opacity="0.6" />
    <circle cx="6" cy="6" r="1" fill="white" opacity="0.4" />
    <circle cx="22" cy="6" r="1" fill="white" opacity="0.4" />
  </svg>
);

interface Scene1CardProps {
  bgImage: string;
  isPlayCard?: boolean;
  numberText?: string;
  labelText: string;
  isMobile?: boolean;
  isDesktop?: boolean;
}

const Scene1Card: React.FC<Scene1CardProps> = ({
  bgImage,
  isPlayCard,
  numberText,
  labelText,
  isMobile,
  isDesktop,
}) => {
  const size = isDesktop ? 158 : 140;
  const radius = isDesktop ? 28 : 22;
  const padding = isDesktop ? 12 : 10;

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${radius}px`,
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        background: 'linear-gradient(to top, rgba(10, 6, 8, 0.95) 0%, rgba(10, 6, 8, 0.4) 60%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Backdrop blur layer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '44%',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'linear-gradient(to top, rgba(10, 6, 8, 0.6) 0%, rgba(10, 6, 8, 0.15) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 2,
      }} />

      {/* Content Area */}
      <div style={{
        position: 'absolute',
        bottom: `${padding}px`,
        left: `${padding}px`,
        right: `${padding}px`,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        textAlign: 'left',
      }}>
        {isPlayCard ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? '8px' : '6px' }}>
            <div style={{
              width: isDesktop ? '30px' : '26px',
              height: isDesktop ? '30px' : '26px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              <svg width={isDesktop ? "10" : "8"} height={isDesktop ? "12" : "10"} viewBox="0 0 10 12" fill="none" style={{ marginLeft: '2px' }}>
                <path d="M2.5 2L8.5 6L2.5 10V2Z" fill="#0a0608" />
              </svg>
            </div>
            <span style={{
              color: '#ffffff',
              fontSize: isDesktop ? '18px' : (isMobile ? '13px' : '14px'),
              fontFamily: 'Imprima, sans-serif',
              fontWeight: 500,
            }}>
              {labelText}
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0px' }}>
            <span style={{
              color: '#ffffff',
              fontSize: isDesktop ? '36px' : '28px',
              fontFamily: 'Viaoda Libre, serif',
              lineHeight: 1,
            }}>
              {numberText}
            </span>

            <span style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: isDesktop ? '18px' : '14px',
              fontFamily: 'Imprima, sans-serif',
              lineHeight: 1.1,
            }}>
              {labelText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  const isMobile = useIsMobile();

  // Audio state & ref
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize background sound
  useEffect(() => {
    const audio = new Audio('/ocean_waves.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audio.muted = true; // Start muted to satisfy browser autoplay policy on page load
    audioRef.current = audio;

    // Start muted autoplay immediately (always permitted by modern browsers)
    audio.play()
      .then(() => {
        console.log("Muted autoplay started on load.");
      })
      .catch((err) => {
        console.log("Muted autoplay on load was prevented:", err);
      });

    // Unmute on first user click or scroll interaction anywhere on the document
    const unmuteOnInteraction = () => {
      audio.muted = false;
      setIsMuted(false);
      
      // Ensure the audio is playing (if muted autoplay was entirely blocked earlier)
      if (audio.paused) {
        audio.play().catch((err) => console.log("Play failed on interaction:", err));
      }

      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };

    window.addEventListener('click', unmuteOnInteraction);
    window.addEventListener('scroll', unmuteOnInteraction);

    return () => {
      audio.pause();
      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (audioRef.current.paused) {
        audioRef.current.play()
          .catch((err) => {
            console.log("Play blocked on interaction:", err);
          });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMute = !isMuted;
      audioRef.current.muted = nextMute;
      setIsMuted(nextMute);
      if (!nextMute && audioRef.current.paused) {
        audioRef.current.play().catch((err) => console.log(err));
      }
    }
  };

  // Scroll driven progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse positions (smoothed via requestAnimationFrame)
  const [smoothedMouse, setSmoothedMouse] = useState({ x: 0, y: 0 });

  // Entrance state managers
  const [uiVisible, setUiVisible] = useState(false);

  // Antique app state managers
  const [activeTab, setActiveTab] = useState<'places' | 'cuisine' | 'culture' | 'history' | 'economy' | 'religion' | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDeepDive, setIsDeepDive] = useState(false);

  // Set secondary sub-tabs when tab changes
  useEffect(() => {
    if (activeTab === 'culture') {
      setActiveSubTab('festivals');
    } else if (activeTab === 'history') {
      setActiveSubTab('profile');
    } else if (activeTab === 'economy') {
      setActiveSubTab('agriculture');
    } else {
      setActiveSubTab('');
    }
  }, [activeTab]);

  // Smooth scroll and focus helper
  const scrollToScene2 = (tab: 'places' | 'cuisine' | 'culture' | 'history' | 'economy' | 'religion' | null) => {
    playAudio();
    if (tab) {
      setActiveTab(tab);
      setIsDeepDive(true);
    } else {
      setIsDeepDive(false);
    }
    // Allow state changes to commit before scrolling
    setTimeout(() => {
      smoothScrollTo(document.documentElement.scrollHeight, 1200);
    }, 50);
  };

  // Helper for quick access featured click
  const handleHighlightClick = (item: any, category: 'places' | 'cuisine' | 'culture' | 'history' | 'economy' | 'religion') => {
    playAudio();
    setActiveTab(category);
    setIsDeepDive(true);
    setSelectedItem({ ...item, type: category });
    setTimeout(() => {
      smoothScrollTo(document.documentElement.scrollHeight, 1200);
    }, 50);
  };

  useEffect(() => {
    // 1. Scroll listener
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const maxScroll = docHeight - winHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Mouse tracking with smoothing loop
    let rawX = 0;
    let rawY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      rawX = (e.clientX / window.innerWidth) * 2 - 1;
      rawY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const smoothUpdate = () => {
      currentX = lerp(currentX, rawX, 0.07);
      currentY = lerp(currentY, rawY, 0.07);
      setSmoothedMouse({ x: currentX, y: currentY });
      animId = requestAnimationFrame(smoothUpdate);
    };
    animId = requestAnimationFrame(smoothUpdate);

    // 3. Staggered entrance sequences
    const tUi = setTimeout(() => setUiVisible(true), 600);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      clearTimeout(tUi);
    };
  }, []);

  // Parallax calculations
  const ep = easeInOut(scrollProgress);

  // Curtain translation progress (fully open by scrollProgress = 0.45)
  const curtainProgress = clamp(scrollProgress / 0.45, 0, 1);
  const ec = easeInOut(curtainProgress);

  // Scene transitions
  const scene1Opacity = clamp(1 - scrollProgress / 0.22, 0, 1);
  const scene2Opacity = clamp((scrollProgress - 0.68) / 0.16, 0, 1);

  // Mouse Magnitudes
  const MAG = {
    world: 6,
    tree: 8,
    curtainL: 14,
    curtainR: 14,
  };

  // Layers transform strings - ADJUSTED ZOOM FACTORS TO PREVENT BORDER BLEED (NO BLACK LINES)
  const worldTransform = `scale(${lerp(1.03, 1.20, ep)}) translate(${ -smoothedMouse.x * MAG.world }px, ${ -smoothedMouse.y * MAG.world }px)`;
  const treeTransform = `scale(${lerp(1.04, 1.28, ep)}) translate(${ -smoothedMouse.x * MAG.tree }px, ${ -smoothedMouse.y * MAG.tree }px)`;
  const curtainLTransform = `translateX(calc(0% - ${lerp(0, 140, ec)}%)) translateX(${ -smoothedMouse.x * MAG.curtainL }px) translateY(${ -smoothedMouse.y * MAG.curtainL * 0.3 }px) scale(${lerp(1.04, 1.35, ec)})`;
  const curtainRTransform = `translateX(calc(0% + ${lerp(0, 140, ec)}%)) translateX(${ -smoothedMouse.x * MAG.curtainR }px) translateY(${ -smoothedMouse.y * MAG.curtainR * 0.3 }px) scale(${lerp(1.04, 1.35, ec)})`;

  return (
    <div style={{ height: '480vh', position: 'relative', width: '100%' }}>
      {/* Sticky Viewport */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0a0608',
      }}>

        {/* ==========================================
            LAYER 1: World Background (z-index: 0)
            ========================================== */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          bottom: '-20px',
          left: '-20px',
          right: '-20px',
          transformOrigin: '50% 50%',
          transform: worldTransform,
          zIndex: 0,
        }}>
          <img
            src={WORLD_BG}
            alt="World Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* ==========================================
            LAYER 2: Middle-ground Tree (z-index: 5)
            ========================================== */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-20px',
          width: 'calc(100% + 40px)',
          height: 'calc(100vh + 60px)',
          transformOrigin: '0% 100%',
          transform: treeTransform,
          zIndex: 5,
          pointerEvents: 'none',
        }}>
          <img
            src={TREE_MIDDLE}
            alt="Middle ground tree"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left bottom' }}
          />
        </div>

        {/* ==========================================
            LAYER 3.5: Bottom Fade Gradient (z-index: 16)
            ========================================== */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 16,
        }} />

        {/* ==========================================
            LAYER 4L: Curtain Left (z-index: 16)
            ========================================== */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: 'calc(100% + 40px)',
          height: 'calc(100vh + 40px)',
          transformOrigin: 'left center',
          transform: curtainLTransform,
          zIndex: 16,
          pointerEvents: 'none',
        }}>
          <img
            src={CURTAIN_LEFT}
            alt="Curtain Left"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
          />
        </div>

        {/* ==========================================
            LAYER 4R: Curtain Right (z-index: 16)
            ========================================== */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: 'calc(100% + 40px)',
          height: 'calc(100vh + 40px)',
          transformOrigin: 'right center',
          transform: curtainRTransform,
          zIndex: 16,
          pointerEvents: 'none',
        }}>
          <img
            src={CURTAIN_RIGHT}
            alt="Curtain Right"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center' }}
          />
        </div>

        {/* ==========================================
            TOP FADE GRADIENT (z-index: 45)
            ========================================== */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '42vh',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 45,
        }} />

        {/* ==========================================
            NAVIGATION HEADER (z-index: 50)
            ========================================== */}
        <nav style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          boxSizing: 'border-box',
        }}>
          {/* Mobile Nav Layout */}
          <div className="flex xl:hidden" style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 20px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            <button
              onClick={() => scrollToScene2('places')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Imprima, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                opacity: 0.9,
                cursor: 'pointer',
              }}
            >
              Places
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => scrollToScene2(null)}>
              <StarLogo />
            </div>
            <button
              onClick={() => scrollToScene2('culture')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Imprima, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                opacity: 0.9,
                cursor: 'pointer',
              }}
            >
              Culture
            </button>
          </div>

          {/* Desktop Nav Layout */}
          <div className="hidden xl:flex" style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '22px 48px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {(['places', 'cuisine', 'culture', 'history', 'economy', 'religion'] as const).map((tab) => {
                const labels = {
                  places: 'Places',
                  cuisine: 'Cuisine',
                  culture: 'Culture',
                  history: 'History',
                  economy: 'Economy',
                  religion: 'Religion'
                };
                return (
                  <button
                    key={tab}
                    onClick={() => scrollToScene2(tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Imprima, sans-serif',
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: activeTab === tab ? '#ffbe85' : '#fff',
                      opacity: 0.9,
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => scrollToScene2(null)}>
              <StarLogo />
            </div>
            <div style={{ display: 'flex', gap: '36px' }}>
              <button
                onClick={() => scrollToScene2(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Imprima, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffbe85',
                  opacity: 0.9,
                  cursor: 'pointer',
                }}
              >
                Explore Hub
              </button>
            </div>
          </div>
        </nav>

        {/* ==========================================
            SCENE 1 UI (z-index: 20) - WELCOME TO...
            ========================================== */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          opacity: scene1Opacity,
          pointerEvents: scene1Opacity > 0.1 ? 'auto' : 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
          {/* Centered Minimalist Welcome Screen */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '24px',
            opacity: uiVisible ? 0.95 : 0,
            transform: uiVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
            transitionDelay: '0.3s',
          }}>
            <h1 style={{
              fontFamily: 'Viaoda Libre, serif',
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.8)',
              textAlign: 'center',
              margin: 0,
            }}>
              <div style={{ fontSize: 'clamp(50px, 9vw, 110px)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
                WELCOME TO...
              </div>
            </h1>

            <button
              onClick={() => scrollToScene2(null)}
              className="bob-up-animation"
              aria-label="Scroll to main content"
              style={{
                marginTop: '36px',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 190, 133, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 190, 133, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* ==========================================
            SCENE 2 UI (z-index: 46) - Hub & Tabs
            ========================================== */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 46,
          opacity: scene2Opacity,
          pointerEvents: scene2Opacity > 0.1 ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: isMobile ? '10vh' : '12vh',
          textAlign: 'center',
          boxSizing: 'border-box',
          paddingLeft: '24px',
          paddingRight: '24px',
          overflowY: (scrollProgress > 0.85 || isDeepDive) ? 'auto' : 'hidden',
          paddingBottom: '80px',
        }}>
          {/* Main Scrolled Down Header */}
          <h2 style={{
            fontFamily: 'Viaoda Libre, serif',
            fontSize: isMobile ? 'clamp(44px, 10vw, 64px)' : 'clamp(54px, 8vw, 100px)',
            color: '#ffffff',
            letterSpacing: '0.05em',
            lineHeight: 1,
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            ANTIQUE!
          </h2>

          <p style={{
            fontFamily: 'Imprima, sans-serif',
            fontSize: isMobile ? '13px' : '17px',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            maxWidth: isMobile ? '280px' : '580px',
            color: 'rgba(255,255,255,0.85)',
            marginTop: '1vh',
            marginBottom: '1.5vh',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}>
            Explore Panay's hidden treasure, where the mountains meet the sea.
          </p>

          {/* HUB STATE (Select Category Cards & Featured Highlights) */}
          {!isDeepDive ? (
            <>
              {/* Category Grid - 6 Categories */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '12px' : '16px',
                marginTop: isMobile ? '1vh' : '2vh',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '960px',
              }}>
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id as any);
                      setIsDeepDive(true);
                    }}
                    style={{
                      position: 'relative',
                      width: isMobile ? '100%' : '290px',
                      maxWidth: isMobile ? '340px' : 'none',
                      height: isMobile ? '90px' : '150px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.4s',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 36px rgba(255,190,133,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    }}
                  >
                    {/* Background Image */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${cat.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      zIndex: 0,
                    }} />
                    {/* Overlay Gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 75%, transparent 100%)',
                      zIndex: 1,
                    }} />

                    {/* Content */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '16px',
                      width: '100%',
                      textAlign: 'left',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}>
                      <span style={{
                        fontFamily: 'Imprima, sans-serif',
                        fontSize: '8px',
                        letterSpacing: '0.15em',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                      }}>
                        {cat.tagline}
                      </span>
                      <h3 style={{
                        fontFamily: 'Viaoda Libre, serif',
                        fontSize: '18px',
                        color: '#ffffff',
                        lineHeight: 1.1,
                      }}>
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* FEATURED HIGHLIGHTS (Quick Access Panel) */}
              <div style={{
                marginTop: isMobile ? '2vh' : '4vh',
                width: '100%',
                maxWidth: '960px',
                textAlign: 'center',
              }}>
                <h3 style={{
                  fontFamily: 'Viaoda Libre, serif',
                  fontSize: '20px',
                  color: '#ffffff',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  textTransform: 'uppercase',
                }}>
                  Featured Highlights
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}>
                  <div 
                    onClick={() => handleHighlightClick(PLACES_DATA[1], 'places')}
                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Scene1Card bgImage={PLACES_DATA[1].image} labelText="Malalison Island" numberText="01" />
                  </div>
                  <div 
                    onClick={() => handleHighlightClick(PLACES_DATA[0], 'places')}
                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Scene1Card bgImage={PLACES_DATA[0].image} labelText="Tibiao River" numberText="02" />
                  </div>
                  <div 
                    onClick={() => handleHighlightClick(CRAFTS_DATA[1], 'culture')}
                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Scene1Card bgImage={CRAFTS_DATA[1].image} labelText="Bugasong Weaves" numberText="03" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* DEEP DIVE STATE (Detailed Tabbed View) */
            <>
              {/* Tab Navigation bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '900px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '8px 16px',
                boxSizing: 'border-box',
                marginTop: '15px',
              }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(['places', 'cuisine', 'culture', 'history', 'economy', 'religion'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    const icons = { places: '🏞️', cuisine: '🍲', culture: '🎭', history: '📜', economy: '💼', religion: '🙏' };
                    const label = tab.charAt(0).toUpperCase() + tab.slice(1);
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          fontFamily: 'Imprima, sans-serif',
                          fontSize: isMobile ? '11px' : '13px',
                          fontWeight: 500,
                          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                          backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                          border: 'none',
                          padding: isMobile ? '6px 8px' : '8px 14px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {icons[tab]} {label}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsDeepDive(false)}
                  style={{
                    fontFamily: 'Imprima, sans-serif',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#ffbe85',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginLeft: '10px',
                  }}
                >
                  <span>⬅</span> {!isMobile && 'Back to Hub'}
                </button>
              </div>

              {/* SECOND LEVEL SUB-TABS (Culture, History, Economy) */}
              {(activeTab === 'culture' || activeTab === 'history' || activeTab === 'economy') && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: '14px',
                  width: '100%',
                  maxWidth: '900px',
                }}>
                  {activeTab === 'culture' && (
                    <>
                      {['festivals', 'traditions'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSubTab(sub)}
                          style={{
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            color: activeSubTab === sub ? '#000000' : 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: activeSubTab === sub ? '#ffbe85' : 'rgba(10, 6, 8, 0.65)',
                            border: activeSubTab === sub ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.22)',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.85)';
                              e.currentTarget.style.borderColor = 'rgba(255, 190, 133, 0.6)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.65)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            }
                          }}
                        >
                          {sub === 'festivals' ? '🎉 Festivals' : '🧵 Traditional Crafts'}
                        </button>
                      ))}
                    </>
                  )}

                  {activeTab === 'history' && (
                    <>
                      {['profile', 'population', 'municipalities', 'languages'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSubTab(sub)}
                          style={{
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            color: activeSubTab === sub ? '#000000' : 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: activeSubTab === sub ? '#ffbe85' : 'rgba(10, 6, 8, 0.65)',
                            border: activeSubTab === sub ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.22)',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.85)';
                              e.currentTarget.style.borderColor = 'rgba(255, 190, 133, 0.6)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.65)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            }
                          }}
                        >
                          {sub}
                        </button>
                      ))}
                    </>
                  )}

                  {activeTab === 'economy' && (
                    <>
                      {['agriculture', 'fishery', 'livestock', 'forestry', 'trade', 'minerals'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setActiveSubTab(sub)}
                          style={{
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            color: activeSubTab === sub ? '#000000' : 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: activeSubTab === sub ? '#ffbe85' : 'rgba(10, 6, 8, 0.65)',
                            border: activeSubTab === sub ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.22)',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.85)';
                              e.currentTarget.style.borderColor = 'rgba(255, 190, 133, 0.6)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSubTab !== sub) {
                              e.currentTarget.style.backgroundColor = 'rgba(10, 6, 8, 0.65)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                            }
                          }}
                        >
                          {sub === 'livestock' ? 'Livestock & Poultry' : sub === 'trade' ? 'Trade & Commerce' : sub}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* -------------------- TAB VIEW RENDERING -------------------- */}

              {/* Places Tab Content */}
              {activeTab === 'places' && (
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '20px',
                  width: '100%',
                  maxWidth: '1200px',
                  marginTop: '24px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  {PLACES_DATA.map((place) => (
                    <div
                      key={place.id}
                      style={{
                        flex: isMobile ? 'none' : '1 1 240px',
                        width: isMobile ? '100%' : 'auto',
                        maxWidth: isMobile ? '340px' : '260px',
                        backgroundColor: 'rgba(15, 10, 12, 0.75)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '380px',
                      }}
                    >
                      <div>
                        <div style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '14px',
                          backgroundImage: `url(${place.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          marginBottom: '14px',
                        }} />
                        <span style={{ fontSize: '11px', color: '#ffbe85', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                          {place.tagline}
                        </span>
                        <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '4px 0 8px' }}>
                          {place.title}
                        </h4>
                        <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '13px', lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                          {place.desc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                        <button
                          onClick={() => setSelectedItem({ ...place, type: 'places' })}
                          style={{
                            flex: 1,
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            textAlign: 'center',
                          }}
                        >
                          📖 Details
                        </button>
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#0a0608',
                            backgroundColor: '#ffbe85',
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          📍 Map
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cuisine Tab Content */}
              {activeTab === 'cuisine' && (
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '20px',
                  width: '100%',
                  maxWidth: '1200px',
                  marginTop: '24px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  {CUISINE_DATA.map((food) => (
                    <div
                      key={food.id}
                      style={{
                        flex: isMobile ? 'none' : '1 1 240px',
                        width: isMobile ? '100%' : 'auto',
                        maxWidth: isMobile ? '340px' : '260px',
                        backgroundColor: 'rgba(15, 10, 12, 0.75)',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        padding: '16px',
                        boxSizing: 'border-box',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '380px',
                      }}
                    >
                      <div>
                        <div style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '14px',
                          backgroundImage: `url(${food.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          marginBottom: '14px',
                        }} />
                        <span style={{ fontSize: '11px', color: '#ffbe85', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                          {food.tagline}
                        </span>
                        <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '4px 0 8px' }}>
                          {food.title}
                        </h4>
                        <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '13px', lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                          {food.desc}
                        </p>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <button
                          onClick={() => setSelectedItem({ ...food, type: 'cuisine' })}
                          style={{
                            width: '100%',
                            fontFamily: 'Imprima, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            textAlign: 'center',
                          }}
                        >
                          📖 View Recipe
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Culture Tab Content (Split between Festivals & Traditional Crafts) */}
              {activeTab === 'culture' && (
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '20px',
                  width: '100%',
                  maxWidth: '1200px',
                  marginTop: '24px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  {activeSubTab === 'festivals' ? (
                    FESTIVALS_DATA.map((fest) => (
                      <div
                        key={fest.id}
                        style={{
                          flex: isMobile ? 'none' : '1 1 240px',
                          width: isMobile ? '100%' : 'auto',
                          maxWidth: isMobile ? '340px' : '260px',
                          backgroundColor: 'rgba(15, 10, 12, 0.75)',
                          border: '1.5px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '20px',
                          padding: '16px',
                          boxSizing: 'border-box',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '380px',
                        }}
                      >
                        <div>
                          <div style={{
                            width: '100%',
                            height: '140px',
                            borderRadius: '14px',
                            backgroundImage: `url(${fest.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: '14px',
                          }} />
                          <span style={{ fontSize: '11px', color: '#ffbe85', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                            {fest.tagline}
                          </span>
                          <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '4px 0 8px' }}>
                            {fest.title}
                          </h4>
                          <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '13px', lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            {fest.desc}
                          </p>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                          <button
                            onClick={() => setSelectedItem({ ...fest, type: 'culture' })}
                            style={{
                              width: '100%',
                              fontFamily: 'Imprima, sans-serif',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#ffffff',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              padding: '10px',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              textAlign: 'center',
                            }}
                          >
                            📖 Read History
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    CRAFTS_DATA.map((craft) => (
                      <div
                        key={craft.id}
                        style={{
                          flex: isMobile ? 'none' : '1 1 240px',
                          width: isMobile ? '100%' : 'auto',
                          maxWidth: isMobile ? '340px' : '260px',
                          backgroundColor: 'rgba(15, 10, 12, 0.75)',
                          border: '1.5px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '20px',
                          padding: '16px',
                          boxSizing: 'border-box',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '380px',
                        }}
                      >
                        <div>
                          <div style={{
                            width: '100%',
                            height: '140px',
                            borderRadius: '14px',
                            backgroundImage: `url(${craft.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: '14px',
                          }} />
                          <span style={{ fontSize: '11px', color: '#ffbe85', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                            {craft.tagline}
                          </span>
                          <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '4px 0 8px' }}>
                            {craft.title}
                          </h4>
                          <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '13px', lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            {craft.desc}
                          </p>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                          <button
                            onClick={() => setSelectedItem({ ...craft, type: 'culture' })}
                            style={{
                              width: '100%',
                              fontFamily: 'Imprima, sans-serif',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#ffffff',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              padding: '10px',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              textAlign: 'center',
                            }}
                          >
                            📖 Read Craft details
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* History Tab Content */}
              {activeTab === 'history' && (
                <div style={{
                  width: '100%',
                  maxWidth: '900px',
                  marginTop: '24px',
                  boxSizing: 'border-box',
                  textAlign: 'left',
                  backgroundColor: 'rgba(15, 10, 12, 0.75)',
                  border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: isMobile ? '20px' : '32px',
                }}>
                  {activeSubTab === 'profile' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 16px' }}>
                        Welcome to Antique: The Land of the Hantík
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        Antique is a captivating coastal province nestled in the western section of Panay Island within the Western Visayas region. Facing the vast Sulu Sea to the west, it shares its eastern borders with the provinces of Aklan, Capiz, and Iloilo. Today, the vibrant coastal town of San Jose de Buenavista serves as both its provincial capital and its most populous center.
                      </p>
                      <h5 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '24px 0 10px' }}>
                        Roots of the Name: From Giant Ants to Spanish Chroniclers
                      </h5>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><strong>The Original Name:</strong> The province was natively known as <em>Hantík</em>, named after the large, fierce black ants that populated the island.</li>
                        <li><strong>The Spanish Evolution:</strong> When Spanish chroniclers arrived, influenced by French orthography, they recorded the name as <em>Hantique</em> (retaining a silent 'h'). This spelling was initially used for the areas surrounding the Malandog River in what is now Hamtic.</li>
                        <li><strong>The Modern Shift:</strong> Hamtic served as the province's earliest capital before shifting to Bugasong, and eventually settling in San Jose. Over time, the silent 'h' was permanently dropped, giving rise to its Kinaray-a pronunciation: <strong>Antique</strong>.</li>
                      </ul>
                    </div>
                  )}

                  {activeSubTab === 'population' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 8px' }}>
                        Population & Growth Trends
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        The population of Antique has officially reached <strong>643,173</strong> as of the July 1, 2024 Census of Population (POPCEN). This updated count reflects steady development, marking an increase of 30,199 residents since 2020.
                      </p>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '24px 0' }}>
                        <div style={{ flex: '1 1 200px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Imprima, sans-serif', textTransform: 'uppercase' }}>Current Count (2024)</span>
                          <div style={{ fontSize: '32px', color: '#ffbe85', fontFamily: 'Viaoda Libre, serif', fontWeight: 'bold', marginTop: '4px' }}>643,173</div>
                        </div>
                        <div style={{ flex: '1 1 200px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Imprima, sans-serif', textTransform: 'uppercase' }}>Average Annual Growth (2020-2024)</span>
                          <div style={{ fontSize: '32px', color: '#ffffff', fontFamily: 'Viaoda Libre, serif', fontWeight: 'bold', marginTop: '4px' }}>1.16%</div>
                        </div>
                        <div style={{ flex: '1 1 200px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Imprima, sans-serif', textTransform: 'uppercase' }}>Increase since 2020</span>
                          <div style={{ fontSize: '32px', color: '#ffffff', fontFamily: 'Viaoda Libre, serif', fontWeight: 'bold', marginTop: '4px' }}>+30,199</div>
                        </div>
                      </div>

                      <h5 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffffff', margin: '20px 0 10px' }}>
                        Historical POPCEN Milestones
                      </h5>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Imprima, sans-serif', color: 'rgba(255,255,255,0.85)' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>Census Year</th>
                            <th style={{ padding: '8px' }}>Population</th>
                            <th style={{ padding: '8px' }}>Growth Increment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px' }}>2024 Census</td>
                            <td style={{ padding: '8px', color: '#ffbe85' }}>643,173</td>
                            <td style={{ padding: '8px' }}>+30,199 (since 2020)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px' }}>2020 Census</td>
                            <td style={{ padding: '8px' }}>612,974</td>
                            <td style={{ padding: '8px' }}>+30,962 (since 2015)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px' }}>2015 Census</td>
                            <td style={{ padding: '8px' }}>582,012</td>
                            <td style={{ padding: '8px' }}>+35,981 (since 2010)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px' }}>2010 Census</td>
                            <td style={{ padding: '8px' }}>546,031</td>
                            <td style={{ padding: '8px' }}>+97,142 growth increment (2010 to 2024)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px' }}>1903 (Earliest)</td>
                            <td style={{ padding: '8px' }}>134,166</td>
                            <td style={{ padding: '8px' }}>-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeSubTab === 'municipalities' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 8px' }}>
                        The 18 Municipalities of Antique
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                        Antique thrives on an immediate, deeply ingrained system of mutual aid and kinship, with many villages averaging just 100 closely-related families (around 600 individuals).
                      </p>

                      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ color: '#ffbe85', fontFamily: 'Viaoda Libre, serif', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>Southern gateway</h5>
                          <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Imprima, sans-serif', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                            <li><strong>Anini-y:</strong> Southernmost tip, marine sanctuaries.</li>
                            <li><strong>Tobias Fornier (Dao):</strong> Coastal beauty and agriculture.</li>
                            <li><strong>Hamtic:</strong> Cradle of the name "Hantík".</li>
                            <li><strong>San Jose de Buenavista:</strong> Busy capital and economic hub.</li>
                            <li><strong>Sibalom:</strong> Known for vast mineral wealth and gemstones.</li>
                            <li><strong>Belison:</strong> Smallest town, famous for sandbars.</li>
                            <li><strong>San Remigio:</strong> Landlocked "Little Baguio" of Antique.</li>
                          </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ color: '#ffbe85', fontFamily: 'Viaoda Libre, serif', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>Central Strip</h5>
                          <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Imprima, sans-serif', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                            <li><strong>Patnongon:</strong> Coastal clay pottery and fishing.</li>
                            <li><strong>Bugasong:</strong> Home of Patadyong weaving.</li>
                            <li><strong>Valderrama:</strong> Mountainous town in Panay range.</li>
                            <li><strong>Laua-an:</strong> Muscovado sugar capital.</li>
                            <li><strong>Barbaza:</strong> Mountain trails and coastal waters.</li>
                          </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ color: '#ffbe85', fontFamily: 'Viaoda Libre, serif', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>Northern Adventures</h5>
                          <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Imprima, sans-serif', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                            <li><strong>Tibiao:</strong> White-water tubing, eco-treks, Kawa baths.</li>
                            <li><strong>Culasi:</strong> Mount Madja-as and Malalison island.</li>
                            <li><strong>Sebaste:</strong> St. Blaise shrine and cold springs.</li>
                            <li><strong>Pandan:</strong> Bugang river eco-tourism.</li>
                            <li><strong>Libertad:</strong> Sprawling Bariw mat weaving.</li>
                            <li><strong>Caluya:</strong> Coconut crabs (Tatus) and seaweed farming.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubTab === 'languages' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 16px' }}>
                        Languages of Antique
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
                        While English and Tagalog are universally understood, Antique is incredibly rich in regional languages reflecting its mountains, coasts, and isolated islands:
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Imprima, sans-serif' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <h5 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 4px' }}>1. Kinaray-a (The Heart of Antique)</h5>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            The dominant tongue characterized by unique, rolling "r" and "ə" sounds. Serves as the soul of local literature and traditional epics (sugidanon).
                          </p>
                        </div>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <h5 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 4px' }}>2. Caluyanon (The Island Dialect)</h5>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            A localized language exclusive to Caluya Island. Blends Kinaray-a with Romblomanon and Hiligaynon.
                          </p>
                        </div>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                          <h5 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 4px' }}>3. Hiligaynon (Ilonggo)</h5>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            Spoken in southern border towns and capital San Jose due to business and regional trade with neighboring Iloilo.
                          </p>
                        </div>
                        <div>
                          <h5 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 4px' }}>4. Cuyonon & Border Dialects</h5>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            Cuyonon is spoken on coastal strips facing the Sulu Sea (brought from Cuyo, Palawan). Aklanon is used near Aklan, and endangered Inati is spoken by indigenous Ati mountain tribes.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Economy Tab Content */}
              {activeTab === 'economy' && (
                <div style={{
                  width: '100%',
                  maxWidth: '900px',
                  marginTop: '24px',
                  boxSizing: 'border-box',
                  textAlign: 'left',
                  backgroundColor: 'rgba(15, 10, 12, 0.75)',
                  border: '1.5px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: isMobile ? '20px' : '32px',
                }}>
                  {activeSubTab === 'agriculture' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 12px' }}>
                        Agriculture: The Food Basket
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        Antique produces enough staple crops to maintain self-sufficiency, often generating a significant surplus to trade with neighboring provinces.
                      </p>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                        <li><strong>Palay (Rice):</strong> The primary agricultural crop. Cultivated across irrigated lowlands, rain-fed farms, and mountain terracing, with irrigated areas generating the highest yield.</li>
                        <li><strong>Copra & Coconut Farming:</strong> The second major agricultural commodity. Coconut plantations cover more than a third of the province's land. The island of Caluya and northern Pandan serve as the production core.</li>
                        <li><strong>Muscovado Sugar:</strong> Antique is celebrated for raw Muscovado sugar cane production, particularly in Laua-an.</li>
                      </ul>
                    </div>
                  )}

                  {activeSubTab === 'fishery' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 12px' }}>
                        Fishery: Coastal Lifeline
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        With a sprawling 296.8-kilometer coastline facing rich marine environments, fishing is the primary economic driver for Antique's 15 coastal municipalities.
                      </p>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', marginTop: '12px' }}>
                        Local fishermen benefit from the rich waters of the Cuyo East Pass and the Sulu Sea. The fishing season thrives year-round, peaking from December to June, with tens of thousands of households relying on fresh fish and seaweed farming.
                      </p>
                    </div>
                  )}

                  {activeSubTab === 'livestock' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 12px' }}>
                        Livestock and Poultry
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        Livestock and poultry raising operate through a balance of small-scale backyard setups and commercial systems. Consistent growth in this sector is heavily propelled by a steady expansion in domestic poultry production and local cattle raising.
                      </p>
                    </div>
                  )}

                  {activeSubTab === 'forestry' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 12px' }}>
                        Forestry & Biodiversity
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        Antique's forests offer an abundance of raw materials, yet conservation remains a top priority. Nearly 60% of Antique's forestlands are classified as protected conservation zones to safeguard its biodiversity.
                      </p>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <li><strong>Forest Products:</strong> Supplies bamboo, buri, bariw, nito, abaca, and charcoal for construction, furniture, and handicrafts.</li>
                        <li><strong>Ecological Pride:</strong> The mountains of Antique are home to the Rafflesia—one of the world's largest flowers—which proudly serves as the official provincial flower.</li>
                      </ul>
                    </div>
                  )}

                  {activeSubTab === 'trade' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 12px' }}>
                        Trade, Commerce, and Industry
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                        Antique maintains a steady flow of trade, exporting local raw goods and importing commercial necessities.
                      </p>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <li><strong>Key Exports:</strong> Raw palay, processed rice, copra, muscovado sugar, legumes, seafood, seaweed, and hand-crafted products.</li>
                        <li><strong>Key Imports:</strong> Construction materials, dry goods, groceries, and agricultural fertilizers.</li>
                        <li><strong>Commercial Hubs:</strong> San Jose acts as the primary business center. Culasi serves as the major commercial hub for the northern municipalities.</li>
                        <li><strong>Connectivity:</strong> Antique Airport (Evelio Javier Airport) in San Jose bridges the province to major cities, accelerating commerce and tourism.</li>
                      </ul>
                    </div>
                  )}

                  {activeSubTab === 'minerals' && (
                    <div>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '28px', color: '#ffbe85', margin: '0 0 16px' }}>
                        Mineral and Energy Wealth
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
                        Antique possesses massive reserves of both metallic and non-metallic mineral resources, making it a critical player in regional industry and energy production:
                      </p>
                      
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Imprima, sans-serif', color: 'rgba(255,255,255,0.85)' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>Resource Type</th>
                            <th style={{ padding: '8px' }}>Specific Resources</th>
                            <th style={{ padding: '8px' }}>Notable Locations & Estimates</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: '#ffbe85' }}>Metallic: Copper & Pyrite</td>
                            <td style={{ padding: '8px' }}>Copper, Pyrite, Iron, Manganese</td>
                            <td style={{ padding: '8px' }}>Barbaza & San Remigio (Copper); Valderrama & Sibalom (Pyrite)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: '#ffbe85' }}>Metallic: Gold & Chromite</td>
                            <td style={{ padding: '8px' }}>Gold, Chromite</td>
                            <td style={{ padding: '8px' }}>Mt. Dumara in Laua-an extending to Barbaza (High-grade traces)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: '#ffbe85' }}>Non-Metallic: Coal (Energy)</td>
                            <td style={{ padding: '8px' }}>Coal</td>
                            <td style={{ padding: '8px' }}>Semirara Island, Caluya (Major Philippine energy source)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: '#ffbe85' }}>Non-Metallic: Limestone & Marble</td>
                            <td style={{ padding: '8px' }}>Limestone, Marble</td>
                            <td style={{ padding: '8px' }}>Culasi (Est. 30 billion metric tons); Libertad & Pandan (Est. billions of metric tons)</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold', color: '#ffbe85' }}>Non-Metallic: Petroleum & Clay</td>
                            <td style={{ padding: '8px' }}>Oil, Clay, Gemstones</td>
                            <td style={{ padding: '8px' }}>Maniguin Island in Culasi (Oil indications); Patnongon (Clay pottery); Sibalom (Gemstones)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Religion Tab Content */}
              {activeTab === 'religion' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  width: '100%',
                  maxWidth: '1200px',
                  marginTop: '24px',
                  textAlign: 'left',
                }}>
                  {/* Historic Churches Row */}
                  <div>
                    <h3 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '24px', color: '#ffbe85', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
                      ⛪ Historic Churches & Sanctuary Landmarks
                    </h3>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                      {CHURCHES_DATA.map((ch) => (
                        <div
                          key={ch.id}
                          style={{
                            flex: isMobile ? 'none' : '1 1 240px',
                            width: isMobile ? '100%' : 'auto',
                            maxWidth: isMobile ? '340px' : '260px',
                            backgroundColor: 'rgba(15, 10, 12, 0.75)',
                            border: '1.5px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '20px',
                            padding: '16px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '340px',
                          }}
                        >
                          <div>
                            <div style={{
                              width: '100%',
                              height: '130px',
                              borderRadius: '12px',
                              backgroundImage: `url(${ch.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              marginBottom: '12px',
                            }} />
                            <span style={{ fontSize: '10px', color: '#ffbe85', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                              {ch.tagline}
                            </span>
                            <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '18px', color: '#ffffff', margin: '4px 0 8px' }}>
                              {ch.title}
                            </h4>
                          </div>

                          <button
                            onClick={() => setSelectedItem({ ...ch, type: 'religion' })}
                            style={{
                              width: '100%',
                              fontFamily: 'Imprima, sans-serif',
                              fontSize: '12px',
                              fontWeight: 500,
                              color: '#ffffff',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              padding: '10px',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              textAlign: 'center',
                              marginTop: '12px',
                            }}
                          >
                            📖 Read Sanctuary History
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Religious Celebrations & Folk Beliefs Grid */}
                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                    <div style={{ flex: 1, backgroundColor: 'rgba(15, 10, 12, 0.75)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px' }}>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffbe85', margin: '0 0 12px' }}>
                        🌿 Religious Celebrations
                      </h4>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><strong>Holy Week (Semana Santa):</strong> Highly observed with Palm Sunday processions, Visita Iglesia, Passion plays (Senakulo), and Good Friday processions.</li>
                        <li><strong>Christmas Season:</strong> Features Simbang Gabi dawn masses, nativity displays (Belen), and traditional family gatherings.</li>
                        <li><strong>Flores de Mayo & Santacruzan:</strong> Floral offerings to the Virgin Mary and colourful parades featuring local festival queens.</li>
                      </ul>
                    </div>

                    <div style={{ flex: 1, backgroundColor: 'rgba(15, 10, 12, 0.75)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px' }}>
                      <h4 style={{ fontFamily: 'Viaoda Libre, serif', fontSize: '20px', color: '#ffbe85', margin: '0 0 12px' }}>
                        🌄 Indigenous & Folk Beliefs
                      </h4>
                      <p style={{ fontFamily: 'Imprima, sans-serif', fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', margin: '0 0 10px' }}>
                        Before Christianity, early Antiqueños practiced animist beliefs centered on nature spirits (diwata) and ancestral respect. Some traditions still exist:
                      </p>
                      <ul style={{ fontFamily: 'Imprima, sans-serif', fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>Belief in diwata (nature spirits) guarding mountains and rivers.</li>
                        <li>Respect for sacred mountains like Mt. Madja-as.</li>
                        <li>Spiritual cleansing and healing rituals performed by local healers (albularyos).</li>
                        <li>Herbal medicine combined with folk prayers.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ==========================================
            ITEM DETAIL DRAWER (Overlay) - zIndex: 100
            ========================================== */}
        {selectedItem && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out',
          }}>
            <div 
              onClick={() => setSelectedItem(null)} 
              style={{ position: 'absolute', inset: 0, zIndex: 0 }} 
            />

            {/* Drawer Container */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              width: isMobile ? '100%' : '500px',
              height: '100%',
              backgroundColor: '#0c080a',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              padding: isMobile ? '24px' : '40px',
              overflowY: 'auto',
            }}>
              {/* Close header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', color: '#ffbe85', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Imprima, sans-serif' }}>
                  Antique’s {selectedItem.type}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#ffffff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Large Image */}
              <div style={{
                width: '100%',
                height: '220px',
                borderRadius: '18px',
                backgroundImage: `url(${selectedItem.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }} />

              {/* YouTube Video Player Embed */}
              {selectedItem.youtubeId && (
                <div style={{
                  width: '100%',
                  height: '220px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedItem.youtubeId}`}
                    title={`${selectedItem.title} Video`}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Heading */}
              <h3 style={{
                fontFamily: 'Viaoda Libre, serif',
                fontSize: '32px',
                color: '#ffffff',
                lineHeight: 1.1,
                margin: '0 0 4px',
              }}>
                {selectedItem.title}
              </h3>
              <p style={{
                fontFamily: 'Imprima, sans-serif',
                fontSize: '15px',
                color: '#ffbe85',
                margin: '0 0 20px',
                fontWeight: 500,
              }}>
                {selectedItem.tagline}
              </p>

              {/* Details body */}
              <div style={{
                fontFamily: 'Imprima, sans-serif',
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <p style={{ margin: 0 }}>{selectedItem.desc}</p>

                {/* Quick Facts */}
                {selectedItem.quickFacts && (
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <h5 style={{ margin: '0 0 10px', color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>Quick Facts</h5>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedItem.quickFacts.map((fact: string, idx: number) => (
                        <li key={idx} style={{ color: 'rgba(255,255,255,0.75)' }}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ingredients & Heritage for cuisine */}
                {selectedItem.type === 'cuisine' && (
                  <>
                    {selectedItem.ingredients && (
                      <div style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}>
                        <h5 style={{ margin: '0 0 10px', color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>Key Ingredients</h5>
                        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedItem.ingredients.map((ingredient: string, idx: number) => (
                            <li key={idx} style={{ color: 'rgba(255,255,255,0.75)' }}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedItem.heritage && (
                      <div>
                        <h5 style={{ margin: '0 0 6px', color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>Cultural Heritage</h5>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.5 }}>{selectedItem.heritage}</p>
                      </div>
                    )}
                  </>
                )}

                {/* History for culture & churches */}
                {(selectedItem.type === 'culture' || selectedItem.type === 'religion') && selectedItem.history && (
                  <div>
                    <h5 style={{ margin: '0 0 6px', color: '#ffffff', fontSize: '15px', fontWeight: 600 }}>Historical & Cultural Meaning</h5>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.5 }}>{selectedItem.history}</p>
                  </div>
                )}
              </div>

              {/* Action Maps Button */}
              {selectedItem.mapsUrl && (
                <div style={{ marginTop: 'auto', paddingTop: '35px' }}>
                  <a
                    href={selectedItem.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      fontFamily: 'Imprima, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0a0608',
                      backgroundColor: '#ffbe85',
                      padding: '14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                      boxShadow: '0 4px 16px rgba(255, 190, 133, 0.25)',
                    }}
                  >
                    📍 Open in Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Audio Controller (z-index: 150) */}
        <button
          onClick={toggleMute}
          title={isMuted ? "Unmute Ocean Waves" : "Mute Ocean Waves"}
          style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '24px',
            right: isMobile ? '16px' : '24px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 10, 12, 0.75)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            zIndex: 150,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 190, 133, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '18px' }}>
              <div className="bar bar-anim-1" style={{ height: '8px' }} />
              <div className="bar bar-anim-2" style={{ height: '14px' }} />
              <div className="bar bar-anim-3" style={{ height: '11px' }} />
              <div className="bar bar-anim-4" style={{ height: '6px' }} />
            </div>
          )}
        </button>

      </div>
    </div>
  );
}
