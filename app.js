const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let blogs = [
    {
        "id": "1a",
        "title": "The Wonders of Nature",
        "author": "Rahul Tiwari",
        "date": "2024-01-17",
        "content":
            `"Nature is a magnificent force that never ceases to amaze us...",
            "In the heart of a lush forest, the symphony of birdsong fills the air...",
            "As the sun sets, painting the sky in hues of pink and orange...",
            "Nature's wonders are not limited to grand landscapes; even a delicate flower blooming in solitude holds a story of resilience and beauty...",
            "Every aspect of the natural world is a masterpiece, and each moment spent in its presence is a gift."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_640.jpg"
    },
    {
        "id": uuidv4(),
        "title": "Exploring the Cosmos",
        "author": "John Smith",
        "date": "2024-02-02",
        "content":
            `"Gazing up at the night sky, we are humbled by the vastness of the cosmos...",
            "The distant galaxies, the shimmering nebulae, and the dance of planets tell a story of the universe's evolution...",
            "With each telescope observation, we uncover new mysteries that ignite our curiosity and drive for exploration...",
            "The cosmos, with its infinite wonders, beckons us to delve deeper into the realms of space and time..."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565_1280.png"
    },
    {
        "id": uuidv4(),
        "title": "Culinary Adventures",
        "author": "Alice Cook",
        "date": "2024-03-15",
        "content":
            `"Embarking on a culinary journey is a delight for the senses...",
            "From exotic spices to mouth-watering dishes, each bite tells a tale of culture and tradition...",
            "Exploring local markets and tasting authentic cuisines connects us to the heart of a region...",
            "Join me on this flavorful adventure as we discover the diverse world of gastronomy."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2014/12/27/15/40/office-581131_640.jpg"
    },
    {
        "id": uuidv4(),
        "title": "Tech Innovations of the Future",
        "author": "Sam Techie",
        "date": "2024-04-10",
        "content":
            `"The ever-evolving world of technology is a fascinating landscape of innovation...",
            "From artificial intelligence to futuristic gadgets, the pace of technological advancement is astounding...",
            "Exploring the cutting-edge developments reshaping our lives, we witness the dawn of a new era in tech...",
            "Join me in unraveling the mysteries and marvels of the tech world."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_640.jpg"
    },
    {
        "id": uuidv4(),
        "title": "Artistry in Motion",
        "author": "Grace Painter",
        "date": "2024-05-20",
        "content":
            `"Art is a dynamic expression that transcends boundaries and captivates the soul...",
            "From brushstrokes on canvas to the rhythm of dance, each form of art carries a unique narrative...",
            "Exploring the intersection of creativity and emotion, we embark on a journey through the world of artistry...",
            "Join me in discovering the beauty that unfolds when imagination takes flight."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_640.jpg"
    },
    {
        "id": uuidv4(),
        "title": "Mindful Living",
        "author": "Zen Master",
        "date": "2024-06-30",
        "content":
            `"In the chaos of modern life, mindfulness becomes a guiding light...",
            "From meditation practices to mindful living tips, the path to inner peace is multifaceted...",
            "Exploring the art of being present, we find serenity in the midst of the daily hustle...",
            "Join me in the pursuit of a balanced and mindful existence."`
        ,
        "image_url": "https://cdn.pixabay.com/photo/2020/03/06/08/00/laptop-4906312_640.jpg"
    }
]



app.listen(port, () => {
    console.log(`Listening to post : ${port}`);
})

app.get("/blogs", (req, res) => {
    // console.log(blogs);
    res.render("index.ejs", { blogs });
});

app.get("/blogs/new", (req, res) => {
    res.render("newPost.ejs", { blogs });
});

app.post("/blogs", (req, res) => {
    console.log(req.body);
    let { author, title, content, image_url } = req.body;
    let id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    blogs.push({ id, author, title, content, image_url });

    res.redirect("/blogs");
});

app.get("/blogs/:id", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((blog) => id == blog.id)
    console.log(blog);
    // res.send("req working")
    res.render("showBlog.ejs", { blog });
});


app.patch("/blogs/:id", (req, res) => {
    let { id } = req.params;
    let newData = req.body;
    let blog = blogs.find((blog) => id == blog.id);
    blog.author = newData.author;
    blog.title = newData.title;
    blog.content = newData.content;
    blog.image_url = newData.image_url;
    console.log(blog);
    // res.send("req working")
    res.redirect("/blogs");
});


app.get("/blogs/:id/edit", (req, res) => {
    let { id } = req.params;
    let blog = blogs.find((blog) => id == blog.id);
    res.render("editPost.ejs", { blog });
});


app.delete("/blogs/:id", (req, res) => {
    let { id } = req.params;
    blogs = blogs.filter((blog) => id != blog.id);
    res.redirect("/blogs");
});
