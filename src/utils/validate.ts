export function isvalidUsername(str: any) {
  if (!str) {
    return ''
  }
  const valid = ['admin', 'editor']
  return valid.indexOf(str.trim()) >= 0
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validStr(str: string) {
  const n = /([^a-zA-Z0-9_])+/
  return n.test(str) ? !0 : !1
}

export function validEmail(str: string) {
  const n = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return n.test(str) ? !0 : !1
}
