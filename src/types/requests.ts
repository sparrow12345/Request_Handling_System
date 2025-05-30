export enum RequestStatus {
    NEW = 'New',
    IN_PROGRESS = 'In progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled'
}

export interface CreateRequestDTO {
    subject: string;
    text: string;
}

export interface CompleteRequestDTO {
    solutionText: string;
}

export interface CancelRequestDTO {
    reason: string;
}

export interface FilterQueryParams {
    date?: string;
    startDate?: string;
    endDate?: string;
    status?: RequestStatus;
}

export interface RequestResponse {
    id: number;
    subject: string;
    text: string;
    status: RequestStatus;
    solutionText?: string;
    cancelReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ListRequestsResponse {
    requests: RequestResponse[];
}

export interface ErrorResponse {
    message: string;
}

export interface RequestParams {
    id: string;
}

import { Model, Optional } from 'sequelize';

export interface RequestAttributes {
  id?: number;
  subject: string;
  text: string;
  status?: RequestStatus;
  solutionText?: string | null;
  cancelReason?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RequestCreationAttributes extends Optional<
  RequestAttributes,
  'id' | 'status' | 'solutionText' | 'cancelReason' | 'startDate' | 'endDate'
> {}

export interface RequestInstance
  extends Model<RequestAttributes, RequestCreationAttributes>,
    RequestAttributes {}


