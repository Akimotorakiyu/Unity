import { customAlphabet } from 'nanoid'

const nanoidIncludeNumber20 = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  20,
)
const nanoidnotIncludeNumber1 = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  1,
)

export function genNanoDomId() {
  return nanoidnotIncludeNumber1() + nanoidIncludeNumber20()
}
