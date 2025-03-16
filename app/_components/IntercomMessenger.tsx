'use client';
import type { AuthHttpMeResponse } from '@/services/minecraft/minecraftAPI.schemas';
import Intercom from '@intercom/messenger-js-sdk';
import type { FC } from 'react';
import { useEffect } from 'react';

type IntercomMessengerProps = {
  user: AuthHttpMeResponse;
  userHash: string;
};

const IntercomMessenger: FC<IntercomMessengerProps> = ({ user, userHash }) => {
  useEffect(() => {
    Intercom({
      app_id: 'iq43qpg0',
      user_hash: userHash,
      user_id: user.id,
      email: user.email,
      name: user.full_name,
      rank_type: user.rank_type,
      plan_type: user.plan_type,
      banned: user.banned,
      suspended: user.suspended,
      active_2fa: user.has_2fa,
      telegram_group_joined: user.telegram_group_joined,
      telegram_id: user.telegram_id,
    });
  }, [userHash, user]);

  return null;
};

export default IntercomMessenger;
