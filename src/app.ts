import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routes from './app/routes';

import cookieParser from 'cookie-parser';
import categoryRouter from './app/routes/categoryRoutes';
import productRouter from './app/routes/productRouter';
import subCategoryRouter from './app/routes/subCategoryRoutes';

const app: Application = express();


//midleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


  app.use('/api/v1/category/', categoryRouter);
 app.use('/api/v1/sub-category/', subCategoryRouter);
 app.use('/api/v1/product/', productRouter);


app.get("/",(req:Request,res:Response)=>{
  res.status(200).send("Hello 6sense technology")
}) 




//global error handler 
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
