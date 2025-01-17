import BaseBuilder from "@builders/baseBuilder";

class HeadersBuilder extends BaseBuilder {
    constructor() {
        super();
        this.Authorization = 'Bearer fake_token'
    }
}

export default HeadersBuilder;