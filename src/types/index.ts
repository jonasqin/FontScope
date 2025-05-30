export interface FontWeight {
  weight: string;
  style?: string;
}

export interface FontData {
  family: string;
  weights: FontWeight[];
  category: string;
}