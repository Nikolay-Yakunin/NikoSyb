package post

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title  string         `json:"title" binding:"required" gorm:"type:varchar(255);not null"`
	Body   string         `json:"body" binding:"required" gorm:"type:text;not null"`
	Images pq.StringArray `json:"images" gorm:"type:text[]"`
}
