const RAW_BASE = import.meta.env.VITE_API_BASE_URL;
if (!RAW_BASE) {
  throw new Error('VITE_API_BASE_URL is missing. Define it in .env.local for dev or Vercel env for prod.');
}
const API_BASE_URL = RAW_BASE.replace(/\/+$/, ''); // يشيل السلاش الأخير لو موجود

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const parseResponse = async (response) => {
  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return await response.json();
  }
  const text = await response.text(); // HTML/نص
  return text ? { message: text } : {};
};

const handleResponse = async (response) => {
  const data = await parseResponse(response);
  if (!response.ok) {
    // يطلّع رسالة مفهومة حتى لو الرد مو JSON
    const msg = data?.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }
  return data;
};

export const authAPI = {
  register: async (userData) => {
    // userData جاي من Signup.jsx = { name, email, password }
    const fullName = (userData.name || "").trim();
    const [first_name, ...rest] = fullName.split(/\s+/);
    const last_name = rest.length ? rest.join(" ") : "User";
    const email = (userData.email || "").trim();
    const username = email.split("@")[0];

    const payload = { 
      first_name, 
      last_name, 
      username, 
      email, 
      password: userData.password 
    };

    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  getUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};
