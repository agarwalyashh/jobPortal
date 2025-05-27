export async function getApplication(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/application/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch application, Please try again.");
  }
  return await res.json();
}

export async function getApplicants() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/allApplicants`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch applicants, Please try again.");
  }
  return await res.json();
}

export async function updateStatus(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/company/applicationStatus/${data.id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data.body)
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch jobs, Please try again.");
  }
  return await res.json();
}
