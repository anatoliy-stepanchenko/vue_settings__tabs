import { ref, watch } from 'vue'

interface GeneralSettings {
  username: string
  email: string
  about: string
  gender: string
  country: string
}

interface SettingsMap {
  general: GeneralSettings
  notifications: NotificationsSettings
  privacy: PrivacySettings
}

type SettingsKey = keyof SettingsMap

interface NotificationsSettings {
  ematl: boolean
  sms: boolean
}

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key)
  return stored !== null ? JSON.parse(stored) : defaults
}

const watcher =
  <T extends SettingsKey>(key: T) =>
  (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

const notifications = ref<NotificationsSettings>(
  init('notifications', {
    ematl: false,
    sms: false,
  }),
)

interface PrivacySettings {
  visibility: Visibility
  searchEngineIndexing: boolean
}

type Visibility = 'public' | 'privacy'

const privacy = ref<PrivacySettings>(
  init('privacy', {
    visibility: 'public',
    searchEngineIndexing: false,
  }),
)

const general = ref<GeneralSettings>(
  init('general', {
    about: '',
    email: '',
    country: 'USA',
    gender: 'male',
    username: '',
  }),
)

watch(general, watcher('general'), { deep: true })
watch(notifications, watcher('notifications'), { deep: true })
watch(privacy, watcher('privacy'), { deep: true })

export function useSettings() {
  return {
    general,
    notifications,
    privacy,
  }
}
