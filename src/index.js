import app from './app.js'

const server = async () => {
  await app.listen(app.get("port"), () =>
    console.log(
      `\n(π‘π‘π‘SERVERπ‘π‘π‘) ββΆ (π http://localhost:${app.get("port")} π)\n`
    )
  );
   app.on("error", (err) => console.log(err));
 
};

server();
