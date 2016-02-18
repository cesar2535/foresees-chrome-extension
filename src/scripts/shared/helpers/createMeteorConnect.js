import { createClass } from 'asteroid'
import * as asteroidImmutableCollectionsMixin from 'asteroid-immutable-collections-mixin'
import * as asteroidOauthMixin from 'asteroid-oauth-mixin'

export const Asteroid = createClass([asteroidImmutableCollectionsMixin, asteroidOauthMixin])

export function createAsteroid({platform, endpoint}) {
  return new Asteroid({
    platform,
    endpoint
  })
}
