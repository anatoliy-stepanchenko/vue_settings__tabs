import { ref } from 'vue'

interface GeneralSettings {
  username: string
  email: string
  about: string
  gender: string
  country: string
}

interface NotificationsSettings {
  ematl: boolean
  sms: boolean
}

const notifications = ref<NotificationsSettings>({
  ematl: false,
  sms: false,
})

interface PrivacySettings {
  visibility: Visibility
  searchEngineIndexing: boolean
}

type Visibility = 'public' | 'privacy'

const privacy = ref<PrivacySettings>({
  visibility: 'public',
  searchEngineIndexing: false,
})

const general = ref<GeneralSettings>({
  about: '',
  email: '',
  country: 'USA',
  gender: 'male',
  username: '',
})

export function useSettings() {
  return {
    general,
    notifications,
    privacy,
  }
}
