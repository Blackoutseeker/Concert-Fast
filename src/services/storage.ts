interface GetFromCookies {
  /**
   * Get the user's token
   * @param {() => string | undefined} getTokenFromCookie - a callback that gets the user's token from Cookies
   * @returns {string} the user's token
   */
  getToken: (getTokenFromCookie: () => string | undefined) => string
}

/**
 * Get stored values from Cookies
 * @method `getToken`
 */

const storage = (): GetFromCookies => {
  return {
    getToken: (getTokenFromCookies: () => string | undefined): string => {
      const token = getTokenFromCookies() ?? ''
      return token
    }
  }
}

export default storage
