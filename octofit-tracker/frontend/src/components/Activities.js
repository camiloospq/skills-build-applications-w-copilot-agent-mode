
// components/Activities.js
import React, { useEffect, useMemo, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchData = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(endpoint);
      const payload = await res.json();
      const results = Array.isArray(payload?.results) ? payload.results : Array.isArray(payload) ? payload : [];
      setActivities(results);
    } catch (e) {
      console.error('Error fetching activities:', e);
      setErr('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [endpoint]);

  const columns = useMemo(() => (activities.length ? Object.keys(activities[0]) : []), [activities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [activities, query]);

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
          <h2 className="h4 mb-0">Activities</h2>
          <button className="btn btn-outline-primary btn-sm" onClick={fetchData}>
            Refresh
          </button>
        </div>

        <form className="mb-3">
          <label className="form-label" htmlFor="activitiesSearch">Filter</label>
          <div className="input-group">
            <span className="input-group-text">🔎</span>
            <input
              id="activitiesSearch"
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
            <div className="mt-2 text-muted">Loading activities…</div>
          </div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="alert alert-info">No activities to display.</div>
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

      {/* Modal */}
      {selected && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setSelected(null)} />
          <div className="modal fade show modal-custom" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity Details</h5>
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

export default Activities;
