import { useState } from 'react'
import AddTestModal from '../../../components/addTestModal/AddTestModal'
import BackButton from '../../../components/backButton/BackButton'
import DragDrop from '../../../components/dragDrop/DragDrop'
import NewsCreateModal from '../../../components/newsCreateModal/NewsCreateModal'
import DashboardLayout from '../../../layout/dashboardLayout/DashboardLayout'
import './AddLesson.scss'

const AddLesson = () => {
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [textModal, setTextModal] = useState(false)
  const [testModal, setTestModal] = useState(false)

  return (
    <>
      {videoModal && <NewsCreateModal type='video' videoActive={videoModal} setVideoActive={setVideoModal} />}
      {imageModal && <NewsCreateModal type='image' imageActive={imageModal} setImageActive={setImageModal} />}
      {testModal && <AddTestModal setTestModal={setTestModal} />}
      {textModal && <NewsCreateModal type='text' textActive={textModal} setTextActive={setTextModal} />}
      <DashboardLayout title='Add new lesson'>
        <BackButton location='/admin/coursepage' />
        <AddContent setVideoModal={setVideoModal} setImageModal={setImageModal} setTextModal={setTextModal} setTestModal={setTestModal} />
        <LessonMaterial />
        <LessonSaveModal />
      </DashboardLayout>
    </>
  )
}

const AddContent = ({ setVideoModal, setImageModal, setTextModal, setTestModal }) => {
  return (
    <div className='admin-lesson-create-container'>
      <input type='text' placeholder='Write title here' />
      <DragDrop onChange='{onChange}' />
      <div className='admin-lesson-create-btn-wrapper'>
        <button className='secondary-btn' onClick={() => setVideoModal(true)}><img src='/img/video-outline.svg' alt='video icon' /> <span>Add video</span></button>
        <button className='secondary-btn' onClick={() => setImageModal(true)}><img src='/img/image-outline.svg' alt='image icon' /> <span>Add image</span></button>
        <button className='secondary-btn' onClick={() => setTextModal(true)}><img src='/img/text-outline.svg' alt='text icon' /> <span>Add text</span></button>
        <button className='secondary-btn' onClick={() => setTestModal(true)}><img src='/img/test-outline.svg' alt='test icon' /> <span>Add test</span></button>
      </div>
    </div>
  )
}

const LessonMaterial = () => {
  return (
    <div className='admin-lesson-materials-container'>
      <h1>Materials</h1>
      <p>You dont have any materials in lesson
        Add it for your users.
      </p>
      <button className='secondary-btn'>Add materials</button>
    </div>
  )
}

const LessonSaveModal = () => {
  return (
    <div className='save-lesson-modal'>
      <h4>Do you want to save lesson?</h4>
      <div>
        <button className='secondary-btn' id='lesson-save-btn'>Cancel</button>
        <button className='primary-btn secondary-btn' id='lesson-save-btn'>Save lesson</button>
      </div>
    </div>
  )
}

export default AddLesson