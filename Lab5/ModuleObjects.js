const module = {
    id: 1, name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
  export default function ModuleObjects(app) {
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
      });
      app.get("/lab5/module/name/:newName", (req, res) => {
        const { name } = req.params;
        module.name = name;
        res.json(module);
      });
      app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
      });
    
  };
  
  