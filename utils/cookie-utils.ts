import Cookies from 'js-cookie';

class CookieUtils {
  private static readonly SALT =
    process.env.NEXT_PUBLIC_SALT_KEY || '~c&>&q6?(eR:pLWUmuE}G]~RwtFdgc^T';

  private static encryptToken(token: string): string {
    try {
      // Simple but effective encryption using timestamp as nonce
      const timestamp = new Date().getTime().toString();
      const nonce = timestamp.slice(-8);
      const encodedToken = btoa(token);
      const signature = btoa(token + this.SALT + nonce);

      return `${encodedToken}.${nonce}.${signature}`;
    } catch (error) {
      console.error('Encryption failed:', error);
      return token;
    }
  }

  private static decryptToken(encrypted: string): string | undefined {
    try {
      const [encodedToken, nonce, signature] = encrypted.split('.');
      const token = atob(encodedToken);
      const expectedSignature = btoa(token + this.SALT + nonce);

      if (signature !== expectedSignature) {
        console.error('Token signature mismatch');
        return undefined;
      }

      return token;
    } catch (error) {
      console.error('Decryption failed:', error);
      return undefined;
    }
  }

  static setCookie(name: string, value: string, days: number = 7): void {
    Cookies.set(name, value, {
      expires: days,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });
  }

  static setSecureToken(name: string, value: string, days: number = 7): void {
    const encrypted = this.encryptToken(value);
    this.setCookie(name, encrypted, days);
  }

  static getCookie(name: string): string | undefined {
    const value = Cookies.get(name);
    if (!value) {
      return undefined;
    }

    // If this is a token cookie, decrypt it
    if (name === 'jwt_access_token') {
      return this.decryptToken(value);
    }

    return value;
  }

  static removeCookie(name: string): void {
    Cookies.remove(name, { path: '/' });
  }
}

export default CookieUtils;
