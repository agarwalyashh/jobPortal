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
    return { company: data.company };
}