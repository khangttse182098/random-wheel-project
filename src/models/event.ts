export interface EventData {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
  expiryDate: string;
}

export interface UpdateEventData {
  name: string;
  expiryDate: string;
  status: boolean;
}

export interface CreateEventData {
  name: string;
  createdAt: string;
  expiryDate: string;
}
