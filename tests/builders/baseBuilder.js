class BaseBuilder {
    build() {
      return Object.assign(this, {});
    }
  
    withParam(property, value) {
      this[property] = value;
      return this;
    }
  }
  
  export default BaseBuilder;