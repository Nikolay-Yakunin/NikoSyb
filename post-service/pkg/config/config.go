package config

import (
	"os"
)

type Config struct {
	GinMode string
	Dns     string
	Port    string
}

func New() *Config {
	return &Config{
		GinMode: getEnv("GIN_MODE", "test"),
		Port:    getEnv("PORT", ":8080"),
		Dns:     getEnv("DNS", "postgres user=postuser password=postpass dbname=postdb port=5432 sslmode=disable"),
	}
}

func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
