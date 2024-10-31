
import { useSelector } from 'react-redux'
const Userprofile = () => {
  const username = useSelector((state) => state.username)
  console.log(username)
  const email = useSelector((state) => state.email)
  return (
    <div>
      <div>
            <h1>Logged in as:</h1>
            {username ? <h2>{username}</h2> : <h2>No Username Found</h2>}
            {email ? <h3>{email}</h3> : <h3>No Email Found</h3>}
        </div>
    </div>
  )
}

export default Userprofile
