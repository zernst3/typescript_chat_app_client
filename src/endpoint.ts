export const getEndpoint = () => {
  let ENDPOINT: string;
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "localhost:8080";
  } else {
    ENDPOINT = "https://zernst-typescript-chat-app-s.herokuapp.com/";
  }

  return ENDPOINT;
};
