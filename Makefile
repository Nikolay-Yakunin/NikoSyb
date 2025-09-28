

all:

# --- exec ---

run:
	go run cmd/main.go

build:
	go build cmd/main.go

# --- dev ---

fmt:
	go fmt ./...