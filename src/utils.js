
export function toTypeStr(types) {
    switch (types) {
        case '视频':
         return 1
        case '红外':
         return 2
        case '道闸':
        return 3
        case '广播':
        return 4
        case '门禁':
        return 5
        case '人员':
        return 6
        case '消防':
        return 7
        case '对讲':
        return 8
         default:
         return 1
    }
}
export function alarmDegree(degree) {
    switch (degree) {
        case 0:{
            return {class:'warm',degree:'正常'}
        }
        case 1:{
            return {class:'',degree:'非紧急'}
        }
        case 2:{
            return {class:'danger',degree:'紧急'}
        }
        default:
            return {class:'',degree:''}
    }
}
export function alarmType(type) {
    switch (type) {
        case 1:{
            return '消防报警'
        }
        case 2:{
            return '红外报警'
        }
        case 3:{
            return '移动侦测报警'
        }
        case 4:{
            return '紧急呼叫'
        }
        default:
            return ''
    }
}

// 数组去重
export function unquie(arr) {
    return  [...new Set(arr)]
}