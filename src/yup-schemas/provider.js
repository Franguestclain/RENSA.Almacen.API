import { object, string } from 'yup';

const providerSchema = object({
  name: string().required(),
});

export default providerSchema;
