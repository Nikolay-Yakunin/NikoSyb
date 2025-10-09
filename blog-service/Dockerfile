FROM golang:1.24-alpine3.22 AS builder

RUN apk add --no-cache tzdata

COPY go.* ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/main.go

FROM scratch

COPY --from=builder /server /server

EXPOSE 8080

CMD [ "/server" ]