import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { MutationResolvers } from '@bims/graphql/resolvers';
import { v4 as uuidv4 } from 'uuid';

import requireAuthenticated from '../util/requireAuthenticated';

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

const fileUploadResolver: MutationResolvers['fileUpload'] = async (
  root,
  args,
  context,
  info
) => {
  await requireAuthenticated(context);

  const { clientMutationId, contentType } = args.input;

  const Key = uuidv4();

  const signedUrl = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key,
      ContentType: contentType,
    }),
    {
      expiresIn: 3600,
    }
  );

  return {
    clientMutationId,
    signedUrl,
    fileName: Key,
  };
};

export default fileUploadResolver;
