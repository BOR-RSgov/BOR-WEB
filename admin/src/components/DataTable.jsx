import { LuPencil, LuTrash2 } from "react-icons/lu";

/**
 * columns: [{ key, label, render?(row) }]
 */
const DataTable = ({ columns, rows, onEdit, onDelete, loading }) => {
  if (loading) return <p className="text-muted-brand">Loading...</p>;
  if (!rows?.length) return <p className="text-muted-brand">No records found.</p>;

  return (
    <div className="card-surface p-0 overflow-hidden">
      <table className="table table-hover mb-0 align-middle">
        <thead style={{ background: "var(--bg)" }}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ fontSize: 13, color: "var(--muted)" }}>{col.label}</th>
            ))}
            <th style={{ width: 100 }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td key={col.key} style={{ fontSize: 14 }}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(row)}>
                  <LuPencil size={14} />
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(row._id)}>
                  <LuTrash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;