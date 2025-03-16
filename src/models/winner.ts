export interface WinnerData {
  eventName: string;
  eventId: number;
  awardDate: string;
  rewardName: string;
  rollingOrder: number;
  participantName: string;
  department: string;
  code: string;
  attendanceRewardId: number;
}

export interface SaveWinnerData {
  rewardId: number;
  winnersId: number[];
  rollingOrder: number;
}
