import ApiError from "../utils/ApiError.js";

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(query = {}, populate = "") {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";
    const sortField = query.sortBy || "createdAt";
    const sortOrder = query.order === "asc" ? 1 : -1;

    const filter = { isDeleted: false };

    const searchFields = this.model.schema.statics.searchFields || [];
    if (search && searchFields.length) {
      filter.$or = searchFields.map(field => ({
        [field]: { $regex: search, $options: "i" }
      }));
    }

    Object.keys(query).forEach(key => {
      if (["page","limit","search","sortBy","order"].includes(key)) return;
      filter[key] = query[key];
    });

    let result = this.model.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortOrder });

    if (populate) result = result.populate(populate);

    const data = await result;
    const total = await this.model.countDocuments(filter);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id) {
    const document = await this.model.findById(id);

    if (!document || document.isDeleted)
      throw new ApiError(404, "Record not found");

    return document;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const document = await this.model.findById(id);

    if (!document || document.isDeleted)
      throw new ApiError(404, "Record not found");

    Object.assign(document, data);

    await document.save();

    return document;
  }

  async softDelete(id) {
    const document = await this.model.findById(id);

    if (!document || document.isDeleted)
      throw new ApiError(404, "Record not found");

    document.isDeleted = true;

    await document.save();

    return document;
  }
}

export default BaseService;