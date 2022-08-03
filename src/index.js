import app from './app.js'

const server = async () => {
  await app.listen(app.get("port"), () =>
    console.log(
      `\n(💡💡💡SERVER💡💡💡) ◀▶ (🌐 http://localhost:${app.get("port")} 🌐)\n`
    )
  );
   app.on("error", (err) => console.log(err));
 
};

server();
