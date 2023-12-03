import { base_url, port } from "../config/sconfig.js";

const createFile = (req,res) => {
    if(req.file){
        let fileName = req.file.filename
        let path = { path: `${base_url}/${fileName}` };
        let successJson = {
            status: "success",
            message: "File uploaded successfully.",
            path: path,
          };
          res.json(successJson);
    }else{
        let paths = req.files.map((file) => {
            let fileName = file.filename;
            let path = `http://localhost:${port}/${fileName}`;
            return { path: path };
          });
          let successJson = {
            status: "success",
            message: "Files uploaded successfully.",
            paths: paths,
          };
          res.json(successJson);
    }
}

export default createFile