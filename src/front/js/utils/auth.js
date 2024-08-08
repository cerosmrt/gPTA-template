//utils/auth.js

export const fetchUserDetails = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  // Create a loginUser function that takes email and password as arguments.
  try {
    // Try to execute the following code.
    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
      // Fetch the login API endpoint.
      method: "POST", // Use the POST method.
      headers: {
        // Set the request headers.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data.token;
    }
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};
