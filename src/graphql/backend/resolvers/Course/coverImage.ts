import { CourseResolvers } from '../../../../../gen/graphql/resolvers';
import getAssetPublicUrl from '../../../../util/getAssetPublicUrl';

export const Course_coverImageResolver: CourseResolvers['coverImage'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.coverImage == null) {
    return '/default-cover-image.jpg';
  }

  return getAssetPublicUrl(root.coverImage);
};
