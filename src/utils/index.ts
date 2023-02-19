import dayjs from 'dayjs'

const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatTime(t: Date, fmt?: string) {
  return t ? dayjs(t).format(fmt || DEFAULT_TIME_FORMAT) : ''
}

// 数字转换A-Z
export function numToAZ(num: number) {
  return String.fromCharCode(65 + num)
}
