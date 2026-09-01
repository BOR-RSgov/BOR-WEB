// server/controllers/base.controller.js
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import BaseService from "../services/base.service.js";

/**
 * Generates standard CRUD controller methods for any Mongoose model.
 * @param {Model} model - the Mongoose model
 * @param {string} label - human-readable name for messages, e.g. "Department"
 * @param {string} populate - optional field(s) to populate on list/getOne
 */
export const createBaseController = (model, label, populate = "") => {
  const service = new BaseService(model);

  return {
    getAll: asyncHandler(async (req, res) => {
      const data = await service.getAll(req.query, populate);
      res.status(200).json(new ApiResponse(200, `${label}s fetched successfully`, data));
    }),

    getOne: asyncHandler(async (req, res) => {
      const data = await service.getById(req.params.id);
      res.status(200).json(new ApiResponse(200, `${label} fetched successfully`, data));
    }),

    create: asyncHandler(async (req, res) => {
      const data = await service.create({ ...req.body, createdBy: req.user._id });
      res.status(201).json(new ApiResponse(201, `${label} created successfully`, data));
    }),

    update: asyncHandler(async (req, res) => {
      const data = await service.update(req.params.id, req.body);
      res.status(200).json(new ApiResponse(200, `${label} updated successfully`, data));
    }),

    remove: asyncHandler(async (req, res) => {
      await service.softDelete(req.params.id);
      res.status(200).json(new ApiResponse(200, `${label} deleted successfully`, null));
    }),
  };
};