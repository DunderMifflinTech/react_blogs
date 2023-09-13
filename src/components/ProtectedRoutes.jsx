import React, { useEffect } from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import { connect } from 'react-redux'

function ProtectedRoutes({isLoggedIn}) {
  return (
    isLoggedIn ? <Outlet/> : <Navigate to='/login' />
  )
}

const mapStateToProps = (state)=>{
    return{
        isLoggedIn : state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(ProtectedRoutes);