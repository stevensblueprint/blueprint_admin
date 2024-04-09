import { type AxiosResponse, AxiosError } from 'axios'
import request from '../apiClient'
import type { User } from '../../types/index'

const API_NAME = 'Blueprint Backend API'
const BASE = '/user/'

export const getAllUsers = async (): Promise<AxiosResponse> => {
  try {
    const response = await request('GET', BASE + 'all')
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `${API_NAME} Error: ${error.message}`,
        error.response?.data
      )
      throw new Error(
        `${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`
      )
    }
    throw new Error('Unknown Error')
  }
}

export const getUser = async (userId: string): Promise<AxiosResponse> => {
  try {
    const response = await request('GET', BASE + `user?userId=${userId}`)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `${API_NAME} Error: ${error.message}`,
        error.response?.data
      )
      throw new Error(
        `${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`
      )
    }
    throw new Error('Unknown Error')
  }
}

export const addUser = async (user: User): Promise<AxiosResponse> => {
  try {
    const response = await request('POST', BASE + 'user', JSON.stringify(user))
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `${API_NAME} Error: ${error.message}`,
        error.response?.data
      )
      throw new Error(
        `${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`
      )
    }
    throw new Error('Unknown Error')
  }
}

export const updateUser = async (user: User): Promise<AxiosResponse> => {
  try {
    const response = await request('PUT', BASE + 'user', JSON.stringify(user))
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `${API_NAME} Error: ${error.message}`,
        error.response?.data
      )
      throw new Error(
        `${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`
      )
    }
    throw new Error('Unknown Error')
  }
}

export const deleteUser = async (userId: string): Promise<AxiosResponse> => {
  try {
    const response = await request('DELETE', BASE + `userId?=${userId}`)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `${API_NAME} Error: ${error.message}`,
        error.response?.data
      )
      throw new Error(
        `${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`
      )
    }
    throw new Error('Unknown Error')
  }
}
