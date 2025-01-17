import BaseBuilder from "@builders/baseBuilder";
import ProfileBuilder from "@builders/profileBuilder";

class SenderInfoBuilder extends BaseBuilder {
    constructor() {
        super();
        this.profile = new ProfileBuilder().build();
        this.wa_id = "12345678";
    }
}

export default SenderInfoBuilder;