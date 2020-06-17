import model from 'modules/child/childModel';

const { fields } = model;

export default [
  fields.id,
  fields.owner,
  fields.name,
  fields.type,
  // fields.breed,
  fields.size,
  fields.createdAt,
  fields.updatedAt,
];
