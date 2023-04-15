function getRootUrl() {
  if (process.env.VERCEL_URL != null) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.ROOT_URL != null) {
    return process.env.ROOT_URL;
  }

  return 'http://localhost:3000';
}

export const ROOT_URL = getRootUrl();
