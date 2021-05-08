import axios from "./axios/axiosClient"

const getRobots = () => axios({
  url: '/robots',
  method: 'GET',
})

export {
  getRobots
}