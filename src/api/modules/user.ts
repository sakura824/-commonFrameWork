import { postAction, getAction } from "../index";
//登录
export const login = (params: {} | undefined) => postAction('/admin/acl/index/login', params)
//退出
export const loginOut = () => postAction('/admin/acl/index/logout')
//获取用户信息
export const getUserInfo = () => getAction('/admin/acl/index/info');
//系统管理-用户管理
export const userList = (params: {pageSize: number, pageNum: number, username: string}) => getAction('/admin/acl/user/' + `${params.pageNum}/${params.pageSize}/?username=${params.username}`);
//系统管理-用户管理
export const setUserRole = (userId: number) => getAction('/admin/acl/user/toAssign/' + userId);
//菜单管理
export const getPermission = () => getAction('/admin/acl/permission');