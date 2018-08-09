import Teleman from 'teleman'

const jinshuju = new Teleman({
  base: 'https://activity.wallstreetcn.com/forms',
  complete({ response, body }) {
    if (response.ok) {
      return body
    } else {
      throw body || response
    }
  }
})

export default jinshuju
