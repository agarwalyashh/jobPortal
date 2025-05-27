export async function applyJob(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/${id}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not apply for this job, Please try again.");
  }
  return await res.json();
}

export async function getApplications(){
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/jobs`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not fetch applied jobs, Please try again.");
  }
  return await res.json();
}

export async function uploadResume(data) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/resume`,
    {
      method: "PATCH",
      credentials: "include",
      body:data
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Could not upload, Please try again.");
  }
  return await res.json();
}