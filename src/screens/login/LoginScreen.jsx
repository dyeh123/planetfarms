import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import SignIn from '../../components/signInSignUp/SignIn'
import SignLayout from '../../layout/signLayout/SignLayout'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { routingCommunityNews } from '../../actions/userAction'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(true)

  // fetching current community
  const currentCommunity = localStorage.getItem('currentCommunity')
    ? JSON.parse(localStorage.getItem('currentCommunity'))
    : null

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      setLoggedIn(true)
      routingCommunityNews(dispatch, true)
      // history.push(`/community-page-news/${currentCommunity.slug}`)
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn])
  return (
    <>
      {!loggedIn && (
        <SignLayout>
          <SignIn />
        </SignLayout>
      )}
    </>
  )
}

export default LoginScreen
