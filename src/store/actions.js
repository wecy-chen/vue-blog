import * as types from './types'

export const setArticle = ({commit}, {data}) => {
  commit(types.GETJSON, data)
}
