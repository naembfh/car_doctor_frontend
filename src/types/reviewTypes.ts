export interface TReview {
  _id: string;
  user: {
    id: string;
    username: string;
    img?: string; 
  };
  username?: string;
  comment: string;
  rating: number;
  createdAt?: string; 
}
