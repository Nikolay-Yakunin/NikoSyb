package pkg

type Post struct {
	ID     int      `json:"id"`
	Title  string   `json:"title"`
	Body   string   `json:"body"`
	Images []string `json:"images"`
}
