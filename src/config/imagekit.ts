// required parameter to fetch images
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL;

// optional parameters (needed for client-side upload)
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const authenticator = () => {
  return new Promise((resolve, reject) => {
    resolve({ signature, token, expiry });
  });
};
