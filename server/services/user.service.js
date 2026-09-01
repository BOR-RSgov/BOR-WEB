import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getUsersService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const sortField = query.sortBy || "createdAt";
  const sortOrder = query.order === "asc" ? 1 : -1;

  const filter = {
    
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  if (query.role) {
    filter.role = query.role;
  }

  if (query.isActive) {
    filter.isActive = query.isActive === "true";
  }

  const users = await User.find(filter)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ [sortField]: sortOrder });

  const total = await User.countDocuments(filter);
  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
