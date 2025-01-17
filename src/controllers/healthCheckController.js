import config from "@config/index.js";
class HealthCheckController {
    async healthCheck(req, res) {

        res.status(200).send({
            status: 'OK',
            environment: config.ENVIRONMENT
        });
    }
}

export default new HealthCheckController();