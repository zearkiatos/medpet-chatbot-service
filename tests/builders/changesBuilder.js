import BaseBuilder from "@builders/baseBuilder";
import ValueBuilder from "@builders/valueBuilder";

class ChangesBuilder extends BaseBuilder {
    constructor() {
        super();
        this.value = new ValueBuilder().build();
    }
}

export default ChangesBuilder;