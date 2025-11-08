package post

import "fmt"

type PostService struct {
	repo *PostRepository
}

func NewPostService(repo *PostRepository) PostService {
	return PostService{repo: repo}
}

type PostServiceInterface interface {
	CreatePost(post Post) (*Post, error)
	GetAllPosts(page int, limit int) ([]*Post, int64, error)
	GetPostById(id int) (*Post, error)
}

func (srv *PostService) CreatePost(post Post) (*Post, error) {
	res, err := srv.repo.Create(post)
	if err != nil {
		return nil, fmt.Errorf("SRV: failed to create post: %w", err)
	}

	return res, nil
}

func (srv *PostService) GetAllPosts(page int, limit int) ([]*Post, int64, error) {
	// 0 = (1-1)*10
	// 10 = (2-1)*10
	offset := (page-1)*limit
	posts, total, err := srv.repo.GetAll(offset, limit)
	if err != nil {
		return nil, total, fmt.Errorf("SRV: failed to get all posts: %w", err)
	}

	return posts, total, nil
}

func (srv *PostService) GetPostById(id int) (*Post, error) {
	post, err := srv.repo.GetById(id)
	if err != nil {
		return nil, fmt.Errorf("SRV: failed to get post by id %d: %w", id, err)
	}

	return post, nil
}
