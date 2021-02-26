import inm from '../data/inmobiliarias.json';
import { getAllProjects } from '../firebase/database';

export const inmobiliarias = inm.features.map((doc) => (
  { id: doc.id, ...doc.properties, geometry: doc.geometry }));

export const getAllProjectsTotal = () => getAllProjects().then((projects) => {
  const inmobiliariasJson = inm.features.map((e) => ({
    properties: { id: e.id, ...e.properties },
    geometry: e.geometry,
  }));
  return inmobiliariasJson.concat(projects).reverse();
});

export const inmobiliariasById = (id) => inmobiliarias.filter((i) => i.id === id)[0];

// export const getMinPrice = (inmobiliarias) => {
//   const order = inmobiliarias.sort((a, b) => {
//     if (a.min_price > b.min_price) {
//       return 1;
//     }
//     if (a.min_price < b.min_price) {
//       return -1;
//     }
//     return 0;
//   });
//   return order[0].min_price;
// };

// export const getMaxPrice = (inmobiliarias) => {
//   const order = inmobiliarias.sort((a, b) => {
//     if (a.min_price < b.min_price) {
//       return 1;
//     }
//     if (a.min_price > b.min_price) {
//       return -1;
//     }
//     return 0;
//   });
//   return order[0].min_price;
// };
