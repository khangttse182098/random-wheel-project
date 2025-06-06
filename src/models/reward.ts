export interface RewardData {
  id: number;
  eventId: number;
  rewardName: string;
  rollingNumber: number;
  winnerNumber: number;
  status: string;
  createdAt: string;
}

export interface CreateRewardData {
  eventId: string;
  rewardName: string;
  rollingNumber: number;
  winnerNumber: number;
  createdAt: string;
}
