import FormControl from './FormControl';
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home({users}) {
  return (
    <>
       <FormControl users={users} />
       
    </>
  )
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}
