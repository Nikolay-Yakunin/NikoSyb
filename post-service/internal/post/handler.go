package post

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	srv *PostService
}

func NewPostHandler(srv *PostService) PostHandler {
	return PostHandler{srv: srv}
}

type PostHandlerInterface interface {
	PostPost(ctx *gin.Context)
	GetPosts(ctx *gin.Context)
	GetPostById(ctx *gin.Context)
}

func (h *PostHandler) PostPost(ctx *gin.Context) {
	var post Post

	err := ctx.ShouldBindJSON(&post)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})

		fmt.Println(fmt.Errorf("handler: failed to bind data: %w", err))
		return
	}

	createdPost, err := h.srv.CreatePost(post)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})

		fmt.Println(fmt.Errorf("handler: failed to create: %w", err))
		return
	}

	ctx.JSON(http.StatusCreated, createdPost)
}

func (h *PostHandler) GetPosts(ctx *gin.Context) {
	pageStr := ctx.DefaultQuery("page", "0")
	limitStr := ctx.DefaultQuery("limit", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "page must be a positive integer"})
		return
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 || limit > 100 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "limit must be between 1 and 100"})
		return
	}

	posts, total, err := h.srv.GetAllPosts(page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch posts"})
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	var res struct {
		Page       int     `json:"page"`
		Limit      int     `json:"limit"`
		Total      int64   `json:"total"`
		TotalPages int     `json:"total_pages"`
		Posts      []*Post `json:"posts"`
	}

	res.Page = page
	res.Limit = limit
	res.Total = total
	res.TotalPages = totalPages
	res.Posts = posts

	ctx.JSON(http.StatusOK, res)
}

func (h *PostHandler) GetPostById(ctx *gin.Context) {
	id := ctx.Param("id")

	page, err := strconv.Atoi(id)
	if err != nil || page < 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid param"})

		fmt.Println(fmt.Errorf("handler: failed to convert param: %w", err))
		return
	}

	posts, err := h.srv.GetPostById(page)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read post"})

		fmt.Println(fmt.Errorf("handler: failed to fetch post: %w", err))
		return
	}

	ctx.JSON(http.StatusOK, posts)
}
