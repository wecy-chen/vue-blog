import * as types from './types'

let mutations = {

  [types.GETJSON] (state, articles) {
    state.jsonData = articles
  }
}

export default mutations
