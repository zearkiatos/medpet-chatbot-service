import BaseBuilder from "@builders/baseBuilder";
import ButtonBuilder from "@builders/buttonBuilder";

class ActionBuilder extends BaseBuilder {
  constructor() {
    super();
    this.buttons = [new ButtonBuilder().build()];
  }
}

export default ActionBuilder;