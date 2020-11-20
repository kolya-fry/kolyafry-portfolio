export default function (listWithIds) {

  console.log(listWithIds)

  if (!listWithIds.length) {
    return 0
  }

  let ids = listWithIds
    .map(el => el.id)
    .sort()

  console.log(ids)

  return ids[ids.length - 1] + 1
}