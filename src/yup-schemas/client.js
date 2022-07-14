import { object, string } from 'yup';

const clientSchema = object({
  name: string().required(),
});

export default clientSchema;
