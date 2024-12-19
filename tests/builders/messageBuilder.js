import BaseBuilder from "@builders/baseBuilder";
import TextBuilder from "@builders/textBuilder";

class MessageBuilder extends BaseBuilder {
  constructor() {
    super();
    this.type = "text";
    this.text = new TextBuilder().build();
    this.from = "user";
    this.id = "1";
  }
}

export default MessageBuilder;
