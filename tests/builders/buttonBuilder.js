import BaseBuilder from "@builders/baseBuilder";
import ReplyBuilder from "@builders/replyBuilder";

class ButtonBuilder extends BaseBuilder {
  constructor() {
    super();
    this.type = "reply";
    this.reply = new ReplyBuilder().build();
  }
}

export default ButtonBuilder;