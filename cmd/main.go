package main

import (
	"fmt"
	"html"
	"log"

	post "github.com/Nikolay-Yakunin/NikoSyb/internal/Post"
	"github.com/Nikolay-Yakunin/NikoSyb/pkg/config"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	conf := config.NewConfig()

	r := gin.Default()

	// DB
	db, err := gorm.Open(postgres.Open(conf.Dns), &gorm.Config{})
	if err != nil {
		log.Fatalln(err.Error())
	}

	db.AutoMigrate(&post.Post{})

	// Repos

	postRepo := post.NewPostRepository(db)

	// Srv

	postSrv := post.NewPostService(&postRepo)

	// Handlers

	postHandler := post.NewPostHandler(&postSrv)

	r.GET("/", func(ctx *gin.Context) {
		ctx.Status(200)
		fmt.Fprintf(ctx.Writer, "Hello, %s", html.EscapeString(ctx.Request.URL.Path))
	})

	v1 := r.Group("/v1")
	v1.POST("/posts", postHandler.PostPost)
	v1.GET("/posts", postHandler.GetPosts)
	v1.GET("/posts/:id", postHandler.GetPostById)

	r.Run()
}
