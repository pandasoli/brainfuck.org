import nookies from 'nookies'

const prefix = 'BrainFuck.org-'

export const set = (name: string, value: string) =>
  nookies.set(null, prefix + name, value)

export const get = () => {
  const cookies = nookies.get()
  const response: {[name: string]: string} = {}

  for (let cookie in cookies) {
    if (cookie.startsWith(prefix)) {
      const cookieName = cookie.substring(prefix.length)
      response[cookieName] = cookies[cookie]
    }
  }

  return response
}

export const destroy = (name: string) =>
  nookies.destroy(null, prefix + name)
