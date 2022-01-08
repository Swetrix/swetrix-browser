import { types } from './types'

export const alertsActions = {
  clearAlerts() {
    return {
      type: types.CLEAR_ALERTS,
    }
  },
}
