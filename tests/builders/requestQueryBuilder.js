import BaseBuilder from "@builders/baseBuilder";

class RequestQueryBuilder extends BaseBuilder {
    constructor() {
        super();
        this.query = {
            "hub.mode": "subscribe",
            "hub.verify_token": "test",
            "hub.challenge": "test"
        };
    }

    withMode(mode) {
        this.query["hub.mode"] = mode;
        return this;
    }

    withVerifyToken(verifyToken) {
        this.query["hub.verify_token"] = verifyToken;
        return this;
    }

    withChallenge(challenge) {
        this.query["hub.challenge"] = challenge;
        return this;
    }
}

export default RequestQueryBuilder;