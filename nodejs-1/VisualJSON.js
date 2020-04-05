class VisualJSON {
  #obj = {}
  #visibleArray = []
  constructor(obj) {
    this.#obj = obj
  }

  prefix(variable) {
    switch (variable) {
      case "array": return "├── ";
      case "object": return "└── ";
      case "space": return "   ";
      default: return ""
    }
  }

  prepare(obj = this.#obj, subarray = false, line = '', last = false) {
    let currentLine = line
    const values = Object.values(obj)
    const length = values.length
    for (let i = 0; i < length; i++) {
      if (Array.isArray(values[i])) {
        let key = 0;
        if (subarray) currentLine += (!last ? "│" : " ") + this.prefix('space')
        currentLine += Object.values(values[i][0]).length > 1 ? this.prefix('array') : this.prefix('object')
        values[i].forEach(item => {
          this.prepare(item, true, currentLine, key === values[i].length - 1)
          key++
        })
      }
      if (last && values.length > 1) {
        currentLine = this.prefix('object')
      }
      if (typeof values[i] === 'object') return
      this.#visibleArray.push(currentLine + values[i])
      currentLine = ''
    }
  }

  show() {
    this.prepare()
    this.#visibleArray.forEach(item => console.log(item))
  }
}

module.exports = VisualJSON