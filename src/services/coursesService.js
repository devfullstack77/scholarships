import axios from 'axios'
const test = require('./coursesTest')

const apiClient = axios.create({
  baseURL: 'https://testapi.io/api/Jonas-buriti/scholarships',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getList () {
    const list = {}
    try {
      const request = await apiClient.get()

      list.statusCode = request.status
      if (request.status !== 200) {
        list.error =
          'O servidor não reconhece o método de solicitação ou não tem capacidade para atender à solicitação.'
        return list
      }
      if (request.data) {
        list.courses = JSON.parse(request.data)
      }
      list.courses = test.list.filter((i) => i.enabled)
    } catch (e) {
      list.courses = []
      list.error = `Ops..! Ocorreu um problema | ${e.message}`
    }
    return list
  },

  async getTestList () {
    const list = {}
    list.courses = test.list.filter((i) => i.enabled)
    return list
  }
}
