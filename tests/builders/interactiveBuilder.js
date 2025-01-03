import BaseBuilder from "@builders/baseBuilder";
import ActionBuilder from "@builders/actionBuilder";
import InteractiveBodyBuilder from "@builders/interactiveBodyBuilder";

class InteractiveBuilder extends BaseBuilder {
  constructor() {
    super();
    this.type = "button";
    this.action = new ActionBuilder().build();
    this.body = new InteractiveBodyBuilder().build();
  }
}

export default InteractiveBuilder;