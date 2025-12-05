
// components/Workouts.js
import React, { useEffect, useMemo, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchData = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(endpoint);
      const payload = await res.json();
      const results = Array.isArray(payload?.results) ? payload.results : Array.isArray(payload) ? payload : [];
      setWorkouts(results);
    } catch (e) {
      console.error('Error fetching workouts:', e);
      setErr('Failed to fetch workouts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [endpoint]);

  const columns = useMemo(() => (workouts.length ? Object.keys(workouts[0]) : []), [workouts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [workouts, query]);

  const renderCell = (val) => {
    if (val === null || val === undefined) return <span className="text-muted">—</span>;
    if (typeof val === 'object') {
      const s = JSON.stringify(val);
      return <code className="small">{s.length > 40 ? s.slice(0, 40) + '…' : s}</code>;
    }
    return String(val);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Workouts</h2>
          <button className="btn btn-outline-primary btn-sm" onClick={fetchData}>Refresh</button>
        </div>

        <form className="mb-3">
          <label className="form-label" htmlFor="workoutsSearch">Filter</label>
          <div className="input-group">
            <span className="input-group-text">🔎</span>
            <input
              id="workoutsSearch"
              type="search"
              className="form-control"
              placeholder="Type to filter across all fields"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        {err && <div className="alert alert-danger">{err}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <div className="mt-2 text-muted">Loading workouts…</div>
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="alert alert-info">No workouts to display.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                  <thead className="table-light">
                    <tr>
                      {columns.map((col) => (
                        <th key={col} scope="col">{col}</th>
                      ))}
                      <th scope="col" style={{ minWidth: 90 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, idx) => (
                      <tr key={idx}>
                        {columns.map((col) => (
                          <td key={col}>{renderCell(row[col])}</td>
                        ))}
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelected(row)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setSelected(null)} />
          <div className="modal fade show modal-custom" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout Details</h5>
                  <button type="button" className="btn-close" onClick={() => setSelected(null)} />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(selected, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Workouts;
