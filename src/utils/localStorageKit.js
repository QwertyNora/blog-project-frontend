import { api } from "../services/auth.service";

class LocalStorageKit {
  STORAGE_TOKEN_KEY = "STORAGE_TOKEN_KEY";

  setTokenInStorage(token) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(token));
    api.defaults.headers.common["Authorization"] = `Bearer ${token.access}`; // Corrected from apiKit to api
  }

  getTokenFromStorage() {
    const token = localStorage.getItem(this.STORAGE_TOKEN_KEY);
    if (token) {
      const parsedToken = JSON.parse(token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedToken?.access}`; // Corrected from apiKit to api
      return parsedToken;
    }
    return null;
  }

  deleteTokenFromStorage() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    api.defaults.headers.common["Authorization"] = ""; // Clear the authorization header
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
