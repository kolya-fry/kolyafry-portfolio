import api from '@/api/api'

export const fetchFakeText = textParams => {
  console.log(textParams)
  return api({
    method: 'get',
    url: `https://fish-text.ru/get?format=html&number=${textParams.textParams}`,
  })
}
