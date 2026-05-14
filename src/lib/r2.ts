import { AwsClient } from "aws4fetch";

const r2 = new AwsClient({
  accessKeyId:     process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  region:          "auto",
  service:         "s3",
});

const ENDPOINT = `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const BUCKET   = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

/** Upload a completed document PDF to R2 */
export async function uploadDocument(
  key: string,
  buffer: Buffer,
  contentType = "application/pdf"
): Promise<string> {
  const url = `${ENDPOINT}/${BUCKET}/${key}`;

  const res = await r2.fetch(url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: buffer as any,           // Type assertion to bypass strict fetch typing
    // Alternative (more explicit): body: new Uint8Array(buffer)
  });

  if (!res.ok) {
    throw new Error(`R2 upload failed: ${res.status} ${await res.text()}`);
  }
  return key;
}

/** Generate a signed download URL (default 72 hours) */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn = 72 * 3600
): Promise<string> {
  const url = new URL(`${ENDPOINT}/${BUCKET}/${key}`);
  url.searchParams.set("X-Amz-Expires", String(expiresIn));

  const signed = await r2.sign(
    new Request(url.toString(), { method: "GET" }), 
    { aws: { signQuery: true } }
  );
  
  return signed.url;
}

/** Delete a document (optional) */
export async function deleteDocument(key: string): Promise<void> {
  const url = `${ENDPOINT}/${BUCKET}/${key}`;
  await r2.fetch(url, { method: "DELETE" });
}
