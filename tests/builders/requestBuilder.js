import BaseBuilder from "@builders/baseBuilder";
import BodyBuilder from "@builders/bodyBuilder";

class RequestBuilder extends BaseBuilder {
  constructor() {
    super();
    this.body = new BodyBuilder().build();
  }
}

export default RequestBuilder;
