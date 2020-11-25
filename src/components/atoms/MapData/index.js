import {
  dummymap1, dummymap2, dummycoffe2, dummycoffe3, dummycoffe4
} from '../../../assets';

const Images = [
  { image: dummymap1 },
  { image: dummymap2 },
  { image: dummycoffe2 },
  { image: dummycoffe3 },
  { image: dummycoffe4 }
];

export const markers = [
  {
    coordinate: {
      latitude: -7.388314,
      longitude: 110.916443,
    },
    title: 'Medusa Coffee',
    description: 'This is the best coffee shop for a bitch',
    address: 'Pentil Street, Alaska. 128',
    image: Images[0].image,
  },
  {
    coordinate: {
      latitude: -7.380612,
      longitude: 110.914768,
    },
    title: 'Tempik Coffee',
    description: 'Coldplay is sucks, more than screamo',
    address: '1600 Pennsylvania Avenue, Washington DC',
    image: Images[1].image,
  },
  {
    coordinate: {
      latitude: -7.385810,
      longitude: 110.906850,
    },
    title: 'Rumah Posong Coffee',
    description: 'This is the best food place',
    address: '350 Fifth Avenue New York, NY 10118',
    image: Images[2].image,
  },
  {
    coordinate: {
      latitude: -7.376896,
      longitude: 110.908692,
    },
    title: 'Pentil Coffee',
    description: 'Hardcore 90s straight edge',
    address: 'Bookingham Peler, London, England',
    image: Images[3].image,
  },
  {
    coordinate: {
      latitude: -7.381263,
      longitude: 110.904371,
    },
    title: 'Exelco Coffee',
    description: 'Bukan punya bill gates',
    address: 'Manger Square, Bethlehem, West Bank',
    image: Images[4].image,
  },
];
