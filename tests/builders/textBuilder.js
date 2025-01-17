import BaseBuilder from "@builders/baseBuilder";

class TextBuilder extends BaseBuilder   {
    constructor() {
        super();
        this.body = "Hello";
    }
}

export default TextBuilder;