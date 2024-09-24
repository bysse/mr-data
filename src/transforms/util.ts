import { Buffer, BinaryBuffer, ValueBuffer } from '../transform/buffer'

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

export function decodeBase64(base64: string, annotation: string): Buffer<any> {
  const binString = atob(base64)
  const length = binString.length
  const bytes = new Uint8Array(length)

  let binary = false
  for (let i = 0; i < length; i++) {
    const byte = binString.charCodeAt(i)

    if (byte < 10 || byte > 127) {
      binary = true
    }
    bytes[i] = byte
  }

  if (binary) {
    return new BinaryBuffer(new Uint8ClampedArray(bytes), annotation)
  }
  return new ValueBuffer(binString, annotation)
}

export function decodeBase64asBinary(base64: string, annotation: string): BinaryBuffer {
  const binString = atob(base64)
  const length = binString.length
  const bytes = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    bytes[i] = binString.charCodeAt(i)
  }

  return new BinaryBuffer(new Uint8ClampedArray(bytes), annotation)
}

export function toHex(x: number, size: number): string {
  let hex = x.toString(16)
  while (hex.length < size) {
    hex = '0' + hex
  }
  return hex
}
