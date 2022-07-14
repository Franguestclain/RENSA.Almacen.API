import { object, string } from 'yup';

const areaSchema = object({
  name: string().required(),
});

export default areaSchema;
