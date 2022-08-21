import Order from '../models/Order';

/**
 * GET Orders
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns all the Orders
 *
 */
const getOrders = async (req, res) => {
  let orders = null;
  const { type } = req.query;
  if (type === 'FINISHED') {
    orders = await Order.find({ status: 'FINISHED' });
  } else {
    orders = await Order.find({ status: ['PENDING', 'IN_PROGRESS'] });
  }
  res.json(orders);
};

/**
 * GET Order
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns an Order by Id
 *
 */
const getOrder = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.findById(id);
  res.json(orders);
};

/**
 * POST Order
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * Creates an order
 *
 * Body = {
 *  materials: [...]
 * }
 *
 */
const createOrder = async (req) => {
  const order = req.body;

  const newOrder = new Order(order);
  await newOrder.save();
  return newOrder;
};

/**
 * Updates material inside order
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It updates an especific material inside the order
 *
 */
const updateMaterialInOrder = async (req, res) => {
  const { orderId, materialId } = req.params;
  const material = req.body;
  try {
    const order = await Order.findById(orderId);
    order.materials = order.materials
      // eslint-disable-next-line no-underscore-dangle
      .map((m) => (m._id === materialId ? { ...m, ...material } : m));

    const orderUpdated = await order.save();

    res.json(orderUpdated);
  } catch (e) {
    // TODO: Logg mongo error
    res.json(e);
  }
};

export default {
  getOrders,
  getOrder,
  createOrder,
  updateMaterialInOrder,
};
