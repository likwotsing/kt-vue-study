import axios from 'axios'

// export function getCourses() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       // 修改返回数据结构为对象
//       // resolve(['web全栈', 'web高级'])
//       resolve([{ name: 'web全栈' }, { name: 'web高级' }])
//     }, 2000)
//   })
// }

export function getCourses() {
  return axios.get('/api/courses').then(res => res.data)
}