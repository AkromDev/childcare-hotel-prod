import model from 'modules/booking/bookingModel';

const { fields } = model;

export default [
  fields.owner,
  fields.child,
  fields.arrival,
  fields.departure,
  fields.clientNotes,
  fields.employeeNotes,
  fields.photos,
  fields.status,
  fields.cancellationNotes,
  fields.fee,
  fields.receipt,
];
