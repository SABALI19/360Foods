import BananaBread from '../assets/loaf-banana-bread-with-walnuts-peanuts.jpg'

export const productCategories = [
  'All',
  'Bread',
  'Pie',
  'Cakes',
  'Drinks',
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
    id: 'banana-loaf',
    name: 'Banana Loaf',
    weight: '1.9kg',
    price: 34,
    category: 'Bread',
    imageSrc: BananaBread,
    imageAlt: 'Loaf banana bread with walnuts and peanuts',
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
    imageAlt: 'Black forest pie loaf placeholder',
  },
  {
    id: 'chocolate-cake',
    name: 'chocolate cake',
    weight: '1.7kg',
    price: 40,
    category: 'Cakes',
    imageSrc: BananaBread,
    imageAlt: 'Strawberry cake loaf placeholder',
  },
  {
    id: 'italian-sponge',
    name: 'Italian Sponge',
    weight: '4kg',
    price: 57.5,
    accent: true,
    category: 'Cakes',
    imageSrc: BananaBread,
    imageAlt: 'Italian sponge loaf placeholder',
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
]
