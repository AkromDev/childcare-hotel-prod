import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.child.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.child.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToOneField('owner', label('owner'), {
    required: true,
  }),
  name: new StringField('name', label('name'), {
    required: true,
    max: 255,
  }),
  type: new EnumeratorField(
    'type',
    label('type'),
    [
      { id: 'boy', label: enumeratorLabel('type', 'boy') },
      {
        id: 'girl',
        label: enumeratorLabel('type', 'girl'),
      },
    ],
    {
      required: true,
    },
  ),
  // breed: new StringField('breed', label('breed'), {
  //   required: true,
  //   max: 255,
  // }),
  size: new EnumeratorField(
    'size',
    label('size'),
    [
      {
        id: 'toddler',
        label: enumeratorLabel('size', 'toddler'),
      },
      {
        id: 'preschooler',
        label: enumeratorLabel('size', 'preschooler'),
      },
      {
        id: 'schoolAged',
        label: enumeratorLabel('size', 'schoolAged'),
      },
    ],
    {
      required: true,
    },
  ),
  bookings: new RelationToManyField(
    'bookings',
    label('bookings'),
    {},
  ),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
};

export default {
  fields,
};
