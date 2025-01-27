import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL + '/api/'

export const Axios = axios.create({
  baseURL: BASE_URL
})

// categories
export const CATEGORY = 'categories'

// course
export const GET_COURSE = 'courses'
export const ADD_COURSE = 'courses/add'

// lesson
export const GET_LESSONS = 'lessons'
export const ADD_LESSONS = 'lessons/add'

// videos
export const ADD_VIDEOS = 'videos/add'

// lesson photos
export const ADD_LESSON_PHOTO = 'lesson-photos/add'

// lesson Text
export const ADD_LESSON_TEXT = 'lesson-text/add'

// lesson material
export const ADD_MATERIAL = 'materials/add'

// get files
export const GET_THUMBNAIL = BASE_URL + '../thumbnail/'
export const GET_COVERIMG = BASE_URL + '../coverImg/'
export const GET_VIDEO = BASE_URL + '../videoResource/'
export const VIDEO_COVER = BASE_URL + '../videoCover/'
export const LESSON_IMG = BASE_URL + '../lessonImg/'
