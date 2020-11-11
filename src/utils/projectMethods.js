import inm from '../data/inmobiliarias.json';

export const inmobiliarias = inm.features.map((doc) => ({ id: doc.id, ...doc.properties }));

export const inmobiliariasById = (id) => inmobiliarias.filter((i) => i.id === id)[0];
