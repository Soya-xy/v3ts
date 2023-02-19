import Api from '~/utils/ajax'

interface Pages {
  pageIndex: Number
  pageSize: Number
}

export const getIndex = (e: Pages) => Api.get('/demo/list', e)
