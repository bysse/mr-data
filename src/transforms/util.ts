export function formatJson(json: string): string {
  return JSON.stringify(JSON.parse(json), null, 3)
}

export function base64URLtoBase64(str: string): string {
  const base64Encoded = str.replace(/-/g, '+').replace(/_/g, '/')
  const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4))
  return base64Encoded + padding
}

export function base64URLDecode(str: string): string {
  const base64 = base64URLtoBase64(str)
  return atob(base64)
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0)))
    .join('')
}
