import Client from '../models/Client';

/**
 * GET Clients
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns all the clients
 *
 */
const getClients = async (req, res) => {
  const results = await Client.find({ isVisible: true });
  res.json(results);
};

/**
 * GET a Client
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns a client by its id
 *
 */
const getClientById = async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  res.json(client);
};

/**
 * Create a Client
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It creates a new client or updates the visibility of an existing one
 *
 */
const createClient = async (req) => {
  const { name } = req.body;
  const existsClient = await Client.exists({ name });
  // If the client was removed logically and we want to create an existing one (but not visible)
  // then we just update the isVisible property
  if (existsClient) {
    const updatedClient = await Client.findByIdAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      existsClient?._id,
      { isVisible: true },
      { new: true },
    );

    return updatedClient;
  }

  const newClient = new Client({ name });
  await newClient.save();

  return newClient;
};

/**
 * Updates a client
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It updates an especific client
 *
 */
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const clientUpdated = await Client
      .findByIdAndUpdate(id, { name }, { new: true });
    res.json(clientUpdated);
  } catch (e) {
    // TODO: Logg mongo error
    res.json(e);
  }
};

/**
 * Deletes Client
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It deletes an especific client logically
 *
 */
const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Client.exists({ _id: id });
    if (!exists) throw new Error("Client doesn't exists");

    await Client.findByIdAndUpdate(id, { isVisible: false });
    res.json({ success: true, message: 'Client erased correctly' });
  } catch (e) {
    // TODO: Logg mongo error
    res.json({ success: false, message: 'Couldnt delete the client' });
  }
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
