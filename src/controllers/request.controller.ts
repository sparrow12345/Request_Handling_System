import { Request, RequestHandler, Response } from 'express';
import { Op } from 'sequelize';
import { RequestModel } from '../models/request.model';
import { RequestStatus } from '../types/requests';
import { FilterQueryParams } from '../types/requests';

export const createRequest = async (req: Request, res: Response) => {
  const { subject, text } = req.body;
  const request = await RequestModel.create({ subject, text });
  res.status(201).json(request);
};

export const markInProgress = async (req: Request, res: Response) => {
    const request = await RequestModel.findByPk(req.params.id);
    if (!request || request.status !== 'New') {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    request.status = RequestStatus.IN_PROGRESS;
    await request.save();
    res.json(request);
};

export const completeRequest = async (req: Request, res: Response) => {
    const { solutionText } = req.body;
    const request = await RequestModel.findByPk(req.params.id);
    if (!request || request.status !== 'In progress') if (!request || request.status !== 'New') {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    request.status = RequestStatus.COMPLETED;
    request.solutionText = solutionText;
    await request.save();
    res.json(request);
};
  
export const cancelRequest = async (req: Request, res: Response) => {
    const { reason } = req.body;
    const request = await RequestModel.findByPk(req.params.id);
    if (!request || [RequestStatus.COMPLETED, RequestStatus.CANCELLED].includes(request.status as RequestStatus)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    request.status = RequestStatus.CANCELLED;
    request.cancelReason = reason;
    await request.save();
    res.json(request);
};

export const listRequests = async (req: Request<{}, {}, {}, FilterQueryParams>, res: Response) => {
    try {
      const { date, startDate, endDate, status } = req.query;
      const where: any = {};
  
      // Filter by a specific date (e.g., 2024-05-29)
      if (date) {
        const d = new Date(date);
        const startOfDay = new Date(d.setHours(0, 0, 0, 0));
        const endOfDay = new Date(d.setHours(24, 0, 0, 0));
        where.createdAt = {
          [Op.gte]: startOfDay,
          [Op.lt]: endOfDay
        };
      }
  
      // Filter by date range (e.g., 2024-05-01 to 2024-05-10)
      if (startDate && endDate) {
        where.createdAt = {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate)
        };
      }
  
      // Filter by status if provided
      if (status && Object.values(RequestStatus).includes(status as RequestStatus)) {
        where.status = status;
      }
  
      const requests = await RequestModel.findAll({ where });
      res.json({ requests });
    } catch (error) {
      console.error('Error in listRequests:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const cancelInProgressRequests = async (req: Request, res: Response) => {
    const { reason } = req.body;
    const [updated] = await RequestModel.update(
        { status: RequestStatus.CANCELLED, cancelReason: reason || 'Cancelled in batch' },
        { where: { status: 'In progress' } }
    );
    res.json({ message: `Cancelled ${updated} request(s)` });
};