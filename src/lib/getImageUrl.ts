export function ImageUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_Imag;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_Image environment variable is not defined",
    );
  }
  return baseUrl;
}
