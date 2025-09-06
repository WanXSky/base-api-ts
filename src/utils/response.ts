import { Response } from 'express';

interface CustomeResponse {
  status: boolean;
  message?: string;
  data?: any;
  errors?: any;
}

export const success = (res: Response, data: any, message: string, code: number) => {
  const response: CustomeResponse = {
    status: true,
    message,
    data
  };
  return res.status(code).json(response)
}

export const error = (res: Response, errors: any, message: string, code: number) => {
  const response: CustomeResponse = {
    status: false,
    message,
    errors
  };
  return res.status(code).json(response);
}