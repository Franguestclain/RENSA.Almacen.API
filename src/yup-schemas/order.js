import {
  object, string, number, array,
} from 'yup';

const orderSchema = object().shape({
  materials: array().of(
    object().shape({
      quantity: number().required().positive(),
      description: string().required(),
      ot: string().required(),
      equipment: string().required(),
      client: object().shape({
        name: string(),
      }),
      requestedArea: string(),
      price: number(),
      providerDocument: object().shape({
        name: string(),
      }),
      priority: string().required(),
    }),
  ),
});

export default orderSchema;
