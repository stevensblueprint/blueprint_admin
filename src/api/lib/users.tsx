import { type AxiosResponse } from 'axios'
import request from '../apiClient'
import type { User } from '../../types/index'

export const getAllUsers = async (): Promise<AxiosResponse> => {
  return await request('GET', '/v1/users/all')
}

export const getUser = async (username: string): Promise<AxiosResponse> => {
  return await request('GET', `/v1/users/user?username=${username}`)
}

export const addUser = async (user: User): Promise<AxiosResponse> => {
  return await request('POST', '/v1/users/user', JSON.stringify(user))
}

export const updateUser = async (username: string, user: User): Promise<AxiosResponse> => {
  return await request('PUT', `/v1/users/user?username=${username}`, JSON.stringify(user))
}

export const deleteUser = async (username: string): Promise<AxiosResponse> => {
  return await request('DELETE', `/v1/users/user?username=${username}`)
}

export const getMemberSizeWeeklyChange = async (): Promise<AxiosResponse> => {
  return await request('GET', '/v1/users/member-size-weekly-change')
}
