import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { createLesson } from '../../../actions/lessonActions'
// import { createMaterial } from "../../../actions/materialActions";
import { addVideo } from './addVideo'
import { addText } from './addText'
import { addImage } from './addImage'
import { addMaterial } from './addMaterial'

import AddTestModal from '../../../components/addTestModal/AddTestModal'
import BackButton from '../../../components/backButton/BackButton'
import DragDrop from '../../../components/dragDrop/DragDrop'
import NewsCreateModal from '../../../components/newsCreateModal/NewsCreateModal'
import DashboardLayout from '../../../layout/dashboardLayout/DashboardLayout'
import { ErrorText } from '../../../components/formUI/FormUI'
import Video from '../../../components/videoPlayer/Video'
import Image from '../../../components/lessonImage/Image'
import Text from './Text'
import Material from '../../../components/material/Material'
import './AddLesson.scss'

const AddLesson = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { courseId } = useParams()
  const postLessonData = useSelector((state) => state.addLesson)

  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [textModal, setTextModal] = useState(false)
  const [testModal, setTestModal] = useState(false)
  const [lessonData, setLessonData] = useState([])
  const [lessonCover, setLessonCover] = useState(null)
  const [videoDataToPost, setVideoDataToPost] = useState(null)
  const [lessonImgDataToPost, setLessonImgDataToPost] = useState(null)
  const [text, setText] = useState([])
  const [material, setMaterial] = useState([])

  const { register, errors, handleSubmit } = useForm()

  const submitLessonForm = ({ title }) => {
    const coverImg = lessonCover
    dispatch(
      createLesson({
        title,
        courseId,
        coverImg
      })
    )
  }

  useEffect(() => {
    if (
      Object.keys(postLessonData).length !== 0 &&
      postLessonData.loading === false
    ) {
      const id = postLessonData.course.data.id
      const lessonId = id
      if (id) {
        if (videoDataToPost) {
          addVideo(lessonData, lessonId, dispatch)
        }
        if (lessonImgDataToPost) {
          addImage(lessonData, lessonId, dispatch)
        }
        if (text) {
          addText(lessonData, lessonId, dispatch)
        }
        if (material !== null) {
          addMaterial({ material, lessonId, dispatch })
        }
      }
      history.push(`/lesson/${id}`)
    }
  }, [postLessonData, addVideo, addImage, addText])

  return (
    <>
      {videoModal && (
        <NewsCreateModal
          type='video'
          videoActive={videoModal}
          setVideoActive={setVideoModal}
          lessonData={lessonData}
          setLessonData={setLessonData}
          setVideoDataToPost={setVideoDataToPost}
        />
      )}
      {imageModal && (
        <NewsCreateModal
          type='image'
          imageActive={imageModal}
          setImageActive={setImageModal}
          lessonData={lessonData}
          setLessonData={setLessonData}
          setLessonImgDataToPost={setLessonImgDataToPost}
        />
      )}
      {testModal && <AddTestModal setTestModal={setTestModal} />}
      {textModal && (
        <NewsCreateModal
          type='text'
          textActive={textModal}
          setTextActive={setTextModal}
          placeholder='Text Heading'
          lessonData={lessonData}
          setLessonData={setLessonData}
          setText={setText}
        />
      )}
      <DashboardLayout title='Add new lesson'>
        <BackButton location={`/admin/course/${courseId}`} />
        <AddContent
          setVideoModal={setVideoModal}
          setImageModal={setImageModal}
          setTextModal={setTextModal}
          setTestModal={setTestModal}
          register={register}
          errors={errors}
          setLessonCover={setLessonCover}
          lessonCover={lessonCover}
          lessonData={lessonData}
        />
        <LessonMaterial material={material} setMaterial={setMaterial} />
        <LessonSaveModal onClick={handleSubmit(submitLessonForm)} />
      </DashboardLayout>
    </>
  )
}

const AddContent = ({
  setVideoModal,
  setImageModal,
  setTextModal,
  setTestModal,
  register,
  errors,
  setLessonCover,
  lessonData
}) => {
  return (
    <div className='admin-lesson-create-container'>
      <input
        type='text'
        placeholder='Write title here'
        name='title'
        ref={register({
          required: {
            value: true,
            message: 'You must enter lesson title'
          }
        })}
      />
      <ErrorText
        className='errorMsg'
        message={errors.title && errors.title.message}
      />
      <DragDrop onChange={(img) => setLessonCover(img)} />
      {lessonData &&
        lessonData.map((vid, index) => (
          <div key={index}>
            <Video
              title={vid.videoTitle}
              description={vid.videoDescription}
              url={vid.videoLink || vid.videoResource?.preview}
              thumbnail={vid.videoCover?.preview}
            />
            <Image src={vid.lessonImg?.preview} desc={vid.photoDescription} />
            <Text heading={vid.textHeading} desc={vid.textDescription} />
          </div>
        ))}
      <div className='admin-lesson-create-btn-wrapper'>
        <button className='secondary-btn' onClick={() => setVideoModal(true)}>
          <img src='/img/video-outline.svg' alt='video icon' />{' '}
          <span>Add video</span>
        </button>
        <button className='secondary-btn' onClick={() => setImageModal(true)}>
          <img src='/img/image-outline.svg' alt='image_icon' />
          <span>Add image</span>
        </button>
        <button className='secondary-btn' onClick={() => setTextModal(true)}>
          <img src='/img/text-outline.svg' alt='text icon' />{' '}
          <span>Add text</span>
        </button>
        <button className='secondary-btn' onClick={() => setTestModal(true)}>
          <img src='/img/test-outline.svg' alt='test icon' />{' '}
          <span>Add test</span>
        </button>
      </div>
    </div>
  )
}

const LessonMaterial = ({ material, setMaterial }) => {
  const matData = (mData) => {
    setMaterial(() => [...material, { mData }])
  }

  return (
    <div className='admin-lesson-materials-container'>
      <h1>Materials</h1>

      {material.length !== 0 ? (
        <div className='material'>
          {material.map((mater, i) => {
            return <Material key={i} name={mater?.mData?.name} />
          })}
        </div>
      ) : (
        <p>You dont have any materials in lesson Add it for your users.</p>
      )}
      <DragDrop
        fileType='application/pdf'
        className='secondary-btn addMaterial'
        text='Add Materials'
        onChange={(mat) => matData(mat)}
      />
    </div>
  )
}

const LessonSaveModal = ({ onClick }) => {
  return (
    <div className='save-lesson-modal'>
      <h4>Do you want to save lesson?</h4>
      <div>
        <button className='secondary-btn' id='lesson-cancel-btn'>
          Cancel
        </button>
        <button
          className='primary-btn secondary-btn'
          id='lesson-save-btn'
          onClick={onClick}
        >
          Save lesson
        </button>
      </div>
    </div>
  )
}

export default AddLesson
