FROM golang:1.24-alpine3.22 AS builder

# Pin package versions for reproducibility
RUN apk add --no-cache tzdata=2024b-r1

# Set working directory
WORKDIR /build

# Copy go modules files
COPY go.* ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/main.go

# Final stage
FROM scratch

WORKDIR /app

# Copy binary from builder
COPY --from=builder /server /app/server

EXPOSE 8080

CMD ["/app/server"]
