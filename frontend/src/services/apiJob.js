export async function deleteJob(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not delete job, Please try again.");
  }
  return await res.json();
}

export async function addJob(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not add job, Please try again.");
  }
  return await res.json();
}

export async function getCompanyJobs(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job/jobsByCompany/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch jobs, Please try again.");
  }
  return await res.json();
}

export async function updateVisibility(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job/visibility/${id}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch jobs, Please try again.");
  }
  return await res.json();
}

export async function getJobs() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch jobs, Please try again.");
  }
  return await res.json();
}

export async function getJob(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/job/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch job, Please try again.");
  }
  return await res.json();
}