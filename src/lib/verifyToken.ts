export const verifyLineTokens = async (token: string) => {
  const response = await fetch("https://api.line.me/v2/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const { status } = response;
  if (status === 200) {
    return await response.json();
  } else {
    throw new Error("Failed to verify LINE token");
  }
};
