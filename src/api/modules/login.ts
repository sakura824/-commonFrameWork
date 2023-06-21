import { postAction, getAction } from "../index";

export const login = (params: {} | undefined) => postAction('/admin/acl/index/login', params)

export const loginOut = () => postAction('/admin/acl/index/logout')

export const getUserInfo = () => getAction('/admin/acl/index/info');

