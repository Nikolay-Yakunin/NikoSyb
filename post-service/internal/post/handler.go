package post

import (
	"encoding/json"
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
	if err := ctx.ShouldBindJSON(&post); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	createdPost, err := h.srv.CreatePost(ctx.Request.Context(), post)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	ctx.JSON(http.StatusCreated, createdPost)
}

// GetPosts - handler for posts
func (h *PostHandler) GetPosts(ctx *gin.Context) {
	type GetPostsRequest struct {
		Range  string `form:"range"`
		Filter string `form:"filter"`
		Sort   string `form:"sort"`
	}

	var req GetPostsRequest

	// Логируем сырые query параметры
	fmt.Printf("[DEBUG] Raw query string: %s\n", ctx.Request.URL.RawQuery)
	fmt.Printf("[DEBUG] Query params: %+v\n", ctx.Request.URL.Query())

	if err := ctx.ShouldBindQuery(&req); err != nil {
		fmt.Printf("[ERROR] Bind query failed: %v\n", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid query parameters", "details": err.Error()})
		return
	}

	fmt.Printf("[DEBUG] Bound request: Range=%q, Filter=%q, Sort=%q\n", req.Range, req.Filter, req.Sort)

	// Парсим JSON из строк
	var rangeArr []int
	if req.Range != "" {
		fmt.Printf("[DEBUG] Parsing range: %s\n", req.Range)
		if err := json.Unmarshal([]byte(req.Range), &rangeArr); err != nil {
			fmt.Printf("[ERROR] Range unmarshal failed: %v\n", err)
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid range format", "details": err.Error()})
			return
		}
		fmt.Printf("[DEBUG] Parsed range: %+v\n", rangeArr)
	}

	var sortArr []string
	if req.Sort != "" {
		fmt.Printf("[DEBUG] Parsing sort: %s\n", req.Sort)
		if err := json.Unmarshal([]byte(req.Sort), &sortArr); err != nil {
			fmt.Printf("[ERROR] Sort unmarshal failed: %v\n", err)
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid sort format", "details": err.Error()})
			return
		}
		fmt.Printf("[DEBUG] Parsed sort: %+v\n", sortArr)
	}

	var filters PostFilters
	if req.Filter != "" {
		fmt.Printf("[DEBUG] Parsing filter: %s\n", req.Filter)
		if err := json.Unmarshal([]byte(req.Filter), &filters); err != nil {
			fmt.Printf("[ERROR] Filter unmarshal failed: %v\n", err)
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid filter format", "details": err.Error()})
			return
		}
		fmt.Printf("[DEBUG] Parsed filters: %+v\n", filters)
	}

	offset, limit := 0, 5
	if len(rangeArr) == 2 {
		offset = rangeArr[0]
		limit = rangeArr[1]
	}
	fmt.Printf("[DEBUG] Final pagination: offset=%d, limit=%d\n", offset, limit)

	sortCol, sortOrder := "id", "ASC"
	if len(sortArr) == 2 {
		sortCol = sortArr[0]
		sortOrder = sortArr[1]
	}
	fmt.Printf("[DEBUG] Final sort: col=%s, order=%s\n", sortCol, sortOrder)

	// Service
	posts, total, err := h.srv.GetAllPosts(ctx.Request.Context(), filters, offset, limit, sortCol, sortOrder)
	if err != nil {
		fmt.Printf("[ERROR] Service call failed: %v\n", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch posts"})
		return
	}

	fmt.Printf("[DEBUG] Fetched %d posts, total=%d\n", len(posts), total)

	start := offset
	end := offset + len(posts) - 1
	if len(posts) == 0 {
		end = offset
	}

	// Headers
	contentRange := fmt.Sprintf("posts %d-%d/%d", start, end, total)
	totalStr := strconv.Itoa(int(total))
	ctx.Header("Content-Range", contentRange)
	ctx.Header("X-Total-Count", totalStr)
	ctx.Header("Access-Control-Expose-Headers", "Content-Range, X-Total-Count")

	ctx.JSON(http.StatusOK, posts)
	fmt.Println("[DEBUG] Response sent successfully")
}

func (h *PostHandler) GetPostById(ctx *gin.Context) {
	id := ctx.Param("id")

	page, err := strconv.Atoi(id)
	if err != nil || page < 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid param"})

		fmt.Println(fmt.Errorf("handler: failed to convert param: %w", err))
		return
	}

	posts, err := h.srv.GetPostById(ctx.Request.Context(), page)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read post"})

		fmt.Println(fmt.Errorf("handler: failed to fetch post: %w", err))
		return
	}

	ctx.JSON(http.StatusOK, posts)
}
