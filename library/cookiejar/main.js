class SaveObject {
    
    constructor(usingCookies = false) {
        this.usingCookies = usingCookies;
    }

    loadData(key = null) {
        if(this.usingCookies) {
            if(key == null) {
                var toReturn = document.cookie;
                toReturn = toReturn.split(";");
                for(var i = 0; i < toReturn.length; i++) {
                    toReturn[i] = toReturn[i].split("=");
                }
                var cookies = {};
                for(var item of toReturn) {
                    cookies[item[0]] = item[1];
                }
                return cookies;
            }
        }
    }
}