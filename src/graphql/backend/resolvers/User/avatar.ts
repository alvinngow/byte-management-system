import { UserResolvers } from '../../../../../gen/graphql/resolvers';
import getAssetPublicUrl from '../../../../util/getAssetPublicUrl';

const User_avatarResolver: UserResolvers['avatar'] = async (
  root,
  args,
  context,
  info
) => {
  if (root.avatar == null) {
    return null;
  }

  return getAssetPublicUrl(root.avatar);
};

export default User_avatarResolver;
