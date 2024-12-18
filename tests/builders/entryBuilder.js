import BaseBuilder from "@builders/baseBuilder";
import ChangesBuilder from "@builders/changesBuilder";

class EntryBuilder extends BaseBuilder {
    constructor() {
        super();
        this.changes = [new ChangesBuilder().build()]
    }
}

export default EntryBuilder;