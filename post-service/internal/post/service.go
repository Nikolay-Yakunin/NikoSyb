package post

import (
	"context"
	"fmt"
	"strings"
)

type PostService struct {
	repo *PostRepository
}

func NewPostService(repo *PostRepository) PostService {
	return PostService{repo: repo}
}

type PostServiceInterface interface {
	CreatePost(ctx context.Context, post Post) (*Post, error)
	GetAllPosts(ctx context.Context, offset, limit int, sortCol, sortOrder string) ([]*Post, int64, error)
	GetPostById(ctx context.Context, id int) (*Post, error)
}

func (srv *PostService) CreatePost(ctx context.Context, post Post) (*Post, error) {
	res, err := srv.repo.Create(ctx, post)
	if err != nil {
		return nil, fmt.Errorf("srv: failed to create post: %w", err)
	}

	return res, nil
}

func (srv *PostService) GetAllPosts(ctx context.Context, filters PostFilters, offset, limit int, sortCol, sortOrder string) ([]*Post, int64, error) {
	// sort string like "col order"
	col := "id"
	if AllowedSortColumns[strings.ToLower(sortCol)] {
		col = strings.ToLower(sortCol)
	}
	order := "ASC"
	if strings.ToUpper(sortOrder) == "DESC" {
		order = "DESC"
	}
	sort := fmt.Sprintf("%s %s", col, order)
	// DB req
	posts, total, err := srv.repo.GetAll(ctx, filters, offset, limit, sort)
	if err != nil {
		return nil, total, fmt.Errorf("srv: failed to get all posts: %w", err)
	}

	return posts, total, nil
}

func (srv *PostService) GetPostById(ctx context.Context, id int) (*Post, error) {
	post, err := srv.repo.GetById(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("srv: failed to get post by id %d: %w", id, err)
	}

	return post, nil
}
