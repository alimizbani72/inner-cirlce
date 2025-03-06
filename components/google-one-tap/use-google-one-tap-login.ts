'use client';
import { useScript } from '@/hooks/use-script';
import { useEffect } from 'react';
import type {
  IGoogleCallbackResponse,
  IGoogleEndPointResponse,
  IUseGoogleOneTapLogin,
} from './types';

const scriptFlag: string = '__googleOneTapScript__';
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client';
const oauthEndpointURL: string = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

function callback({
  data,
  onError,
  onSuccess,
}: {
  data: IGoogleCallbackResponse;
  onError?: IUseGoogleOneTapLogin['onError'];
  onSuccess?: IUseGoogleOneTapLogin['onSuccess'];
}) {
  if (data?.credential) {
    fetch(`${oauthEndpointURL}${data.credential}`)
      .then((resp) => {
        if (resp?.status === 200 && resp?.json) {
          return resp.json();
        } else {
          if (onError) {
            onError();
          }
          throw new Error('Something went wrong');
        }
      })
      .then((resp: IGoogleEndPointResponse) => {
        if (onSuccess) {
          onSuccess(resp);
        }
      })
      .catch((error) => {
        if (onError) {
          onError(error);
        }
        throw error;
      });
  }
}

export function useGoogleOneTapLogin({
  onError,
  disabled,
  onSuccess,
  googleAccountConfigs,
  disableCancelOnUnmount = false,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);
  const callbackToUse = googleAccountConfigs.callback
    ? googleAccountConfigs.callback
    : (data: IGoogleCallbackResponse) => callback({ data, onError, onSuccess });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const googleScript = window[scriptFlag];

    if (!googleScript && window.google && script === 'ready') {
      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: callbackToUse,
      });
      window[scriptFlag] = true;
    }

    if (window[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt();

      return () => {
        if (!disableCancelOnUnmount) {
          window.google.accounts.id.cancel();
        }
      };
    }
  }, [script, disabled, callbackToUse, googleAccountConfigs, disableCancelOnUnmount]);

  return null;
}
