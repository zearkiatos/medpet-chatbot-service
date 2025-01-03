import BaseBuilder from "@builders/baseBuilder";

class ValueBuilder extends BaseBuilder {
    constructor() {
        super();
        this.messages = ['Hello, World!'];
        this.contacts = ['+1234567890']; 
    }
}

export default ValueBuilder;