import { MutationResolvers } from '../../../../../gen/graphql/resolvers';
import { prisma } from '../../../../db';
import requireAuthenticated from '../util/requireAuthenticated';

const accountAvatarUpdateResolver: MutationResolvers['accountAvatarUpdate'] =
  async (root, args, context, info) => {
    await requireAuthenticated(context);
    const currentUserId = (await context.getCurrentUserId())!;

    const { clientMutationId, avatar } = args.input;

    const currentUserUpdated = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        avatar,
      },
    });

    return currentUserUpdated;
  };

export default accountAvatarUpdateResolver;
