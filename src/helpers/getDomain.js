import { isProduction } from 'helpers/isProduction'

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production App Engine URL will be returned.
 * Otherwise, the link sopra-fs23-group-38-server.oa.r.appspot.com will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomain = () => {
  const prodUrl = 'https://sopra-kmurak-server-test.oa.r.appspot.com/' // TODO: insert your prod url for server (once deployed)
  const devUrl = 'http://localhost:8080'

  return isProduction() ? prodUrl : devUrl
}
