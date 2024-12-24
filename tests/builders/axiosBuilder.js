import BaseBuilder from "@builders/baseBuilder";
import HeadersBuilder from "@builders/headersBuilder";

class AxiosBuilder extends BaseBuilder {
  constructor() {
    super();
    this.method = "POST";
    this.url = "https://graph.facebook.com/v21.0/000000000000000/messages";
    this.headers = new HeadersBuilder().build();
    this.data = {};
  }
}

export default AxiosBuilder;
