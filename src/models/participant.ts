export interface Participant {
  id?: string;
  code: string;
  fullName: string;
  department: string;
  status?: boolean;
  isRewarded?: boolean;
  eventId?: string;
  eventName?: string;
}

export interface UpdateParticipantData {
  code: string;
  fullName: string;
  department: string;
  status?: boolean;
  eventId: string;
}

export interface CreateParticipantData {
  code: string;
  fullName: string;
  department: string;
  status: boolean;
  eventId: string;
}
