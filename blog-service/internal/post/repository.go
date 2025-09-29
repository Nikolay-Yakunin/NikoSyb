package post

import (
	"fmt"

	"gorm.io/gorm"
)

type PostRepository struct {
	db *gorm.DB
}

func NewPostRepository(db *gorm.DB) PostRepository {
	return PostRepository{db: db}
}

type PostRepositoryInterface interface {
	Create(post Post) (*Post, error)
	GetAll(offset, limit int) ([]*Post, int64, error)
	GetById(id int) (*Post, error)
}

func (r *PostRepository) Create(post Post) (*Post, error) {
	res := r.db.Create(&post)
	if res.Error != nil {
		return nil, fmt.Errorf("REPO: failed to create post: %w", res.Error)
	}
	return &post, nil
}

func (r *PostRepository) GetAll(offset int, limit int) ([]*Post, int64, error) {
	posts := make([]*Post, limit)
	res := r.db.Limit(limit).Offset(offset).Find(&posts)

	var total int64
	r.db.Count(&total)
	if res.Error != nil {
		return nil, 0, fmt.Errorf("REPO: failed to find posts on offset %d: %w", offset, res.Error)
	}
	return posts, total, nil
}

func (r *PostRepository) GetById(id int) (*Post, error) {
	var post Post
	res := r.db.First(&post, "ID = ?", id)
	if res.Error != nil {
		return nil, fmt.Errorf("REPO: failed to find post where id %d: %w", id, res.Error)
	}
	return &post, nil
}
