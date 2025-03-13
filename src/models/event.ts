export interface EventData {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  expiryDate: string;
}

export interface UpdateEventData {
  name: string;
  expiryDate: string;
  status: boolean;
}
