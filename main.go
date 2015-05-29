package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/flosch/pongo2"
)

type pongoRender struct {
    cache map[string]*pongo2.Template
}

func newPongoRender() *pongoRender {
    return &pongoRender{map[string]*pongo2.Template{}}
}

func writeHeader(w http.ResponseWriter, code int, contentType string) {
    if code >= 0 {
        w.Header().Set("Content-Type", contentType)
        w.WriteHeader(code)
    }
}

func (p *pongoRender) Render(w http.ResponseWriter, code int, data ...interface{}) error {
    file := data[0].(string)
    ctx := data[1].(pongo2.Context)
    var t *pongo2.Template

    if tmpl, ok := p.cache[file]; ok {
        t = tmpl
    } else {
        tmpl, err := pongo2.FromFile(file)
        if err != nil {
            return err
        }
        p.cache[file] = tmpl
        t = tmpl
    }
    writeHeader(w, code, "text/html")
    return t.ExecuteWriter(ctx, w)
}

type Data struct {
    Name string
}

func notYetImplemented(c *gin.Context) {
    c.String(http.StatusOK, "Not yet implemented")
}

func index (c *gin.Context) {
    ctx := pongo2.Context{}
    c.HTML(200, "index.html", ctx)
}

func pictures (c *gin.Context) {
    c.String(http.StatusOK, "Not yet implemented")
}

func main() {
    StartGin()
}

func StartGin() {
    router := gin.New()
    router.HTMLRender = newPongoRender()

    router.Static("static", "./static")

    router.GET("/", index)
    router.GET("/pictures", pictures)
    router.GET("/information", notYetImplemented)
    router.GET("/equipment", notYetImplemented)
    router.GET("/contact", notYetImplemented)
    router.GET("/api", notYetImplemented)

    router.Run(":7777")
}
