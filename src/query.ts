export default class QueryString {
  map: Map<string, string>

  constructor() {
    this.map = QueryString.parse(window.location.search.slice(1))
  }

  static parse(queryString: string): Map<string, string> {
    const map = new Map<string, string>()

    const pairs = queryString.split('&')
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      map.set(key, value)
    })
    return map
  }

  static stringify(map: Map<string, string>): string {
    const kv: string[] = []
    for (const entry of map.entries()) {
      kv.push(`${entry[0]}=${entry[1]}`)
    }

    return kv.join('&')
  }

  get(key: string) {
    return this.map.get(key)
  }

  set(key: string, value: string) {
    this.map.set(key, value)
  }

  remove(key: string) {
    this.map.delete(key)
  }

  apply() {
    const queryString = QueryString.stringify(this.map)
    window.history.pushState({}, '', `?${queryString}`)
  }
}
