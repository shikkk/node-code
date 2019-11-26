class baseModel{
    constructor(data,msg){
        if(data === 'String'){
            this.msg = data
            data = null
            msg = null
        }
        if(data){
            this.data = data
        }
        if(msg){
            this.msg = msg
        }
    }
}

class successModel extends baseModel{
    constructor(data,msg){
        super(data,msg)
        this.code = 0
    }
}

class errorModel extends baseModel{
    constructor(data,msg){
        super(data,msg)
        this.code = -1
    }
}

module.exports = {
    successModel,
    errorModel
}