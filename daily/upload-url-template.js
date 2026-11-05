async () => {
  // A one-time address for uploading one JPEG to Wix Media. Replace PUT-SLUG-HERE.
  const body = { mimeType: "image/jpeg", fileName: "PUT-SLUG-HERE.jpg" };
  const r = await wix.request({ method: "POST", url: "https://www.wixapis.com/site-media/v1/files/generate-upload-url", body });
  return { uploadUrl: r.uploadUrl, length: r.uploadUrl.length };
}
