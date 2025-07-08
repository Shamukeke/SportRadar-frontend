// File: src/components/UpcomingActivitiesList.tsx
import React from 'react';
import type { Activity } from '../types';

interface Props {
  activities: Activity[];
}

const UpcomingActivitiesList: React.FC<Props> = ({ activities }) => (
  <ul className="space-y-3 mb-8">
    {activities.map(act => (
      <li key={act.id} className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between">
        <div>
          <p className="font-semibold">{act.name}</p>
          <p className="text-sm text-gray-600">{act.date} à {act.time}</p>
        </div>
      </li>
    ))}
    {activities.length === 0 && (
      <p className="text-center text-gray-500">Aucune activité à venir.</p>
    )}
  </ul>
);

export default UpcomingActivitiesList;