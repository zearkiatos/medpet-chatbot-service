docker-dev-up:
	docker compose -f docker-compose.develop.yaml up --build

docker-dev-down:
	docker compose -f docker-compose.develop.yaml down

docker-up:
	docker compose up --build

docker-down:
	docker compose down

k8s-up:
	kubectl apply -f kubernetes/k8s-configMap.yaml
	kubectl apply -f kubernetes/k8s-secrets.yaml
	kubectl apply -f kubernetes/k8s-deployment.yaml
	kubectl apply -f kubernetes/k8s-hpa.yaml
	kubectl apply -f kubernetes/k8s-ingress.yaml
	minikube tunnel

k8s-down:
	kubectl delete -f kubernetes/k8s-configMap.yaml
	kubectl delete -f kubernetes/k8s-secrets.yaml
	kubectl delete -f kubernetes/k8s-deployment.yaml
	kubectl delete -f kubernetes/k8s-hpa.yaml
	kubectl delete -f kubernetes/k8s-ingress.yaml
	minikube tunnel --cleanup
	