import { type AxiosResponse, AxiosError } from 'axios'
import request from '../apiClient'

const API_NAME = 'Blueprint Backend API'
const BASE = '/team/'

export const getAllTeams = async (): Promise<AxiosResponse> => {
  try {
    const response = await request('GET', BASE + 'all')
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`${API_NAME} Error: ${error.message}`, error.response?.data)
      throw new Error(`${API_NAME} Error: ${error.response?.status} ${error.response?.data?.error}`)
    }
    throw new Error('Unknown Error')
  }
}

export const getTeam = async (teamId: string): Promise<AxiosResponse> => {
  try {
    const response = await request('GET', BASE + `user?userId=${teamId}`)
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
