package config

import (
	"os"
)

type Config struct {
	Dns string
}

func NewConfig() *Config {
	return &Config{
		Dns: getEnv("DNS", "host=localhost user=postuser password=postpass dbname=postdb port=9920 sslmode=disable TimeZone=Asia/Barnaul"),
	}
}

func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
