package main

import (
	"fmt"
	"html"
	"log"
	"time"

	"github.com/Nikolay-Yakunin/NikoSyb/internal/post"
	"github.com/Nikolay-Yakunin/NikoSyb/pkg/config"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	log.Println("Starting application...")

	// Load config
	conf := config.NewConfig()
	log.Println("Configuration loaded successfully")

	// Gin init
	r := gin.Default()
	log.Println("Gin router initialized.")

	// Gin mode
	gin.SetMode(conf.GinMode)
	log.Printf("Gin mode set to %s.\n", conf.GinMode)
	if gin.Mode() != conf.GinMode {
		log.Fatalf("Failed to set Gin mode actual=%s != expected=%s", gin.Mode(), conf.GinMode)
	}

	// TODO: Move Cors conf to config
	// Cors
	corsConf := cors.Config{
		AllowOrigins:     []string{"https://nikolay-yakunin.ru"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(corsConf))

	// DB
	log.Println("Connecting to database...")
	db, err := gorm.Open(postgres.Open(conf.Dns), &gorm.Config{})
	if err != nil {
		log.Fatalln(err.Error())
	}
	log.Println("Database connection established.")

	// DB Migration
	log.Println("Running auto-migration...")
	err = db.AutoMigrate(&post.Post{})
	if err != nil {
		log.Fatalln(err.Error())
	}
	log.Println("Auto-migration completed.")

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

	log.Printf("Starting server on port %s", conf.Port)
	if err := r.Run(conf.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
