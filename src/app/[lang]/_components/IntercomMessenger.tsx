"use client";
import Intercom from "@intercom/messenger-js-sdk";
import type { FC } from "react";

type IntercomMessengerProps = {
  user_id: string;
  name: string;
  email: string;
  // created_at: number;
};

const IntercomMessenger: FC<IntercomMessengerProps> = ({ user_id, name, email }) => {
  Intercom({
    app_id: "iq43qpg0",
    user_id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
    name, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
    email, // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email
    // created_at, // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date in a Unix timestamp (in seconds) e.g. 1704067200
  });

  return null;
};

export default IntercomMessenger;
