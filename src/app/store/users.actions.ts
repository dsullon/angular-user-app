import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

export const load = createAction('[Users] load', props<{page: number}>());
export const findAll = createAction('[Users] findAll', props<{users: User[]}>());
export const findAllPageable = createAction('[Users] findAllPageable', props<{users: User[], paginator: any}>());
export const find = createAction('[Users] find', props<{id: number}>());
export const add = createAction('[Users] add', props<{userNew: User}>());
export const addSuccess = createAction('[Users] addSuccess', props<{userNew: User}>());
export const update = createAction('[Users] update', props<{userUpdated: User}>());
export const updateSuccess = createAction('[Users] updateSuccess', props<{userUpdated: User}>());
export const remove = createAction('[Users] update', props<{id: number}>());
export const removeSuccess = createAction('[Users] removeSuccess', props<{id: number}>());
export const setPaginator = createAction('[Users] setPaginator', props<{paginator: any}>());
export const setErrors = createAction('[Users] setErrors', props<{errors: any}>());
export const resetUser = createAction('[Users] resetUser');
export const setUserForm = createAction('[Users] setUserForm', props<{user: User}>());