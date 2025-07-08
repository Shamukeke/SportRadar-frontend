// Déclare les types Activity et Notification

export interface Activity {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
}

export interface Notification {
  id: number;
  message: string;
  date: string;
}
