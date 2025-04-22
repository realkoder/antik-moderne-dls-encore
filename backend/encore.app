{
	"id": "backend-2tui",
	"lang": "typescript",
	"build": {
		"docker": {
			"bundle_source": true
		}
	},
	"global_cors": {
	"allow_origins_without_credentials": ["https://antik-moderne-dls-encore.vercel.app", "http://localhost:5173", "http://localhost:30001"],
    "allow_origins_with_credentials": [
      "https://antik-moderne-dls-encore.vercel.app", "http://localhost:5173", "http://localhost:30001"
    ],
  }
}