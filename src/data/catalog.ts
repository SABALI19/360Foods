import BananaBread from '../assets/loaf-banana-bread-with-walnuts-peanuts.jpg'
// import ChocolateBread from '../assets/chocolate-bread.jpeg'
import BananaCake from '../assets/banana-cake.jpeg'
import Bread4 from '../assets/bread4.jpeg'
import CoconutBreadMixfruits from '../assets/coconut-mixfruit.jpeg'
import MoltenChocoBread from '../assets/molten-chocoBread.jpeg'
import CoconutBread from '../assets/coconut-bread.jpeg'
import OreoBread from '../assets/Oreo-Bread.jpeg'


export const productCategories = [
  'All',
  'Breakfast',
  'Bread',
  'Pie',
  'Cakes',
  'Drinks',
  'Pastry',
  'Salad',
  'Lunch Pack',
] as const

export type ProductCategory = (typeof productCategories)[number]

export type Product = {
  id: string
  name: string
  weight: string
  price: number
  featured?: boolean
  accent?: boolean
  category: Exclude<ProductCategory, 'All'>
  imageSrc?: string
  imageAlt: string
}

export const products: Product[] = [
  {
    id: 'banana-cake',
    name: 'Banana Cake',
    weight: '1.7kg',
    price: 40,
    featured: true,
    category: 'Cakes',
    imageSrc: BananaCake,
    imageAlt: 'Banana cake loaf ',
  },
  {
    id: 'coconut-loaf',
    name: 'Coconut bread',
    weight: '1.9kg',
    price: 34,
    featured: true,
    category: 'Bread',
    imageSrc: CoconutBread,
    imageAlt: 'Coconut bread',
  },
  {
    id: 'cheese-pie',
    name: 'cheese pie',
    weight: '0.8kg',
    price: 31.95,
    featured: true,
    accent: true,
    category: 'Pie',
    imageSrc: BananaBread,
    imageAlt: 'Black forest pie loaf ',
  },
  {
    id: 'molten-chocolate-bread',
    name: 'Molten Chocolate Bread',
    weight: '1.9kg',
    price: 38,
    featured: true,
    accent: true,
    category: 'Bread',
    imageSrc: MoltenChocoBread,
    imageAlt: 'Molten chocolate bread ',
  },
  {
    id: ' coconut-mix-fruit-bread',
    name: 'Coconut Mix Fruit Bread',
    weight: '1.7kg',
    price: 40,
    featured: true,
    category: 'Bread',
    imageSrc: CoconutBreadMixfruits,
    imageAlt: 'Coconut mix fruit bread ',
  },
  {
    id: 'Bread-4',
    name: 'Short Bread',
    weight: '4kg',
    price: 57.5,
    featured: true,
    accent: true,
    category: 'Bread',
    imageSrc: Bread4,
    imageAlt: 'Short bread',
  },
  {
    id: 'zobo-drink',
    name: 'ZOBO drink',
    weight: '500ml',
    price: 12,
    category: 'Drinks',
    imageSrc: BananaBread,
    imageAlt: 'Green detox drink placeholder',
  },
  {
    id: 'Oreo-bread',
    name: 'Oreo Bread',
    weight: '1.9kg',
    price: 34,
    featured: true,
    category: 'Bread',
    imageSrc: OreoBread,
    imageAlt: 'Oreo bread',
  },
]
