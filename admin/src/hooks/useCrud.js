import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export const useCrud = (endpoint) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data: res } = await api.get(`/${endpoint}`, { params });
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      toast.error(`Failed to load ${endpoint}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const create = async (payload, isFormData = false) => {
    await api.post(`/${endpoint}`, payload, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {});
    toast.success("Created successfully");
    fetchAll();
  };

  const update = async (id, payload, isFormData = false) => {
    await api.put(`/${endpoint}/${id}`, payload, isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {});
    toast.success("Updated successfully");
    fetchAll();
  };

  const remove = async (id) => {
    await api.delete(`/${endpoint}/${id}`);
    toast.success("Deleted successfully");
    fetchAll();
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { data, pagination, loading, fetchAll, create, update, remove };
};