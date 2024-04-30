# Makefile

# Build the project
build:
	docker-compose up --build

# Run the project
up:
	docker-compose up

open-app:
	open http://localhost:5173/