import Area from '../models/Area';

/**
 * GET areas
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns all the areas
 *
 */
const getAreas = async (req, res) => {
  const results = await Area.find({ isVisible: true });
  res.json(results);
};

/**
 * GET a area
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns a area by its id
 *
 */
const getAreaById = async (req, res) => {
  const { id } = req.params;
  const area = await Area.findById(id);
  res.json(area);
};

/**
 * Create a Area
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It creates a new Area or updates the visibility of an existing one
 *
 */
const createArea = async (req) => {
  const { name } = req.body;
  const existsArea = await Area.exists({ name });
  // If the Area was removed logically and we want to create an existing one (but not visible)
  // then we just update the isVisible property
  if (existsArea) {
    const updatedArea = await Area.findByIdAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      existsArea?._id,
      { isVisible: true },
      { new: true },
    );

    return updatedArea;
  }

  const newArea = new Area({ name });
  await newArea.save();

  return newArea;
};

/**
 * Updates a Area
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It updates an especific Area
 *
 */
const updateArea = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const areaUpdated = await Area
      .findByIdAndUpdate(id, { name }, { new: true });
    res.json(areaUpdated);
  } catch (e) {
    // TODO: Logg mongo error
    res.json(e);
  }
};

/**
 * Deletes Area
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It deletes an especific Area logically
 *
 */
const deleteArea = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Area.exists({ _id: id });
    if (!exists) throw new Error("Area doesn't exists");

    await Area.findByIdAndUpdate(id, { isVisible: false });
    res.json({ success: true, message: 'Area erased correctly' });
  } catch (e) {
    // TODO: Logg mongo error
    res.json({ success: false, message: 'Couldnt delete the Area' });
  }
};

export default {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
