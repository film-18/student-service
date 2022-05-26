import {
  NotificationTC,
} from '../models/notification'
// import { UserTC } from '../models/user'

export const notification = NotificationTC.getResolver('findMany')
export const notificationId = NotificationTC.getResolver('findById')
export const notificationPagination = NotificationTC.getResolver('pagination')

export const createnotification = NotificationTC.getResolver('createOne')
export const updatenotificationId = NotificationTC.getResolver('updateById')
export const deletenotificationId = NotificationTC.getResolver('removeById')
