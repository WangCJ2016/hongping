import { combineReducers } from 'redux'
import { user } from './user.redux'
import { role } from './role.redux'
import { area } from './area.redux'
import { settingServer } from './setting-server.redux'
import {remoteHost } from './setting.remoteHost.redux'

export default combineReducers({user, role, area, settingServer, remoteHost})