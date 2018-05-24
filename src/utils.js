
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
        case 5:{
            return '巡更未完成报警'
        }
        default:
            return ''
    }
}

// 数组去重
export function unquie(arr) {
    return  [...new Set(arr)]
}

export function weekFormate(day) {
  switch (day) {
      case 1:
          return '星期一'
			case 2:
			return '星期二'
			case 3:
			return '星期三'
			case 4:
			return '星期四'
			case 5:
			return '星期五'
			case 6:
			return '星期六'
			case 7:
			return '星期日'
      default:
        return ''
  }
}

// 根据length计算分屏数量
export function getScreenLength(num) {
   
        if(num ===1) {
            return 1
        }
        if(num > 1&& num<= 4) {
            return 4
        }
        if(num > 4&& num<= 6) {
            return 6
        }
        if(num > 6&& num<= 8) {
            return 8
        }
        if(num === 9) {
            return 9
        }
        if(num > 9&& num<= 13) {
            return 13
        }
       
        return 16
    
}

export function decoding(utftext) {
    var string = "";  
    var i = 0;  
    var c = 0 
    var c3 = 0
    var c2 = 0;  
    while ( i < utftext.length ) {  
        c = utftext.charCodeAt(i);  
        if (c < 128) {  
            string += String.fromCharCode(c);  
            i++;  
        } else if((c > 191) && (c < 224)) {  
            c2 = utftext.charCodeAt(i+1);  
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
            i += 2;  
        } else {  
            c2 = utftext.charCodeAt(i+1);  
            c3 = utftext.charCodeAt(i+2);  
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
            i += 3;  
        }  
    }  
    return string;  

}