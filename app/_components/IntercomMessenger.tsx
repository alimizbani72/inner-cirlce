'use client';
import type { AuthHttpMeResponse } from '@/services/minecraft/minecraftAPI.schemas';
import Intercom from '@intercom/messenger-js-sdk';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

type IntercomMessengerProps = {
  user: AuthHttpMeResponse;
};

const IntercomMessenger: FC<IntercomMessengerProps> = ({ user }) => {
  const [userHash, setUserHash] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserHash = async () => {
      try {
        const response = await fetch(`/api/generate-hmac?id=${user.id}`);
        const data = await response.json();
        setUserHash(data.hash);
      } catch (error) {
        console.error('Error fetching user hash:', error);
      }
    };

    fetchUserHash();
  }, [user.email]);

  useEffect(() => {
    if (userHash) {
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
    }
  }, [userHash]);

  return null;
};

export default IntercomMessenger;
