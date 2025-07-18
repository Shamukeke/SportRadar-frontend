// File: src/types/index.ts

// Déclare les types Activity et Notification

export interface Activity {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  participants?: number;      // nombre de participants inscrits
  max_participants?: number;  // capacité maximale
  duration?: string;          // durée de l'activité
  price?: string;             // prix au format texte (ex. "10€")
  level?: string;             // niveau (ex. "Débutant")
  sport_zen?: boolean;        // indication si c'est une activité Zen
  rating?: number;            // note moyenne
  image?: string;             // URL de l'image
  description?: string;       // description détaillée
}

export interface Notification {
  id: number;
  message: string;
  date: string;
}
