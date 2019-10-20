export interface PostAuctionModel {
  _creator: string;
  initialBid: number;

  productType: string;
  desc: string;
  productName: string;
  imagePath: string;
  dueDate: Date;
}
