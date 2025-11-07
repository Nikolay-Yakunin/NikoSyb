// post -Package
package post

import (
	"gorm.io/gorm"
)

/*
Post - структура поста

Пост имеет заголовок, тело поста, это md разметка, и набор тегов.
*/
type Post struct {
	gorm.Model
	Title string   `json:"title" binding:"required" gorm:"type:varchar(255);not null"`
	Body  string   `json:"body" binding:"required" gorm:"type:text;not null"`
	Tags  []string `json:"tags" binding:"required" gorm:"type:text[];not null"`
}

// New - генератор
func New(title, body string, tags []string) *Post {
	var post Post

	post.Title = title
	post.Body = body
	post.Tags = tags

	return &post
}
