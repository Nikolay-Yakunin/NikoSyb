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

// GetPosts - пагинация
func (h *PostHandler) GetPosts(ctx *gin.Context) {
	pageStr := ctx.DefaultQuery("page", "1")
	limitStr := ctx.DefaultQuery("limit", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
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

	// количество страниц = количество постов 
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	baseURL := ctx.Request.URL.Path
	buildURL := func(p, l int) string {
		return fmt.Sprintf("%s?page=%d&limit=%d", baseURL, p, l)
	}

	meta := struct {
		Page       int   `json:"page"`
		Limit      int   `json:"limit"`
		TotalPages int   `json:"total_pages"`
		Total      int64 `json:"total"`
	}{
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Total:      total,
	}

	links := struct {
		Self  string `json:"self"`
		Next  string `json:"next,omitempty"`
		Prev  string `json:"prev,omitempty"`
		First string `json:"first"`
		Last  string `json:"last,omitempty"`
	}{
		Self:  buildURL(page, limit),
		First: buildURL(0, limit),
	}

	if page > 1 {
		links.Prev = buildURL(page-1, limit)
	}
	if page < totalPages {
		links.Next = buildURL(page+1, limit)
	}
	if totalPages > 0 {
		links.Last = buildURL(totalPages-1, limit)
	}

	res := struct {
		Meta  interface{} `json:"meta"`
		Links interface{} `json:"links"`
		Data  []*Post     `json:"data"`
	}{
		Meta:  meta,
		Links: links,
		Data:  posts,
	}

	// Дублирую мету в заголовке.
	if page < totalPages-1 {
		nextURL := fmt.Sprintf("/posts?page=%d&limit=%d", page+1, limit)
		ctx.Header("Link", fmt.Sprintf(`<%s>; rel="next"`, nextURL))
	}

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
