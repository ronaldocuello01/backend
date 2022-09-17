import { Request, Response } from "express";


export function Upload(req: any , res: Response) {
    const response = req.files.map(item => {
        return { name: item.fieldname, description: item.destination, url: item.filename, path: item.filename}
    });
    console.log(response);
    
    res.json(response)
}

