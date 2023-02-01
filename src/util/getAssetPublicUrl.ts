import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const {
  AWS_S3_REGION,
  AWS_S3_ENDPOINT,
  AWS_S3_BUCKET,
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
} = process.env;

if (AWS_S3_ACCESS_KEY_ID == null || AWS_S3_SECRET_ACCESS_KEY == null) {
  throw new Error('missing env vars');
}

const s3Client = new S3Client({
  region: AWS_S3_REGION,
  endpoint: AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export default async function getAssetPublicUrl(fileName: string) {
  const signedUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: fileName,
    }),
    {
      expiresIn: 3600,
    }
  );

  return signedUrl;
}
