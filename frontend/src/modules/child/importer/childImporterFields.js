import model from 'modules/child/childModel';

const { fields } = model;

export default [
  fields.owner,
  fields.name,
  fields.type,
  // fields.breed,
  fields.size,
  fields.bookings,
];
