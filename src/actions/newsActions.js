import axios from 'axios'
import { getApi, configFunc } from '../utils/apiFunc'
import {
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_SEARCH_REQUEST,
  NEWS_SEARCH_SUCCESS,
  NEWS_SEARCH_FAIL,
  NEWS_CREATE_REQUEST,
  NEWS_CREATE_SUCCESS,
  NEWS_CREATE_FAIL,
  NEWS_DELETE_REQUEST,
  NEWS_DELETE_SUCCESS,
  NEWS_DELETE_FAIL,
  NESW_SAVE_TEXT_DETAIL,
  NESW_SAVE_IMAGE_DETAIL,
  NESW_SAVE_VIDEO_DETAIL,
  NEWS_CLEAR,
  NEWS_UPDATE_REQUEST,
  NEWS_UPDATE_SUCCESS,
  NEWS_UPDATE_FAIL
} from '../constants/newsConstants'

import { logout } from './userAction'

// fetching current community
const currentCommunity = localStorage.getItem('currentCommunity')
  ? JSON.parse(localStorage.getItem('currentCommunity'))
  : null

export const listNews = ({ sort = '', pageNumber = '' }) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST })
    const { data } = await getApi(
      dispatch,
      `${process.env.REACT_APP_API_BASE_URL}/api/news/community/${currentCommunity.id}?pageNumber=${pageNumber}`
    )
    dispatch({ type: NEWS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const searchNews = (search) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_SEARCH_REQUEST })
    const { data } = await getApi(
      dispatch,
      `${process.env.REACT_APP_API_BASE_URL}/api/news/community/${currentCommunity.id}/search?title=${search}`
    )
    dispatch({ type: NEWS_SEARCH_SUCCESS, payload: data.title })
  } catch (error) {
    dispatch({
      type: NEWS_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createNews = (newNews) => async (dispatch, getState) => {
  const formData = new FormData()
  formData.append('news', newNews.file)
  formData.append('title', newNews.title)
  formData.append('category', newNews.category)
  formData.append('imageDetail', newNews.imageDetail)
  try {
    dispatch({ type: NEWS_CREATE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/news/add/community/${currentCommunity.id}`, formData, configFunc())
    dispatch({ type: NEWS_CREATE_SUCCESS, payload: data })
    dispatch({ type: NEWS_CLEAR, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: NEWS_CREATE_FAIL, payload: message })
  }
}

export const deleteNews = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_DELETE_REQUEST })
    const config = configFunc()
    const data = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/news/${id}/community/${currentCommunity.id}`, config)
    dispatch({
      type: NEWS_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({ type: NEWS_DELETE_FAIL, payload: message })
  }
}

export const savetextDetail = (data) => (dispatch) => {
  dispatch({
    type: NESW_SAVE_TEXT_DETAIL,
    payload: data
  })
}

export const saveimageDetail = (data) => (dispatch) => {
  dispatch({
    type: NESW_SAVE_IMAGE_DETAIL,
    payload: data
  })
}

export const savevideoDetail = (data) => (dispatch) => {
  dispatch({
    type: NESW_SAVE_VIDEO_DETAIL,
    payload: data
  })
}

export const newsUpdate = (newNews) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_UPDATE_REQUEST })
    const { id, title, description, category, file } = newNews
    const config = configFunc()
    const data = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/news/${id}/community/${currentCommunity.id}`,
      { title, description, file, category }, config
    )
    dispatch({
      type: NEWS_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: NEWS_UPDATE_FAIL,
      payload: message
    })
  }
}
