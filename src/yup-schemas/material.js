import { object, string, number } from 'yup';

const materialSchema = object({
  name: string().required(),
  description: string(),
  quantity: number().positive().default(1),
});

export default materialSchema;
