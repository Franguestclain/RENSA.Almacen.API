/**
 * TODO:
 * - Implement pagination
 * - Make response codes
 */
import Material from '../models/Material';

/**
 * GET Materials
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns all the materials
 *
 */
const getMaterials = async (req, res) => {
  const materials = await Material.find({ isVisible: true });
  res.json(materials);
};

/**
 * Get material by id
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It returns an especific material
 *
 */
const getMaterialById = async (req, res) => {
  const { id } = req.params;
  const material = await Material.findById(id);
  res.json(material);
};

/**
 * Create Material
 *
 * @param {Object} req The request object
 *
 * It creates a new material or updates an existing one that is not visible
 *
 */
const createMaterial = async (req) => {
  const { name, description, quantity } = req.body;

  const existsMaterial = await Material.exists({ name });
  // If the material was removed logically and we want to create an existing one (but not visible)
  // then we just update the isVisible property
  if (existsMaterial) {
    const updatedMaterial = await Material.findByIdAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      existsMaterial?._id,
      { isVisible: true, description, quantity },
      { new: true },
    );

    return updatedMaterial;
  }

  const newMaterial = new Material({ name, description, quantity });
  await newMaterial.save();

  return newMaterial;
};

/**
 * Updates Material
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It updates an especific material
 *
 */
const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  try {
    const materialUpdated = await Material
      .findByIdAndUpdate(id, { name, description, quantity }, { new: true });
    res.json(materialUpdated);
  } catch (e) {
    // TODO: Logg mongo error
    res.json(e);
  }
};

/**
 * Deletes Material
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 *
 * It deletes an especific material logically
 *
 */
const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Material.exists({ _id: id });
    if (!exists) throw new Error("Material doesn't exists");

    await Material.findByIdAndUpdate(id, { isVisible: false });
    res.json({ success: true, message: 'Material erased correctly' });
  } catch (e) {
    res.json({ success: false, message: e });
  }
};

export default {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
