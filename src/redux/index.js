import { combineReducers } from 'redux'
import { user } from './user.redux'
import { role } from './role.redux'
import { area } from './area.redux'

export default combineReducers({user, role, area})