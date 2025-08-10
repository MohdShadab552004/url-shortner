import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Copy, ExternalLink } from "lucide-react";
import PortalToast from "../components/PortalToast";

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Login state
  const [tokenInput, setTokenInput] = useState("");
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [loginError, setLoginError] = useState("");

  const fetchLinks = useCallback(async () => {
    if (!adminToken) return; 
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: {
          "x-admin-token": adminToken
        }
      });
      const json = await response.json();
      if (response.ok) {
        setData(json);
        setLoginError("");
      } else {
        setLoginError("Invalid admin token");
        localStorage.removeItem("adminToken");
        setAdminToken("");
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    if (adminToken) {
      fetchLinks();
    }
  }, [adminToken, fetchLinks]);

  const handleCopy = (shortCode) => {
    const link = `${import.meta.env.VITE_APP_URL}/redirect/${shortCode}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleLogin = () => {
    if (!tokenInput.trim()) {
      setLoginError("Please enter a token");
      return;
    }
    localStorage.setItem("adminToken", tokenInput.trim());
    setAdminToken(tokenInput.trim());
    setTokenInput("");
    setLoginError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
  };

  // Filtered list based on search
  const filteredLinks = useMemo(() => {
    return data.filter(
      (link) =>
        link.shortCode?.toLowerCase().includes(search.toLowerCase()) ||
        link.originalUrl?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Show login screen if no token
  if (!adminToken) {
    return (
      <section className="p-6 max-w-md mx-auto mt-20 bg-white/10 backdrop-blur border border-zinc-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-zinc-900">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin token"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </section>
    );
  }

  // Show admin dashboard if logged in
  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">All Short Links</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by URL or code"
            className="bg-white/10 backdrop-blur border border-zinc-900 rounded-lg px-4 py-2 text-sm text-zinc-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchLinks}
            className="px-4 py-2 backdrop-blur text-zinc-900 border border-zinc-900 rounded-lg hover:bg-white/20 transition"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-md">
        <div className="px-6 py-4 text-sm text-zinc-900 border-b border-white/10">
          Total: {filteredLinks.length}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-zinc-900">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10 text-zinc-900">
              <tr>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium">Short URL</th>
                <th className="px-6 py-4 font-medium">Original URL</th>
                <th className="px-6 py-4 font-medium">Visits</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link) => (
                <tr
                  key={link.shortCode}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-semibold">{link.shortCode}</td>
                  <td className="px-6 py-4 break-all text-zinc-900 hover:underline">
                    <a
                      href={`${import.meta.env.VITE_APP_URL}/redirect/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${import.meta.env.VITE_APP_URL}/redirect/${link.shortCode}`}
                    </a>
                  </td>
                  <td className="px-6 py-4 break-all">{link.originalUrl}</td>
                  <td className="px-6 py-4">{link.visitCount}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleCopy(link.shortCode)}
                      className="flex items-center gap-1 px-3 py-2 bg-white text-black rounded-lg hover:bg-slate-200 transition"
                    >
                      <Copy size={16} /> Copy
                    </button>
                    <a
                      href={`${import.meta.env.VITE_APP_URL}/redirect/${link.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <ExternalLink size={16} /> Open
                    </a>
                  </td>
                </tr>
              ))}

              {filteredLinks.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-zinc-500">
                    No matching links found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PortalToast show={showToast} message={`Link copied to clipboard!`} />
    </section>
  );
};

export default AdminPage;
