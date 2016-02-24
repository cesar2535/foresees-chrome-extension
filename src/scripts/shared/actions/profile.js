export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE'

export function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

export function updateFavorite(favorites) {
  return {
    type: UPDATE_FAVORITE,
    favorites
  }
}
