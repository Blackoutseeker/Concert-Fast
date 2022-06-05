/**
 * Generate a random ID
 * @returns {string} the random ID
 */

export const generateRandomId = (): string => {
  const randomId: string =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)

  return randomId
}
