import React from 'react'
import Background from '../background/Background'
import './MyCoursesCard.scss'
import CardLayout from '../../layout/cardLayout/CardLayout'

const courseData = [
  {
    _id: 1,
    name: ' Jimmy Beam personal business course',
    activity: ' Last activity: 7 days ago',
    lesson: '1/8 lessons',
    bgImage: '/img/farmer.svg'
  },
  {
    _id: 2,
    name: ' Jimmy Beam personal business course',
    activity: ' Last activity: 7 days ago',
    lesson: '1/8 lessons',
    bgImage: '/img/farm.svg'
  }
]

const specialCourseData = [
  {
    _id: 1,
    name: 'Find your inner power. J.McBell course',
    status: 'Free Course',
    bgImage: '/img/farm.svg'
  },
  {
    _id: 2,
    name: 'Find your inner power. J.McBell course',
    status: 'Amount:$20',
    bgImage: '/img/farmer.svg'
  },
  {
    _id: 3,
    name: '  Find your inner power. J.McBell course',
    status: 'Amount:$50',
    bgImage: '/img/farm.svg'
  }
]

const MyCoursesCard = () => {
  return (
    <div className='my-course-container-wrapper'>
      <div className='my-course-inner-container'>
        <h4>My courses</h4>
        <CardLayout>
          <CourseCard data={courseData} />
        </CardLayout>
      </div>
      <div className='my-course-inner-container'>
        <h4>Special for you</h4>
        <CardLayout>
          <CourseCard data={specialCourseData} />
        </CardLayout>
      </div>
    </div>
  )
}

export default MyCoursesCard

const CourseCard = ({ data }) => {
  return (
    data && data.map(item => {
      return (
        <Background image={item.bgImage}>
          <div className='my-course-content'>
            <h3>{item.name}</h3>
            <p>{item.activity || item.status}</p>
            {
              item.lesson && <div className='lesson-progress'>
                <div className='lesson-completed' />
                <span>{item.lesson}</span>
              </div>
            }
          </div>
        </Background>
      )
    })
  )
}
