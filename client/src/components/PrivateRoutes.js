//import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoutes = (props) => {
    const { currentUser } = props
    const location = useLocation()

  return (
        <>
            {
                currentUser?.isEmailVerified && !currentUser?.verificationCode ?
                    <Outlet /> 
                : 
                <Navigate to='/' state= {{from: location}}  replace />
            }
        </>
            

            
  )
}

//App wide state
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {})(PrivateRoutes)