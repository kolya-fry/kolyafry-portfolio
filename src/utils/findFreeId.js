export default function (listWithIds) {
  if (!listWithIds.length) {
    return 0
  }

  let ids = listWithIds
    .map(el => el.id)
    .sort()

  return ids[ids.length - 1] + 1
}