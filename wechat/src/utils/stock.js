/**
 * 创建于 2018/12/30
 * 作者: SHERlocked93
 * 功能: cookie操作封装
 */

import Cookies from 'js-cookie'

const Uid = 'RCW_UID'     // 本地Uid头
const Token = 'RCW_TOKEN' // 本地Token头

/**
 * cookie.get方法
 * @returns {Function}
 */
function cookieGet(tar) {
  return function() {
    return Cookies.get(tar)
  }
}

/**
 * cookie.set方法
 * @param tar set的对象
 * @returns {Function} 接受一个参数
 */
function cookieSet(tar) {
  return function(param) {
    return Cookies.set(tar, param, { expires: tar === Token ? 1 / 6 : 1 })    // token 2小时有效
  }
}

/**
 * cookie.remove方法
 * @returns {Function}
 */
function cookieRemove(tar) {
  return function() {
    return Cookies.remove(tar)
  }
}

export const getToken = cookieGet(Token)
export const setToken = cookieSet(Token)
export const removeToken = cookieRemove(Token)

export const getUid = cookieGet(Uid)
export const setUid = cookieSet(Uid)
export const removeUid = cookieRemove(Uid)

/**
 * 移除全部cookie
 */
export function removeAll() {
  removeToken()
  removeUid()
}
