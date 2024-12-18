import BaseBuilder from "@builders/baseBuilder";
import EntryBuilder from "@builders/entryBuilder";

class BodyBuilder extends BaseBuilder {
    constructor() {
        super();
        this.entry = [new EntryBuilder().build()];
    }
}

export default BodyBuilder;