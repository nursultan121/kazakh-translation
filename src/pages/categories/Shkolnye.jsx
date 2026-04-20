const products = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `ШКОЛЬНЫЙ СТУЛ ${i + 1}`,
  img: `/img/pagesecond/stulya/shkolnye/stul${i + 1}.png`,
  description: 'Эргономичный школьный стул со стойкой конструкцией, лёгким уходом и устойчивой посадкой для учебных классов.',
  material: ['Синтепон', 'Мягкая поверхность', 'Велкор', 'Пластмассовые ножки'],
  size: '400x400x850',
  colors: [
    { name: 'Оранжевый', hex: '#FF6600' },
    { name: 'Бежевый', hex: '#F5DEB3' },
    { name: 'Тёмно-зелёный', hex: '#1B4D3E' },
    { name: 'Серый', hex: '#888888' },
  ],
  article: `L.Me-SH.UN.${400 + i}`,
}))

export default function Shkolnye() {
  return (
    <ProductList
      products={products}
      title="Школьные стулья"
      backPath="/secondpage/stulya"
      backLabel="Стулья"
    />
  )
}