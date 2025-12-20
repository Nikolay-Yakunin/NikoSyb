package post

import (
	"context"
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
	Create(ctx context.Context, post Post) (*Post, error)
	// LIMIT, OFFSET, ORDER BY
	GetAll(ctx context.Context, offset, limit int, sort string) ([]*Post, int64, error)
	GetById(ctx context.Context, id int) (*Post, error)
}

func (r *PostRepository) Create(ctx context.Context, post Post) (*Post, error) {
	res := r.db.WithContext(ctx).Create(&post)
	if res.Error != nil {
		return nil, fmt.Errorf("repo: failed to create post: %w", res.Error)
	}
	return &post, nil
}

// sortOrder - ASC | DESC
func (r *PostRepository) GetAll(ctx context.Context, filters PostFilters, offset, limit int, sort string) ([]*Post, int64, error) {
	var posts []*Post
	var total int64

	// SQL query
	query := r.db.WithContext(ctx).Model(&Post{})

	// Filters
	query = applyFilters(query, filters)

	// count before use offset and limit
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("repo: count posts: %w", err)
	}

	// Execute SQL
	err := query.Order(sort).
		Limit(limit).
		Offset(offset).
		Find(&posts).Error

	if err != nil {
		return nil, 0, fmt.Errorf("repo: list posts: %w", err)
	}

	return posts, total, nil
}

func (r *PostRepository) GetById(ctx context.Context, id int) (*Post, error) {
	var post Post
	res := r.db.WithContext(ctx).First(&post, "ID = ?", id)
	if res.Error != nil {
		return nil, fmt.Errorf("repo: failed to find post where id %d: %w", id, res.Error)
	}
	return &post, nil
}

// helpers

func applyFilters(db *gorm.DB, filters PostFilters) *gorm.DB {
	if filters.ID != nil {
		db = db.Where("id = ?", filters.ID)
	}

	if filters.Title != nil {
		db = db.Where("title LIKE ?", fmt.Sprintf("%%%s%%", *filters.Title))
	}

	return db
}
