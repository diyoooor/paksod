import liff from "@line/liff";

let isInitialized = false;

export const initializeLiff = async (liffId: string): Promise<void> => {
  if (!isInitialized) {
    try {
      await liff.init({ liffId });
      isInitialized = true;
      console.log("LIFF initialized successfully");
    } catch (error) {
      console.error("Failed to initialize LIFF", error);
      throw error;
    }
  } else {
    console.log("LIFF is already initialized");
  }
};

export const isInLineClient = (): boolean => {
  return liff.isInClient();
};

export const getUserProfile = async () => {
  if (!isInitialized) {
    throw new Error("LIFF is not initialized");
  }

  try {
    const profile = await liff.getProfile();
    return profile;
  } catch (error) {
    console.error("Failed to get user profile", error);
    throw error;
  }
};
