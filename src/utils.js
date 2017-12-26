export function toTree(data, parent_id) {
    var tree = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentId == parent_id) {
            var obj = data[i];
            temp = toTree(data, data[i].id);
            if (temp.length > 0) {
                obj.children = temp;
                tree.push({
                    key: obj.id,
                    name: obj.name,
                    id: obj.id,
                    level: obj.level,
                    children: [toTree(data, obj.id)]
                });
            }

        }
    }
    console.log(tree)
    return tree;
}

export function addTree(data, id, children) {
    for (let i=0; i<data.length; i++) {
        if(data[i].id == id){
            const chidd = children.map((child,index) => ({
                key: data[i].key+'-'+index,
                ...child
            }))
            data[i].children = [... data[i].children,...chidd]
            return data
        }else if (data[i].children.length>0) {
            addTree(data[i].children, id,children )
        }
    }
}

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