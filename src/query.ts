export default class QueryString {
  map: Map<string, string>

  constructor() {
    this.map = QueryString.parse(window.location.search.slice(1))
  }

  static parse(queryString: string): Map<string, string> {
    let map = new Map<string, string>()

    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      map.set(key, value)
    })
    return map
  }

  static stringify(map: Map<string, string>): string {
    return map.entries()
      .map(entry => `${entry[0]}=${entry[1]}`)
      .join('&')
  }

  get(key: string) {
    return this.map.get(key);
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