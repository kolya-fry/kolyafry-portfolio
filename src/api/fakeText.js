import api from '@/api/api'

export const fetchFakeText = textParams => {
  return api({
    method: 'get',
    url: `https://fish-text.ru/get?format=html&number=${textParams.textParams}`,
  })
}
