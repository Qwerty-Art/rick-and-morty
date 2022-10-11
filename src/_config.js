import axios from 'axios'

export const axiosBase =  axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  // header: {
  // }
})

export const links = [
  {
    title: 'Home',
    alias: 'home',
    url: '/'
  },
  {
    title: 'About',
    alias: 'about',
    url: '/about'
  },
]