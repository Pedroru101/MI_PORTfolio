'use client';
import EarthCanvas from '@/components/Earth';

export default function EarthWrapper() {
  return (
    <div className="hidden lg:block fixed top-0 right-0 w-[750px] h-[750px] z-0 opacity-70 -mr-[495px] -mt-[495px] pointer-events-none">
      <EarthCanvas />
    </div>
  );
}
