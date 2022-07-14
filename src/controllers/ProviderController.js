import Provider from '../models/Provider';

/**
 * GET providers
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns all the providers
 *
 */
const getProviders = async (req, res) => {
  const results = await Provider.find({ isVisible: true });
  res.json(results);
};

/**
 * GET a provider
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns a provider by its id
 *
 */
const getProviderById = async (req, res) => {
  const { id } = req.params;
  const provider = await Provider.findById(id);
  res.json(provider);
};

/**
 * Create a provider
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It creates a new provider or updates the visibility of an existing one
 *
 */
const createProvider = async (req) => {
  const { name } = req.body;
  const existsProvider = await Provider.exists({ name });
  // If the Provider was removed logically and we want to create an existing one (but not visible)
  // then we just update the isVisible property
  if (existsProvider) {
    const updatedProvider = await Provider.findByIdAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      existsProvider?._id,
      { isVisible: true },
      { new: true },
    );

    return updatedProvider;
  }

  const newProvider = new Provider({ name });
  await newProvider.save();

  return newProvider;
};

/**
 * Updates a provider
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It updates an especific provider
 *
 */
const updateProvider = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const providerUpdated = await Provider
      .findByIdAndUpdate(id, { name }, { new: true });
    res.json(providerUpdated);
  } catch (e) {
    // TODO: Logg mongo error
    res.json(e);
  }
};

/**
 * Deletes provider
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It deletes an especific provider logically
 *
 */
const deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Provider.exists({ _id: id });
    if (!exists) throw new Error("Provider doesn't exists");

    await Provider.findByIdAndUpdate(id, { isVisible: false });
    res.json({ success: true, message: 'Provider erased correctly' });
  } catch (e) {
    // TODO: Logg mongo error
    res.json({ success: false, message: 'Couldnt delete the Provider' });
  }
};

export default {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
};
