"use client";
import { useEffect, useState } from "react";
import Intercom from "@intercom/messenger-js-sdk";
import type { FC } from "react";

type IntercomMessengerProps = {
  email: string;
};

const IntercomMessenger: FC<IntercomMessengerProps> = ({ email }) => {
  const [userHash, setUserHash] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserHash = async () => {
      try {
        const response = await fetch(`/api/generate-hmac?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        setUserHash(data.hash);
      } catch (error) {
        console.error("Error fetching user hash:", error);
      }
    };

    fetchUserHash();
  }, [email]);

  useEffect(() => {
    if (userHash) {
      Intercom({
        app_id: "iq43qpg0",
        email,
        user_hash: userHash,
      });
    }
  }, [userHash]);

  return null;
};

export default IntercomMessenger;
