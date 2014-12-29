package main

import (
    "github.com/gin-gonic/gin"
    "time"
    "log" 
    "github.com/coopernurse/gorp"
    _ "github.com/mattn/go-sqlite3"
    "database/sql"
    "strconv"
    "fmt"
)

type Meeting struct {
    Id int64 `db:"meeting_id"`
    Created int64
    Title string
    Date int64
    Image string
    Information string
}

var dbmap = initDb()

func initDb() *gorp.DbMap {
    db, err := sql.Open("sqlite3", "db.db")
    checkErr(err, "sql.Open failed")
    dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}}
    dbmap.AddTableWithName(Meeting{}, "meetings").SetKeys(true, "Id")
    err = dbmap.CreateTablesIfNotExists()
    checkErr(err, "Create tables failed")
    return dbmap
}

func checkErr(err error, msg string) {
    if err != nil {
        log.Fatalln(msg, err)
    }
}


func index (c *gin.Context) {
    content := gin.H{"Hello": "world"}
    c.JSON(200,content)
}

func MeetingList(c *gin.Context) {
    var meetings []Meeting
    _, err := dbmap.Select(&meetings, "select * from meetings order by meeting_id")
    checkErr(err, "Select failed")
    content := gin.H{}
    fmt.Println(meetings)
    content["meetings"] = meetings
    c.JSON(200, content)
}

func MeetingDetail(c *gin.Context) {
    meeting_id := c.Params.ByName("meeting_id")
    m_id, _ := strconv.Atoi(meeting_id)
    meeting := getMeeting(m_id)
    content := gin.H{
        "Title": meeting.Title,
        "Information": meeting.Information,
        "Date": meeting.Date,
        "Image": meeting.Image,
    }
    c.JSON(200, content)
}

func MeetingPost(c *gin.Context) {
    var json Meeting

    c.Bind(&json)
    fmt.Println(json.Date)
    meeting := createMeeting(json.Title, json.Information, json.Image, json.Date)
    if meeting.Title == json.Title {
        content := gin.H{
            "Result": "Success",
            "Title": meeting.Title,
            "Content": meeting.Information,
            "Date": meeting.Date,
            "Image": meeting.Image,
        }
        c.JSON(201, content)
    } else {
        c.JSON(500, gin.H{
            "Result": "An error occured",
        })
    }
}

func MeetingNext(c *gin.Context) {
    meeting := getNextMeeting()
    content := gin.H{
        "Title": meeting.Title,
        "Information": meeting.Information,
        "Date": meeting.Date,
        "Image": meeting.Image,
    }
    c.JSON(200, content)
}

func createMeeting(title, info, image string, date int64) Meeting {
    meeting := Meeting{
        Created: time.Now().Unix(),
        Title: title,
        Information: info,
        Date: date,
        Image: image,
    }
    err := dbmap.Insert(&meeting)
    checkErr(err, "Insert failed")
    return meeting
}

func getMeeting(m_id int) Meeting {
    meeting := Meeting{}
    err := dbmap.SelectOne(&meeting, "select * from meetings where meeting_id=?;", m_id)
    fmt.Println(err)
    checkErr(err, "SelectOne failed")
    return meeting
}

func getNextMeeting() Meeting {
    var meetings []Meeting
    var currentNext = Meeting{ Date: 4102358400, }
    var now int64 = time.Now().Unix()
    _, err := dbmap.Select(&meetings, "select * from meetings order by -Date;")
    checkErr(err, "Select failed")
    for _, v := range meetings {
        fmt.Println(v.Date, v.Title)
        fmt.Println(currentNext.Date, currentNext.Title)
        if v.Date > now && v.Date < currentNext.Date {
            currentNext = v
        }
    }
    return currentNext
}

func main () {
    app := gin.Default()
    app.GET("/", index)
    app.GET("/meetings", MeetingList)
    app.POST("/meetings", MeetingPost)
    app.GET("/meetings/:meeting_id", MeetingDetail)
    app.GET("/next", MeetingNext)
    app.Run(":8080")
}
