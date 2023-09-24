import React from 'react'
import Feed from '../../userWall/children/feed/Feed'

const PersonalFeed = ({userId}) => {
  return (
    <div className='m-[20px] rounded-xl'>
            <Feed kind={'VISIT_USER'} id = {userId}/>
    </div>
  )
}

export default PersonalFeed