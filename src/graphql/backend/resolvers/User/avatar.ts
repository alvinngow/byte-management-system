import { UserResolvers } from '@bims/graphql/resolvers';

import getAssetPublicUrl from '../../../../util/getAssetPublicUrl';

const User_avatarResolver: UserResolvers['avatar'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.avatar == null || root.avatar.length === 0) {
    return null;
  }

  return getAssetPublicUrl(root.avatar);
};

export default User_avatarResolver;
