"use client";

import { useState, useEffect } from "react";
import PortalShell from "@/components/PortalShell";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users & Logins", href: "/admin/users" },
  { label: "Students", href: "/admin/students" },
  { label: "Teachers", href: "/admin/teachers" },
  { label: "Academics", href: "/admin/academics" },
  { label: "Admissions", href: "/admin/admissions" },
  { label: "Finance", href: "/admin/finance" },
  { label: "HR", href: "/admin/hr" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Communication", href: "/admin/communication" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Audit Logs", href: "/admin/audit-logs" }
];

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [passwordModalUser, setPasswordModalUser] = useState<UserItem | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [deleteModalUser, setDeleteModalUser] = useState<UserItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm)
      });
      const data = await res.json();

      if (!res.ok) {
        setCreateError(data.error || "Failed to create user.");
      } else {
        setIsCreateOpen(false);
        setCreateForm({ name: "", email: "", password: "", role: "STUDENT" });
        setToastMessage(`Account created successfully for ${createForm.email}!`);
        fetchUsers();
      }
    } catch (err) {
      setCreateError("Network error while creating user.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser || !newPassword) return;

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: passwordModalUser.id, password: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordModalUser(null);
        setNewPassword("");
        setToastMessage(`Password updated successfully for ${passwordModalUser.email}!`);
      } else {
        alert(data.error || "Failed to update password");
      }
    } catch (err) {
      alert("Error updating password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleToggleActive = async (user: UserItem) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive })
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)));
        setToastMessage(`User status updated to ${!user.isActive ? "Active" : "Inactive"}`);
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModalUser) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users?id=${deleteModalUser.id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== deleteModalUser.id));
        setToastMessage(`User account "${deleteModalUser.name}" (${deleteModalUser.email}) was deleted successfully.`);
        setDeleteModalUser(null);
      } else {
        alert(data.error || "Failed to delete user account.");
      }
    } catch (err) {
      alert("Network error while deleting user.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = filterRole === "ALL" || u.role === filterRole;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <PortalShell role="Super Admin Dashboard" navItems={ADMIN_NAV} title="User Credentials & Access Control">
      {/* Toast alert */}
      {toastMessage && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-950">&times;</button>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">User Accounts & Logins</h2>
          <p className="text-xs text-slate-500">Manage all portal logins, create credentials, and change passwords.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-aec-navy px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-aec-navy/90 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card mb-6 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search by name, email or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-aec-navy focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-1/2 flex items-center gap-2 overflow-x-auto pb-1">
            {["ALL", "SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT", "PARENT", "FINANCE", "HR"].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  filterRole === r
                    ? "bg-aec-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card p-0 overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">Loading user accounts...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">No users found matching your criteria.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                        u.role === "SUPER_ADMIN"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-900"
                          : u.role === "TEACHER"
                          ? "bg-blue-100 text-blue-900"
                          : u.role === "STUDENT"
                          ? "bg-emerald-100 text-emerald-900"
                          : u.role === "PARENT"
                          ? "bg-cyan-100 text-cyan-900"
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${u.isActive ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                        {u.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setPasswordModalUser(u);
                          setNewPassword("");
                        }}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleToggleActive(u)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition shadow-2xs ${
                          u.isActive
                            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        {u.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => setDeleteModalUser(u)}
                        className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 px-2.5 py-1 text-[11px] font-bold transition shadow-2xs"
                        title="Permanently remove user"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create User */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Create New Portal User</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
            </div>

            {createError && (
              <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs font-semibold text-rose-800">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-aec-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="e.g. user@aecnetwork.com"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-aec-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-aec-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Portal Role</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-aec-navy focus:outline-none bg-white font-semibold"
                >
                  <option value="STUDENT">🎓 Student</option>
                  <option value="TEACHER">👨‍🏫 Teacher / Instructor</option>
                  <option value="PARENT">👨‍👩‍👧 Parent</option>
                  <option value="ACADEMIC_HEAD">📚 Academic Head / Dean</option>
                  <option value="ADMISSIONS_OFFICER">🎯 Admissions Officer</option>
                  <option value="FINANCE_MANAGER">💰 Finance Manager</option>
                  <option value="HR_MANAGER">👥 HR Manager</option>
                  <option value="SUPERVISOR">👁️ Supervisor</option>
                  <option value="ADMIN">🛡️ Administrator</option>
                  <option value="SUPER_ADMIN">👑 Super Admin</option>
                </select>
              </div>

              <div className="mt-5 flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="w-1/2 rounded-xl border border-slate-200 py-2.5 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-1/2 rounded-xl bg-aec-navy py-2.5 font-bold text-white shadow hover:bg-aec-navy/90 disabled:opacity-50"
                >
                  {createLoading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Password */}
      {passwordModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Reset Password</h3>
              <button onClick={() => setPasswordModalUser(null)} className="text-slate-400 hover:text-slate-700 text-lg">&times;</button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Setting new password for: <strong className="text-slate-900">{passwordModalUser.email}</strong>
            </p>

            <form onSubmit={handleChangePassword} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-aec-navy focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  className="w-1/2 rounded-xl border border-slate-200 py-2 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-1/2 rounded-xl bg-aec-navy py-2 font-bold text-white shadow hover:bg-aec-navy/90 disabled:opacity-50"
                >
                  {passwordLoading ? "Saving..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal: Delete Confirmation */}
      {deleteModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-rose-100">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-rose-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Delete User Account</h3>
                <p className="text-xs text-slate-500">Permanent action cannot be undone</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1.5 text-xs text-slate-700">
              <div><strong>Name:</strong> {deleteModalUser.name}</div>
              <div><strong>Email:</strong> {deleteModalUser.email}</div>
              <div><strong>Role:</strong> <span className="font-mono uppercase font-bold text-slate-900">{deleteModalUser.role}</span></div>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this user? This will permanently remove their credentials and associated portal profile records.
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                disabled={deleteLoading}
                className="w-1/2 rounded-xl border border-slate-200 py-2.5 font-bold text-slate-600 hover:bg-slate-50 text-xs transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                className="w-1/2 rounded-xl bg-rose-600 py-2.5 font-bold text-white shadow-sm hover:bg-rose-700 text-xs transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Yes, Delete Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
