const getCustomLabel = (dates) => {
  if (dates) {
    const from = dates[0].toLocaleDateString()
    const to = dates[1].toLocaleDateString()

    if (from === to) {
      return from
    }

    return `${from} - ${to}`
  }

  return 'Custom date'
}


export const tbPeriodPairs = (tbs, dates) => [{
  label: 'Today',
  period: '1d',
  tbs: ['hour'],
  access: 'free',
}, {
  label: 'Last 7 days',
  period: '7d',
  tbs: ['day'],
  access: 'free',
}, {
  label: 'Last 4 weeks',
  period: '4w',
  tbs: ['week'],
  access: 'free',
}, {
  label: 'Last 3 months',
  period: '3M',
  tbs: ['month'],
  access: 'paid',
}, {
  label: 'Last 12 months',
  period: '12M',
  tbs: ['month'],
  access: 'paid',
}, {
  label: 'Last 24 months',
  period: '24M',
  tbs: ['month'],
  access: 'paid',
}, {
  label: getCustomLabel(dates),
  dropdownLabel: 'Custom date',
  isCustomDate: true,
  period: 'custom',
  tbs: tbs || ['custom'],
  access: 'paid',
}]

export const timeBucketToDays = [
  { lt: 7, tb: ['hour', 'day'] }, // 7 days
  { lt: 28, tb: ['day', 'week'] }, // 4 weeks
  { lt: 366, tb: ['week', 'month'] }, // 12 months
  { lt: 732, tb: ['month'] }, // 24 months
]

export const reportFrequencies = ['weekly', 'monthly', 'never']

export const GDPR_EXPORT_TIMEFRAME = 14 // days

export const TOKEN = 'access_token'

export const DONATE_URL = 'https://ko-fi.com/andriir'

export const LIVE_VISITORS_UPDATE_INTERVAL = 40000

// Functions
export const getProjectCacheKey = (period, timeBucket) => `${period}${timeBucket}`
export const getProjectCacheCustomKey = (from, to, timeBucket) => `${from}-${to}-${timeBucket}`
