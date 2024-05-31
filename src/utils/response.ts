import { Response } from 'express';
import { messages, Messages } from "./message";
import { ResponseData } from './interface';



export function sendSuccessResponse(
  res: Response | any,
  data: any = [],
  messageKey: keyof Messages = "SUCCESS",
  status: number = 200
): void {
  const message = messages[messageKey];
  const response: ResponseData = { status, message, data };
  res.status(status).json({ success: true, ...response });
}

export function sendErrorResponse(
  res: Response | any,
  messageKey: keyof Messages = "INTERNAL_SERVER_ERROR",
  status: number = 500
): void {
	const message = messages[messageKey];
  const response: ResponseData = { status, message };
  res.status(status).json({ success: false, ...response });
}
