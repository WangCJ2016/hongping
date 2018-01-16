import { combineReducers } from 'redux'
import { user } from './user.redux'
import { role } from './role.redux'
import { area } from './area.redux'
import { settingServer } from './setting-server.redux'
import {remoteHost } from './setting.remoteHost.redux'
import { commHost } from './setting.commHost.redux'
import { broadcastHost } from './setting.broadcast.redux'
import { devices } from './setting.device.redux'
import { alarm } from './alarm.redux'
import { video } from './video.redux'
import { sidebar } from './sidebar.redux'

export default combineReducers({user, role, area, settingServer, remoteHost, commHost,broadcastHost,devices,alarm,video,sidebar})