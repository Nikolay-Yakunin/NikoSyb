package post

import (
	"errors"

	"gorm.io/gorm"
)

// Errors
var (
	// Fabrica errors
	ErrTitleTooLong  = errors.New("post: title exceeds 255 characters")
	ErrTitleRequired = errors.New("post: title is required")
	ErrBodyRequered  = errors.New("post: body is required")
	// Repository
	AllowedSortColumns = map[string]bool{"id": true, "title": true, "created_at": true}
)

// Post - structure for "posts" on my blog
type Post struct {
	gorm.Model
	Title string `json:"title" binding:"required" gorm:"type:varchar(255);not null"`
	Body  string `json:"body" binding:"required" gorm:"type:text;not null"`
}

// PostFilters - structure for filtering
type PostFilters struct {
	ID    *uint   `json:"id,omitempty"`
	Title *string `json:"title,omitempty"`
}
