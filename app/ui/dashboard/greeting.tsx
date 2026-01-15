'use client'; 

import { useAuthStore } from '@/store/useAuthStore';
import { lusitana } from '@/app/ui/fonts';

export default function Greeting() {
  const userName = useAuthStore((state) => state.userName);

  if (!userName) return null; 

  return (
    <p className={`${lusitana.className} text-blue-600 text-2xl mb-4`}>
      Welcome back, <strong>{userName}</strong>!
    </p>
  );
}