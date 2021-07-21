import User from '../models/user'

export const createUser = async (data: Record<any, any>) => User.create(data)

export const findUserbyEmail = async (email: string) => User.findOne({ email })
