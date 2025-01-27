import SignUp from '../../components/signInSignUp/SignUp'
import SignLayout from '../../layout/signLayout/SignLayout'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect, useState } from 'react'

const SignUpScreen = () => {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(true)
  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      setLoggedIn(true)
      history.push('/')
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn])
  return (
    <>
      {!loggedIn && (
        <SignLayout>
          <SignUp />
        </SignLayout>
      )}
    </>
  )
}

export default SignUpScreen
