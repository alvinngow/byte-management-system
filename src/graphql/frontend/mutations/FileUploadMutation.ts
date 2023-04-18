import { gql } from '@apollo/client';
import { FileUploadInput, FileUploadPayload } from '@bims/graphql/schema';

export interface Data {
  fileUpload: FileUploadPayload;
}

export interface Variables {
  input: FileUploadInput;
}

export const Mutation = gql`
  mutation FileUploadMutation($input: FileUploadInput!) {
    fileUpload(input: $input) {
      clientMutationId
      signedUrl
      fileName
    }
  }
`;
