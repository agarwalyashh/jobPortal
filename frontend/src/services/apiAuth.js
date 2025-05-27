export async function isLoggedIn() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/isLoggedIn`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error checking login status");
  }

  const data = await res.json();
  return data;
}

export async function recruiterSignup(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/signup`,
    {
      method: "POST",
      body: data,
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not Signup, Please try again.");
  }
  return await res.json();
}

export async function recruiterLogin(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not Login, Please try again.");
  }
  return await res.json();
}

export async function recruiterLogout(){
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not Logout, Please try again.");
  }
  return await res.json();
}