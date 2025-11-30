export const categories = [
  { id: 1, name: 'Электроника', icon: '📱' },
  { id: 2, name: 'Одежда', icon: '👕' },
  { id: 3, name: 'Дом и сад', icon: '🏠' },
  { id: 4, name: 'Спорт', icon: '⚽' },
  { id: 5, name: 'Красота', icon: '💄' },
  { id: 6, name: 'Автомобили', icon: '🚗' },
  { id: 7, name: 'Книги', icon: '📚' },
  { id: 8, name: 'Игрушки', icon: '🧸' },
];

export const products = [
  { 
    id: 1, 
    name: 'Смартфон iPhone 15', 
    price: 65000, 
    image: 'https://ir-3.ozone.ru/s3/multimedia-t/c1000/6794679845.jpg', 
    images: [
      "https://ir-3.ozone.ru/s3/multimedia-t/c1000/6794679845.jpg",
      "https://avatars.mds.yandex.net/get-mpic/12371932/img_id3188716444669869023.png/optimize", 
      "https://avatars.mds.yandex.net/get-mpic/11417897/img_id5219138018368777249.png/optimize"
    ],
    category: 'Электроника',
    description: 'Новейший смартфон Apple с улучшенной камерой и производительностью'
  },
  { 
    id: 2, 
    name: 'Ноутбук MacBook Pro', 
    price: 180000, 
    image: 'https://images.uzum.uz/culo2qmi4n324lr9k8cg/original.jpg', 
    images: [
      "https://images.uzum.uz/culo2qmi4n324lr9k8cg/original.jpg",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg"
    ],
    category: 'Электроника',
    description: 'Профессиональный ноутбук для работы и творчества'
  },
  { 
    id: 3, 
    name: 'Наушники Sony WH-1000XM5', 
    price: 25000, 
    image: 'https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg', 
    images: [
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled"
    ],
    category: 'Электроника',
    description: 'Беспроводные наушники с активным шумоподавлением'
  },
  { 
    id: 4, 
    name: 'Планшет iPad Air', 
    price: 65000, 
    image: 'https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg', 
    images: [
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg"
    ],
    category: 'Электроника',
    description: 'Легкий и мощный планшет для работы и развлечений'
  },
  { 
    id: 5, 
    name: 'Мужская куртка', 
    price: 8500, 
    image: 'https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled', 
    images: [
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg"
    ],
    category: 'Одежда',
    description: 'Стильная демисезонная куртка из качественных материалов'
  },
  { 
    id: 6, 
    name: 'Женские кроссовки Nike', 
    price: 12000, 
    image: 'https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg', 
    images: [
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled"
    ],
    category: 'Одежда',
    description: 'Комфортные спортивные кроссовки для активного образа жизни'
  },
  { 
    id: 7, 
    name: 'Кофеварка Delonghi', 
    price: 15000, 
    image: 'https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg', 
    images: [
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg"
    ],
    category: 'Дом и сад',
    description: 'Автоматическая кофеварка для приготовления эспрессо'
  },
  { 
    id: 8, 
    name: 'Велосипед горный', 
    price: 45000, 
    image: 'https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled', 
    images: [
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg"
    ],
    category: 'Спорт',
    description: 'Надежный горный велосипед для активного отдыха'
  },
  { 
    id: 9, 
    name: 'Парфюм Chanel', 
    price: 7500, 
    image: 'https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg', 
    images: [
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled"
    ],
    category: 'Красота',
    description: 'Изысканный французский парфюм с долгим шлейфом'
  },
  { 
    id: 10, 
    name: 'Автомобильные шины', 
    price: 32000, 
    image: 'https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg', 
    images: [
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg"
    ],
    category: 'Автомобили',
    description: 'Качественные всесезонные шины для легковых автомобилей'
  },
  { 
    id: 11, 
    name: 'Роман "Мастер и Маргарита"', 
    price: 850, 
    image: 'https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled', 
    images: [
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg"
    ],
    category: 'Книги',
    description: 'Классическое произведение русской литературы'
  },
  { 
    id: 12, 
    name: 'Конструктор LEGO', 
    price: 5500, 
    image: 'https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg', 
    images: [
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled"
    ],
    category: 'Игрушки',
    description: 'Развивающий конструктор для детей от 6 лет'
  },
  { 
    id: 13, 
    name: 'Умные часы Apple Watch', 
    price: 35000, 
    image: 'https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg', 
    images: [
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg"
    ],
    category: 'Электроника',
    description: 'Смарт-часы с множеством функций для здоровья и фитнеса'
  },
  { 
    id: 14, 
    name: 'Платье летнее', 
    price: 4500, 
    image: 'https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled', 
    images: [
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled",
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg"
    ],
    category: 'Одежда',
    description: 'Легкое летнее платье из натуральных тканей'
  },
  { 
    id: 15, 
    name: 'Набор кухонных ножей', 
    price: 8900, 
    image: 'https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg', 
    images: [
      "https://images.hdqwalls.com/download/colorful-abstraction-waves-4k-l1-2880x1800.jpg",
      "https://weareallconnected.ru/wp-content/uploads/2021/03/alextooth-passage-1-0d461df9-okam.jpg",
      "https://masterpiecer-images.s3.yandex.net/e5de9de62a7711ee96e882f3eb491ca0:upscaled"
    ],
    category: 'Дом и сад',
    description: 'Профессиональный набор острых кухонных ножей'
  },
];

export const getCategoryNames = () => {
  return ['Все', ...categories.map(cat => cat.name)];
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (categoryName) => {
  if (categoryName === 'Все') return products;
  return products.filter(product => product.category === categoryName);
};