package main

import (
	"fmt"
	"html"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		ctx.Status(200)
		fmt.Fprintf(ctx.Writer, "Hello, %s", html.EscapeString(ctx.Request.URL.Path))
	})

	r.Run()
}
