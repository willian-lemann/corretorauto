package pkg

import (
	"bytes"
	"log"

	"github.com/disintegration/imaging"
)

func ImageResizing(file []byte) []byte {
	src, err := imaging.Decode(bytes.NewReader(file))
	if err != nil {
		log.Fatalf("failed to decode image: %v", err)
	}

	resized := imaging.Resize(src, 50, 50, imaging.Lanczos)

	buf := new(bytes.Buffer)
	err = imaging.Encode(buf, resized, imaging.PNG)
	if err != nil {
		log.Fatalf("failed to encode image: %v", err)
	}

	return buf.Bytes()
}
